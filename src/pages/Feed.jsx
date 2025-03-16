import React, { useState, useEffect } from 'react';

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
    options: { TensorFlow: 19, PyTorch: 0, Others: 0 },
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
    <div className="flex w-full min-h-screen p-6 gap-6 justify-center flex-wrap relative left-[7.5%] bg-[#f6fbf6] ">
      {/* Left Sidebar */}
      <aside className="w-[300px] bg-gradient-to-br from-[#1D2226] to-[#0f1a22] p-4 rounded-2xl text-white shadow-lg flex flex-col gap-4 flex-shrink-0">
        <h3 className="text-xl mb-4 text-orange-500">Your Hub</h3>
        {/* Leaderboard */}
        <div className="bg-gradient-to-br from-[#2a3b4c] to-[#1D2226] p-4 rounded-2xl shadow-lg max-h-[200px] overflow-y-auto">
          <h4 className="text-base mb-2 text-white">Leaderboard 🏆</h4>
          {leaderboard.map((user, index) => (
            <div key={index} className="flex items-center gap-2 py-2">
              <span className={`text-base mr-4 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : 'text-[#CD7F32]'}`}>{user.rank}</span>
              <div className="w-[30px] h-[30px] bg-blue-700 text-white flex items-center justify-center rounded-full font-bold text-sm">{user.avatar}</div>
              <span className="font-bold text-white">{user.name}</span>
              <span className="text-sm text-gray-500">
                {user.achievements ? `${user.achievements} Achievements` : user.posts ? `${user.posts} Posts` : `${user.comments} Comments`}
              </span>
            </div>
          ))}
        </div>
        {/* Daily Goals */}
        <div className="bg-gray-200 p-4 rounded-2xl shadow-lg">
          <h4 className="text-base mb-2 text-gray-800">Daily Goals 🎯</h4>
          <p className="text-sm text-gray-800 mb-4">Complete a coding problem today</p>
          <div className="w-full h-[15px] bg-gray-500 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-teal-500 rounded-full transition-all duration-500" style={{ width: `${challengeProgress}%` }}></div>
          </div>
          <span className="text-sm text-gray-800">{challengeProgress}% Complete</span>
          {challengeProgress === 100 ? (
            <span className="text-base text-orange-500 ml-2">🏆</span>
          ) : (
            <button className="w-full p-4 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all">Opt-In</button>
          )}
        </div>
        {/* My Streak & Activity Log */}
        <div className="bg-gray-200 p-4 rounded-2xl shadow-lg">
          <h4 className="text-base mb-2 text-gray-800">My Streak & Log 🔄</h4>
          <p className="text-sm text-gray-800 mb-4">Posting Streak: {streakDays}-day 🔥</p>
          <div className="flex flex-col gap-2">
            {activityLog.map((activity, index) => (
              <div key={index} className="flex justify-between text-sm text-gray-800">
                <span>{activity.text}</span>
                <span className="text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Community Poll */}
        <div className="bg-gray-200 p-4 rounded-2xl shadow-lg">
          <h4 className="text-base mb-2 text-gray-800">Community Poll 📊</h4>
          <p className="text-sm text-gray-600 mb-4">{poll.question}</p>
          {Object.keys(poll.options).map(option => (
            <button
              key={option}
              className={`block w-full p-4 mb-2 bg-white border border-gray-500 rounded-xl text-gray-800 ${poll.userVote === option ? 'bg-blue-700 text-white border-blue-700' : ''} hover:bg-blue-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed`}
              onClick={() => handleVote(option)}
              disabled={poll.userVote}
            >
              {option} ({poll.options[option]} votes)
            </button>
          ))}
        </div>
      </aside>

      {/* Main Feed */}
      <main className="flex-1 flex flex-col gap-6 max-w-[600px] min-w-[500px]">
        <PostInput />
        <div className="flex flex-col gap-6">
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
      <aside className="w-[300px] bg-gray-200 p-4 rounded-2xl shadow-lg flex flex-col gap-4 flex-grow max-w-[400px]">
        <h3 className="text-xl mb-4 text-gray-800">Engagement Hub</h3>
        {/* Trending Discussions */}
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <h4 className="text-base mb-2 text-gray-800">Trending Discussions 🔥</h4>
          {trendingPosts.map(post => (
            <a href={`#post-${post.id}`} key={post.id} className="block text-orange-500 text-sm mb-2 hover:underline hover:font-bold transition-all">
              {post.title} ({post.likes} Likes)
            </a>
          ))}
        </div>
        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <h4 className="text-base mb-2 text-gray-800">Quick Actions ⚡</h4>
          <button className="block w-full p-3 mb-2 bg-blue-700 text-white border border-white rounded-xl hover:bg-blue-800 hover:-translate-y-1 transition-all text-sm font-bold">Start a Discussion</button>
          <button className="block w-full p-3 mb-2 bg-blue-700 text-white border border-white rounded-xl hover:bg-blue-800 hover:-translate-y-1 transition-all text-sm font-bold">Post a Project</button>
          <button className="block w-full p-3 mb-2 bg-blue-700 text-white border border-white rounded-xl hover:bg-blue-800 hover:-translate-y-1 transition-all text-sm font-bold">Find a Mentor</button>
          <button className="block w-full p-3 mb-2 bg-blue-700 text-white border border-white rounded-xl hover:bg-blue-800 hover:-translate-y-1 transition-all text-sm font-bold">Join a Study Group</button>
        </div>
        {/* AI Mentor Tips */}
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <h4 className="text-base mb-2 text-gray-800">AI Mentor Tips 🤖</h4>
          <p className="text-sm text-gray-600">{aiTip}</p>
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
    <div className="bg-gray-200 p-4 rounded-2xl shadow-lg flex flex-col gap-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Share your achievements or updates..."
        className="w-full min-h-[100px] border border-gray-500 rounded-xl p-4 text-base resize-y focus:border-blue-700 focus:outline-none bg-white text-gray-800"
      />
      {image && <img src={image} alt="Preview" className="max-w-full h-auto rounded-xl mt-4 shadow-lg" />}
      <div className="flex justify-between items-center">
        <label className="cursor-pointer text-blue-700 text-sm flex items-center gap-2">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          Add Image
        </label>
        <button className="p-4 bg-blue-700 text-white rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all text-base flex items-center gap-2 disabled:bg-gray-500 disabled:cursor-not-allowed">
          📝 Post
        </button>
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
    <div className={`bg-gray-100 p-4 rounded-2xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col gap-4 ${post.type === 'achievement' ? 'border-l-4 border-orange-500' : ''}`}>
      <div className="flex items-center gap-4">
        <div className="w-[50px] h-[50px] bg-blue-700 text-white flex items-center justify-center rounded-full font-bold text-xl hover:bg-blue-800 transition-all">{post.user.avatar}</div>
        <div className="flex flex-col">
          <span className="font-bold text-base text-gray-800">{post.user.name}</span>
          <span className="text-sm text-gray-600">{post.user.bio}</span>
          <span className="text-sm text-gray-600">{post.timestamp}</span>
        </div>
      </div>
      <div className="text-base text-gray-800 mb-4 leading-relaxed">
        {post.type === 'achievement' && <span className="text-2xl mr-4 text-orange-500">{post.achievementIcon}</span>}
        <p className={isExpanded || !isLongContent ? '' : 'line-clamp-3'}>{post.content}</p>
        {isLongContent && (
          <button className="bg-transparent border-none text-blue-700 text-sm mt-4 hover:font-bold hover:underline transition-all" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>
      {post.image && <img src={post.image} alt="Post Content" className="max-w-full h-auto rounded-xl mb-4 shadow-lg" />}
      <div className="flex gap-6 text-sm text-gray-600 mb-4 pt-4 border-t border-gray-500">
        <span>{post.likes} Likes</span>
        <span>{post.comments.length} Comments</span>
        <span>{post.shares} Shares</span>
      </div>
      <div className="flex gap-6 p-4 border-t border-gray-500">
        <button onClick={onLike} className="bg-transparent border-none text-blue-700 text-sm flex items-center gap-4 hover:font-bold hover:text-base transition-all">Like</button>
        <button className="bg-transparent border-none text-blue-700 text-sm flex items-center gap-4 hover:font-bold hover:text-base transition-all">Comment</button>
        <button className="bg-transparent border-none text-blue-700 text-sm flex items-center gap-4 hover:font-bold hover:underline transition-all">Share</button>
      </div>
      <div className="mt-4 bg-gray-200 p-4 rounded-xl">
        {post.comments.map((comment, idx) => (
          <div key={idx} className="mb-2" style={{ marginLeft: idx > 0 ? '20px' : '0' }}>
            <p><strong>{comment.user}:</strong> {comment.text}</p>
            <button className="bg-transparent border-none text-blue-700 text-sm ml-4 hover:underline transition-all" onClick={() => setReplyIndex(idx)}>Reply</button>
            {replyIndex === idx && (
              <form onSubmit={handleReplySubmit} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 p-2 border border-gray-500 rounded-xl text-sm"
                />
                <button type="submit" className="p-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-all">Send</button>
              </form>
            )}
            {comment.replies.map((reply, rIdx) => (
              <p key={rIdx} className="text-sm text-gray-800 ml-5"><strong>{reply.user}:</strong> {reply.text}</p>
            ))}
          </div>
        ))}
        {post.comments.length > 2 && <span className="text-sm text-blue-700 cursor-pointer hover:underline transition-all">View {post.comments.length - 2} more comments</span>}
      </div>
    </div>
  );
};

export default Feed;