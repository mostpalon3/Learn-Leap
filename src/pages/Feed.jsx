import React, { useState, useEffect } from 'react';
import { 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Image, 
  Award, 
  Send, 
  Flame, 
  Target, 
  TrendingUp, 
  Zap, 
  Bot, 
  ChevronDown, 
  ChevronUp,
  Plus,
  FileText,
  Users,
  X
} from 'lucide-react';

import mathwiz from '../assets/images/Feed-react.jpeg'
import feedreact from "../assets/images/mathwiz.jpeg"

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'Deepesh', avatar: 'D', bio: 'Frontend Enthusiast | React Dev' },
      content: 'Just completed a React-based feed for our AI learning platform! Feeling on top of the world.',
      image: feedreact,
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
      image: mathwiz,
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
  const [aiTip, setAiTip] = useState("You've been posting consistently! Try engaging with others' posts too!");
  const [poll, setPoll] = useState({
    question: "What's the best AI framework?",
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
    <div className="flex min-h-screen p-6 gap-6 justify-center flex-wrap relative left-[15%] bg-[#f6fbf6] w-[85%]">
      {/* Left Sidebar */}
      <aside className="w-[300px] bg-white p-4 rounded-xl shadow-md flex flex-col gap-4 flex-shrink-0 h-fit sticky top-6">
        <h3 className="text-xl font-bold mb-2 text-[#28595a] pb-2 border-b border-[#dbf0dd]">Your Hub</h3>
        
        {/* Leaderboard */}
        <div className="bg-[#f6fbf6] p-4 rounded-xl shadow-sm">
          <h4 className="text-base font-medium mb-3 text-[#28595a] flex items-center">
            <Award size={18} className="mr-2 text-[#ff8400]" />
            Leaderboard
          </h4>
          {leaderboard.map((user, index) => (
            <div key={index} className="flex items-center gap-2 py-2 border-b border-[#dbf0dd] last:border-0">
              <span className="text-base mr-2">{user.rank}</span>
              <div className="w-[30px] h-[30px] bg-[#28595a] text-white flex items-center justify-center rounded-full font-medium text-sm">{user.avatar}</div>
              <div className="flex-1">
                <span className="font-medium text-gray-800">{user.name}</span>
                <p className="text-xs text-gray-500">
                  {user.achievements ? `${user.achievements} Achievements` : user.posts ? `${user.posts} Posts` : `${user.comments} Comments`}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Daily Goals */}
        <div className="bg-[#f6fbf6] p-4 rounded-xl shadow-sm">
          <h4 className="text-base font-medium mb-3 text-[#28595a] flex items-center">
            <Target size={18} className="mr-2 text-[#ff8400]" />
            Daily Goals
          </h4>
          <p className="text-sm text-gray-700 mb-4">Complete a coding problem today</p>
          <div className="w-full h-[8px] bg-gray-200 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-[#28595a] rounded-full transition-all duration-500" style={{ width: `${challengeProgress}%` }}></div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{challengeProgress}% Complete</span>
            {challengeProgress === 100 ? (
              <span className="text-base text-[#ff8400]">🏆</span>
            ) : null}
          </div>
          {challengeProgress < 100 && (
            <button className="w-full mt-4 p-2 bg-[#ff8400] text-white rounded-lg hover:bg-[#e67700] transition-colors font-medium text-sm">
              Start Challenge
            </button>
          )}
        </div>
        
        {/* My Streak & Activity Log */}
        <div className="bg-[#f6fbf6] p-4 rounded-xl shadow-sm">
          <h4 className="text-base font-medium mb-3 text-[#28595a] flex items-center">
            <Flame size={18} className="mr-2 text-[#ff8400]" />
            Activity Streak
          </h4>
          <p className="text-sm text-gray-700 mb-4 font-medium">
            {streakDays}-day streak 🔥
          </p>
          <div className="flex flex-col gap-2">
            {activityLog.map((activity, index) => (
              <div key={index} className="flex justify-between text-sm py-1 border-b border-[#dbf0dd] last:border-0">
                <span className="text-gray-700">{activity.text}</span>
                <span className="text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Community Poll */}
        <div className="bg-[#f6fbf6] p-4 rounded-xl shadow-sm">
          <h4 className="text-base font-medium mb-3 text-[#28595a] flex items-center">
            <Users size={18} className="mr-2 text-[#ff8400]" />
            Community Poll
          </h4>
          <p className="text-sm text-gray-700 mb-4 font-medium">{poll.question}</p>
          {Object.keys(poll.options).map(option => (
            <button
              key={option}
              className={`block w-full p-3 mb-2 rounded-lg text-sm font-medium transition-colors ${
                poll.userVote === option 
                  ? 'bg-[#28595a] text-white' 
                  : 'bg-white text-gray-700 hover:bg-[#dbf0dd]'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
              onClick={() => handleVote(option)}
              disabled={poll.userVote}
            >
              {option} ({poll.options[option]} votes)
            </button>
          ))}
        </div>
      </aside>

      {/* Main Feed */}
      <main className="flex-1 flex flex-col gap-6 max-w-[600px] min-w-[300px]">
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
      <aside className="w-[300px] flex flex-col gap-4 flex-shrink-0 h-fit sticky top-6">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 text-[#28595a] pb-2 border-b border-[#dbf0dd]">Community Hub</h3>
          
          {/* Trending Discussions */}
          <div className="mb-6">
            <h4 className="text-base font-medium mb-3 text-[#28595a] flex items-center">
              <TrendingUp size={18} className="mr-2 text-[#ff8400]" />
              Trending Discussions
            </h4>
            {trendingPosts.map(post => (
              <a 
                href={`#post-${post.id}`} 
                key={post.id} 
                className="flex items-center py-2 text-[#28595a] text-sm font-medium hover:text-[#ff8400] transition-colors border-b border-[#dbf0dd] last:border-0"
              >
                <span className="mr-2">•</span>
                {post.title} ({post.likes} Likes)
              </a>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="mb-6">
            <h4 className="text-base font-medium mb-3 text-[#28595a] flex items-center">
              <Zap size={18} className="mr-2 text-[#ff8400]" />
              Quick Actions
            </h4>
            <div className="space-y-2">
              <button className="w-full p-2 bg-[#28595a] text-white rounded-lg hover:bg-[#1e4445] transition-colors text-sm font-medium flex items-center justify-center">
                <Plus size={16} className="mr-2" />
                Start a Discussion
              </button>
              <button className="w-full p-2 bg-[#dbf0dd] text-[#28595a] rounded-lg hover:bg-[#c7e6c9] transition-colors text-sm font-medium flex items-center justify-center">
                <FileText size={16} className="mr-2" />
                Post a Project
              </button>
              <button className="w-full p-2 bg-[#dbf0dd] text-[#28595a] rounded-lg hover:bg-[#c7e6c9] transition-colors text-sm font-medium flex items-center justify-center">
                <Users size={16} className="mr-2" />
                Find Study Partners
              </button>
            </div>
          </div>
          
          {/* AI Mentor Tips */}
          <div className="bg-[#f6fbf6] p-4 rounded-xl">
            <h4 className="text-base font-medium mb-2 text-[#28595a] flex items-center">
              <Bot size={18} className="mr-2 text-[#ff8400]" />
              AI Mentor Tips
            </h4>
            <p className="text-sm text-gray-700 italic">"{aiTip}"</p>
          </div>
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
    <div className="bg-white p-4 rounded-xl shadow-md">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Share your achievements or updates..."
        className="w-full min-h-[100px] border border-[#dbf0dd] rounded-lg p-4 text-gray-700 resize-y focus:outline-none focus:ring-2 focus:ring-[#28595a] transition-colors"
      />
      {image && (
        <div className="relative mt-4">
          <img src={image} alt="Preview" className="max-w-full h-auto rounded-lg border border-[#dbf0dd]" />
          <button 
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <X size={16} className="text-[#28595a]" />
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <label className="cursor-pointer text-[#28595a] font-medium flex items-center hover:text-[#1e4445] transition-colors">
          <Image size={18} className="mr-2" />
          <span>Add Image</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
        <button 
          className={`px-4 py-2 rounded-lg text-white font-medium flex items-center ${
            input.trim() 
              ? 'bg-[#ff8400] hover:bg-[#e67700]' 
              : 'bg-gray-300 cursor-not-allowed'
          } transition-colors`}
          disabled={!input.trim()}
        >
          Post Update
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
  const [showAllComments, setShowAllComments] = useState(false);
  const isLongContent = post.content.length > 200;

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim() && replyIndex !== null) {
      onReply(replyIndex, replyText);
      setReplyText('');
      setReplyIndex(null);
    }
  };

  const visibleComments = showAllComments ? post.comments : post.comments.slice(0, 2);

  return (
    <div className={`bg-white p-5 rounded-xl shadow-md ${
      post.type === 'achievement' ? 'border-l-4 border-[#ff8400]' : ''
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-[48px] h-[48px] bg-[#28595a] text-white flex items-center justify-center rounded-full font-bold text-xl">
          {post.user.avatar}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[#28595a]">{post.user.name}</span>
          <span className="text-xs text-gray-500">{post.user.bio}</span>
          <span className="text-xs text-gray-500">{post.timestamp}</span>
        </div>
      </div>
      
      <div className="mb-4">
        {post.type === 'achievement' && (
          <div className="flex items-center gap-2 mb-2 bg-[#dbf0dd] px-3 py-1.5 rounded-lg ">
            <Award size={16} className="text-[#28595a]" />
            <span className="text-[#28595a] font-medium text-sm">Achievement Unlocked</span>
          </div>
        )}
        <p className={`text-gray-700 ${isExpanded || !isLongContent ? '' : 'line-clamp-3'}`}>
          {post.content}
        </p>
        {isLongContent && (
          <button 
            className="mt-2 text-[#28595a] text-sm font-medium hover:text-[#ff8400] transition-colors flex items-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} className="mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" />
                Read More
              </>
            )}
          </button>
        )}
      </div>
      
      {post.image && (
        <div className="mb-4">
          <img 
            src={post.image} 
            alt="Post Content" 
            className="w-full h-auto rounded-lg border border-[#dbf0dd]" 
          />
        </div>
      )}
      
      <div className="flex justify-between items-center text-sm text-gray-500 py-3 border-t border-b border-[#dbf0dd]">
        <div className="flex items-center gap-6">
          <span className="flex items-center">
            <ThumbsUp size={16} className="mr-1 text-[#28595a]" />
            {post.likes}
          </span>
          <span className="flex items-center">
            <MessageCircle size={16} className="mr-1 text-[#28595a]" />
            {post.comments.length}
          </span>
          <span className="flex items-center">
            <Share2 size={16} className="mr-1 text-[#28595a]" />
            {post.shares}
          </span>
        </div>
      </div>
      
      <div className="flex justify-around py-2">
        <button 
          onClick={onLike} 
          className="flex items-center gap-1 px-4 py-2 text-[#28595a] font-medium hover:bg-[#f6fbf6] rounded-lg transition-colors"
        >
          <ThumbsUp size={18} />
          Like
        </button>
        <button 
          className="flex items-center gap-1 px-4 py-2 text-[#28595a] font-medium hover:bg-[#f6fbf6] rounded-lg transition-colors"
        >
          <MessageCircle size={18} />
          Comment
        </button>
        <button 
          className="flex items-center gap-1 px-4 py-2 text-[#28595a] font-medium hover:bg-[#f6fbf6] rounded-lg transition-colors"
        >
          <Share2 size={18} />
          Share
        </button>
      </div>
      
      {/* Comments Section */}
      {post.comments.length > 0 && (
        <div className="mt-3 bg-[#f6fbf6] p-4 rounded-lg">
          {visibleComments.map((comment, idx) => (
            <div key={idx} className="mb-3 last:mb-0">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm">
                  <span className="font-medium text-[#28595a]">{comment.user}</span>: {comment.text}
                </p>
                <div className="flex items-center mt-1">
                  <button 
                    className="text-xs text-[#28595a] hover:text-[#ff8400] transition-colors font-medium"
                    onClick={() => setReplyIndex(idx === replyIndex ? null : idx)}
                  >
                    Reply
                  </button>
                </div>
              </div>
              
              {/* Reply Form */}
              {replyIndex === idx && (
                <form onSubmit={handleReplySubmit} className="flex gap-2 mt-2 pl-4">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 px-3 py-2 border border-[#dbf0dd] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28595a]"
                  />
                  <button 
                    type="submit" 
                    className="p-2 bg-[#28595a] text-white rounded-lg hover:bg-[#1e4445] transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </form>
              )}
              
              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="pl-4 mt-2 space-y-2">
                  {comment.replies.map((reply, rIdx) => (
                    <div key={rIdx} className="bg-white p-2 rounded-lg shadow-sm text-sm">
                      <span className="font-medium text-[#28595a]">{reply.user}</span>: {reply.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Show More Comments Button */}
          {post.comments.length > 2 && (
            <button 
              className="text-sm text-[#28595a] font-medium hover:text-[#ff8400] transition-colors mt-2 flex items-center"
              onClick={() => setShowAllComments(!showAllComments)}
            >
              {showAllComments ? (
                <>
                  <ChevronUp size={16} className="mr-1" />
                  Show Less Comments
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="mr-1" />
                  View {post.comments.length - 2} More Comments
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;