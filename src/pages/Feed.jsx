import React, { useState, useEffect } from 'react';
// import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'Deepesh', avatar: 'D', bio: 'Frontend Enthusiast | React Dev' },
      content: 'Just completed a React-based feed for our AI learning platform! Feeling on top of the world.',
      image: 'https://via.placeholder.com/600x400?text=React+Project',
      type: 'update',
      timestamp: '2h ago',
      likes: 17,
      comments: [
        { user: 'Aryan', text: 'Awesome work!', replies: [] },
        { user: 'Shivam', text: "Can't wait to see it live!", replies: [] },
      ],
      shares: 3,
    },
    {
      id: 2,
      user: { name: 'Aryan', avatar: 'A', bio: 'Chat Feature Lead | AI Enthusiast' },
      content: 'Unlocked "Math Wizard" badge after scoring 100% on the algebra quiz! Hard work pays off.',
      image: 'https://via.placeholder.com/600x400?text=Math+Wizard+Badge',
      type: 'achievement',
      timestamp: '1h ago',
      likes: 10,
      comments: [{ user: 'Sumit', text: 'Congrats, bro!', replies: [] }],
      shares: 2,
      achievementIcon: '🏆',
    },
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { rank: '🥇', name: 'Deepesh', avatar: 'D', achievements: 5 },
    { rank: '🔥', name: 'Aryan', avatar: 'A', posts: 10 },
    { rank: '💬', name: 'Shivam', avatar: 'S', comments: 15 },
  ]);
  const [challengeProgress, setChallengeProgress] = useState(60);
  const [trendingPosts, setTrendingPosts] = useState([
    { id: 1, title: 'React Feed Success!', likes: 17 },
    { id: 2, title: 'Math Wizard Unlock', likes: 10 },
  ]);
  const [streakDays, setStreakDays] = useState(5);
  const [activityLog, setActivityLog] = useState([
    { type: 'like', text: 'Liked by Aryan', time: '1h ago' },
    { type: 'comment', text: 'Commented by Shivam', time: '2h ago' },
  ]);
  const [aiTip, setAiTip] = useState("You’ve been posting consistently! Try engaging with others’ posts too!");
  const [poll, setPoll] = useState({
    question: "What’s the best AI framework?",
    options: { TensorFlow: 0, PyTorch: 0, Others: 0 },
    userVote: null,
  });

  useEffect(() => {
    // Simulate data fetch (replace with API calls)
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleVote = (option) => {
    if (!poll.userVote) {
      setPoll(prev => ({
        ...prev,
        options: { ...prev.options, [option]: prev.options[option] + 1 },
        userVote: option,
      }));
    }
  };

  const handleReply = (postId, commentIndex, replyText) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map((comment, idx) =>
              idx === commentIndex ? { ...comment, replies: [...comment.replies, { user: 'You', text: replyText }] } : comment
            ),
          }
        : post
    ));
  };

  return (
    <div className="feed-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <h3>Your Hub</h3>
        {/* Leaderboard */}
        <div className="leaderboard-widget">
          <h4>Leaderboard 🏆</h4>
          {leaderboard.map((user, index) => (
            <div key={index} className="leaderboard-item">
              <span className="rank">{user.rank}</span>
              <div className="user-avatar-small">{user.avatar}</div>
              <span className="leader-name">{user.name}</span>
              <span className="leader-metric">
                {user.achievements ? `${user.achievements} Achievements` : user.posts ? `${user.posts} Posts` : `${user.comments} Comments`}
              </span>
            </div>
          ))}
        </div>
        {/* Daily Goals */}
        <div className="challenge-widget">
          <h4>Daily Goals 🎯</h4>
          <p>Complete a coding problem today</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${challengeProgress}%` }}></div>
          </div>
          <span>{challengeProgress}% Complete</span>
          {challengeProgress === 100 ? <span className="trophy-icon">🏆</span> : <button className="challenge-button">Opt-In</button>}
        </div>
        {/* My Streak & Activity Log */}
        <div className="streak-widget">
          <h4>My Streak & Log 🔄</h4>
          <p>Posting Streak: {streakDays}-day 🔥</p>
          <div className="activity-log">
            {activityLog.map((activity, index) => (
              <div key={index} className="activity-item">
                <span>{activity.text}</span>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Community Poll */}
        <div className="poll-widget">
          <h4>Community Poll 📊</h4>
          <p>{poll.question}</p>
          {Object.keys(poll.options).map(option => (
            <button
              key={option}
              className={`poll-option ${poll.userVote === option ? 'voted' : ''}`}
              onClick={() => handleVote(option)}
              disabled={poll.userVote}
            >
              {option} ({poll.options[option]} votes)
            </button>
          ))}
        </div>
      </aside>

      {/* Main Feed */}
      <main className="feed-main">
        <PostInput />
        <div className="posts-list">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onReply={(commentIndex, replyText) => handleReply(post.id, commentIndex, replyText)}
            />
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="right-sidebar">
        <h3>Engagement Hub</h3>
        {/* Trending Discussions */}
        <div className="trending-widget">
          <h4>Trending Discussions 🔥</h4>
          {trendingPosts.map(post => (
            <a href={`#post-${post.id}`} key={post.id} className="trending-item">
              {post.title} ({post.likes} Likes)
            </a>
          ))}
        </div>
        {/* Quick Actions */}
        <div className="quick-actions-widget">
          <h4>Quick Actions ⚡</h4>
          <button className="quick-action-btn">Start a Discussion</button>
          <button className="quick-action-btn">Post a Project</button>
          <button className="quick-action-btn">Find a Mentor</button>
          <button className="quick-action-btn">Join a Study Group</button>
        </div>
        {/* AI Mentor Tips */}
        <div className="ai-tip-widget">
          <h4>AI Mentor Tips 🤖</h4>
          <p>{aiTip}</p>
        </div>
      </aside>
    </div>
  );
};

// Post Input Component
const PostInput = () => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="post-input">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Share your achievements or updates..."
      />
      {image && <img src={image} alt="Preview" className="post-preview-image" />}
      <div className="post-input-actions">
        <label className="image-upload">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          Add Image
        </label>
        <button className="post-button">📝 Post</button>
      </div>
    </div>
  );
};

// Enhanced Post Card Component
const PostCard = ({ post, onLike, onReply }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyIndex, setReplyIndex] = useState(null);
  const isLongContent = post.content.length > 200;

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim() && replyIndex !== null) {
      onReply(replyIndex, replyText);
      setReplyText('');
      setReplyIndex(null);
    }
  };

  return (
    <div className={`post-card ${post.type === 'achievement' ? 'achievement' : ''}`}>
      <div className="post-header">
        <div className="user-avatar">{post.user.avatar}</div>
        <div className="user-info">
          <span className="user-name">{post.user.name}</span>
          <span className="user-bio">{post.user.bio}</span>
          <span className="timestamp">{post.timestamp}</span>
        </div>
      </div>
      <div className="post-content" style={{ lineHeight: '1.6' }}>
        {post.type === 'achievement' && <span className="achievement-icon">{post.achievementIcon}</span>}
        <p className={isExpanded || !isLongContent ? '' : 'truncated'}>
          {post.content}
        </p>
        {isLongContent && (
          <button className="read-more" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
      {post.image && <img src={post.image} alt="Post Content" className="post-image" />}
      <div className="post-stats">
        <span>{post.likes} Likes</span>
        <span>{post.comments.length} Comments</span>
        <span>{post.shares} Shares</span>
      </div>
      <div className="post-actions">
        <button onClick={onLike}>Like</button>
        <button>Comment</button>
        <button className="share-action">Share</button>
      </div>
      <div className="comments-preview">
        {post.comments.map((comment, idx) => (
          <div key={idx} className="comment-item" style={{ marginLeft: idx > 0 ? '20px' : '0' }}>
            <p><strong>{comment.user}:</strong> {comment.text}</p>
            <button className="reply-btn" onClick={() => setReplyIndex(idx)}>Reply</button>
            {replyIndex === idx && (
              <form onSubmit={handleReplySubmit} className="reply-form">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                />
                <button type="submit">Send</button>
              </form>
            )}
            {comment.replies.map((reply, rIdx) => (
              <p key={rIdx} className="reply-text"><strong>{reply.user}:</strong> {reply.text}</p>
            ))}
          </div>
        ))}
        {post.comments.length > 2 && <span className="more-comments">View {post.comments.length - 2} more comments</span>}
      </div>
    </div>
  );
};

export default Feed;