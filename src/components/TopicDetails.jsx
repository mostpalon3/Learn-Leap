import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Video, 
  FileText, 
  ExternalLink, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  HelpCircle,
  Award,
  DownloadCloud
} from "lucide-react";

const TopicDetail = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("content");
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});

    // Mock data - in a real app, fetch this based on topicId
    const topicData = {
        "react-basics": {
            title: "React Basics",
            description: "Learn the core concepts of React including components, JSX, and the virtual DOM.",
            content: `
                ## Introduction to React

                React is a JavaScript library for building user interfaces. It's declarative, efficient, and flexible.
                
                > React was developed by Facebook and is maintained by Facebook and a community of individual developers and companies.
                
                ### Key Concepts
                - **Components**: Building blocks of React applications
                - **JSX**: JavaScript syntax extension for React
                - **Virtual DOM**: React's lightweight representation of the DOM
                - **Props**: How components communicate with each other
                - **State**: Data that changes over time in your application
                
                ![React Component Flow](https://legacy.reactjs.org/static/9381f09e609723a8bb6e4ba1a7713b46/90cbd/thinking-in-react-components.png)
                
                React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
                
                ### Code Example
                \`\`\`jsx
                function Welcome(props) {
                    return <h1>Hello, {props.name}</h1>;
                }
                
                function App() {
                    return (
                        <div>
                            <Welcome name="Sara" />
                            <Welcome name="Cahal" />
                            <Welcome name="Edite" />
                        </div>
                    );
                }
                \`\`\`
                
                Why React?
                1. **Component-Based**: Build encapsulated components that manage their own state.
                2. **Declarative**: Design simple views for each state, and React will update and render components when data changes.
                3. **Learn Once, Write Anywhere**: Develop new features without rewriting existing code.
                
                ---
                
                Want to learn more? Check out the Resources tab for official documentation and tutorials.
            `,
            video: "https://www.youtube.com/embed/4UZrsTqkcW4",
            quiz: [
                {
                    question: "What is JSX?",
                    options: [
                        "A JavaScript library",
                        "A JavaScript syntax extension that allows HTML in JavaScript",
                        "A CSS preprocessor",
                        "A database query language",
                    ],
                    answer: 1,
                },
                {
                    question: "What is the virtual DOM?",
                    options: [
                        "A type of web browser",
                        "A physical component in computers",
                        "React's lightweight copy of the real DOM",
                        "A programming paradigm",
                    ],
                    answer: 2,
                },
            ],
            resources: [
                { name: "React Documentation", url: "https://react.dev/learn" },
                { name: "React Basics Tutorial", url: "https://react.dev/learn/tutorial-tic-tac-toe" },
                { name: "React GitHub Repository", url: "https://github.com/facebook/react" },
            ],
            next: "jsx-and-components",
            prev: null,
        },
        "jsx-fundamentals": {
            title: "JSX Fundamentals",
            description: "Deep dive into JSX syntax and how it works in React",
            content: "JSX content here...",
            video: "https://www.youtube.com/embed/example",
            quiz: [],
            resources: [],
            next: "react-components",
            prev: "react-basics",
        },
        "react-components": {
            title: "React Components",
            description: "Understanding React components and their lifecycle",
            content: "Components content here...",
            video: "",
            quiz: [],
            resources: [],
            next: null,
            prev: "jsx-fundamentals",
        },
    };

    // Get the selected topic data or use a default
    const topic = topicData[topicId] || {
        title: "Topic Not Found",
        description: "The requested topic could not be found.",
        content: "Please select a valid topic.",
        video: "",
        quiz: [],
        resources: [],
        next: null,
        prev: null,
    };

    // Navigation handlers
    const goToNextTopic = () => {
        if (topic.next) {
            navigate(`/topics/${topic.next}`);
            window.scrollTo(0, 0);
            setActiveTab("content");
        }
    };

    const goToPrevTopic = () => {
        if (topic.prev) {
            navigate(`/topics/${topic.prev}`);
            window.scrollTo(0, 0);
            setActiveTab("content");
        }
    };

    // Quiz handlers
    const handleAnswerSelect = (questionIndex, optionIndex) => {
        setUserAnswers({
            ...userAnswers,
            [questionIndex]: optionIndex,
        });
    };

    const handleSubmitQuiz = () => {
        setQuizSubmitted(true);
    };

    const calculateScore = () => {
        let score = 0;
        topic.quiz.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                score++;
            }
        });
        return score;
    };

    // Enhanced Markdown-like formatting for content
    const renderContent = (content) => {
        // Split content into lines
        const lines = content.split('\n');
        let inCodeBlock = false;
        let codeContent = [];
        let codeLanguage = '';
        
        const renderedContent = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Handle code blocks
            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    // End of code block
                    renderedContent.push(
                        <pre key={`code-${i}`} className="bg-[#28595a] text-white p-4 rounded-lg overflow-auto my-4">
                            <code className={`language-${codeLanguage}`}>
                                {codeContent.join('\n')}
                            </code>
                        </pre>
                    );
                    inCodeBlock = false;
                    codeContent = [];
                    codeLanguage = '';
                } else {
                    // Start of code block
                    inCodeBlock = true;
                    codeLanguage = line.slice(3); // Get language after ```
                }
                continue;
            }
            
            if (inCodeBlock) {
                codeContent.push(line);
                continue;
            }
            
            // Main headers (## Heading)
            if (line.startsWith('##') && !line.startsWith('###')) {
                const headerText = line.replace(/^##\s+/, '');
                renderedContent.push(
                    <h2 key={`h2-${i}`} className="text-2xl font-bold mt-8 mb-4 text-[#28595a] border-b border-[#dbf0dd] pb-2">
                        {headerText}
                    </h2>
                );
                continue;
            }
            
            // Sub headers (### Heading)
            if (line.startsWith('###')) {
                const headerText = line.replace(/^###\s+/, '');
                renderedContent.push(
                    <h3 key={`h3-${i}`} className="text-xl font-semibold mt-6 mb-3 text-[#28595a]">
                        {headerText}
                    </h3>
                );
                continue;
            }
            
            // Sub-sub headers (#### Heading)
            if (line.startsWith('####')) {
                const headerText = line.replace(/^####\s+/, '');
                renderedContent.push(
                    <h4 key={`h4-${i}`} className="text-lg font-semibold mt-4 mb-2 text-[#28595a]">
                        {headerText}
                    </h4>
                );
                continue;
            }
            
            // Blockquotes (> Quote)
            if (line.startsWith('>')) {
                const quoteText = line.replace(/^>\s+/, '');
                renderedContent.push(
                    <blockquote key={`quote-${i}`} className="border-l-4 border-[#ff8400] pl-4 py-2 my-4 bg-[#dbf0dd] bg-opacity-50 rounded-r-md text-gray-700 italic">
                        {quoteText}
                    </blockquote>
                );
                continue;
            }
            
            // Horizontal rule (---)
            if (line === '---') {
                renderedContent.push(
                    <hr key={`hr-${i}`} className="my-6 border-t border-[#dbf0dd]" />
                );
                continue;
            }
            
            // Images ![alt](url)
            const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
            if (imageMatch) {
                const [_, altText, imageUrl] = imageMatch;
                renderedContent.push(
                    <div key={`img-${i}`} className="my-6">
                        <img 
                            src={imageUrl} 
                            alt={altText} 
                            className="rounded-lg shadow-md max-w-full mx-auto border border-[#dbf0dd]" 
                        />
                        {altText && altText !== "" && (
                            <p className="text-center text-sm text-gray-500 mt-2">{altText}</p>
                        )}
                    </div>
                );
                continue;
            }
            
            // Numbered lists (1. Item)
            const numberedListMatch = line.match(/^(\d+)\.\s+(.*)/);
            if (numberedListMatch) {
                const [_, number, text] = numberedListMatch;
                renderedContent.push(
                    <div key={`ol-${i}`} className="flex items-start ml-4 my-1">
                        <span className="font-bold text-[#ff8400] mr-2">{number}.</span>
                        <span className="text-gray-700">{formatInlineText(text)}</span>
                    </div>
                );
                continue;
            }
            
            // List items (- Item)
            if (line.startsWith('-')) {
                const listItemText = line.replace(/^-\s+/, '');
                renderedContent.push(
                    <div key={`li-${i}`} className="flex items-start ml-4 my-1">
                        <span className="text-[#28595a] mr-2 font-bold">•</span>
                        <span className="text-gray-700">{formatInlineText(listItemText)}</span>
                    </div>
                );
                continue;
            }
            
            // Regular paragraph (skip empty lines)
            if (line) {
                renderedContent.push(
                    <p key={`p-${i}`} className="my-3 text-gray-700 leading-relaxed">
                        {formatInlineText(line)}
                    </p>
                );
            }
        }
        
        return <div className="space-y-2">{renderedContent}</div>;
    };
    
    // Helper function to format inline text elements (**bold**, *italic*, `code`)
    const formatInlineText = (text) => {
        // Split by formatting markers while preserving them in the result
        const parts = [];
        let currentText = '';
        let inBold = false;
        let inItalic = false;
        let inCode = false;
        
        for (let i = 0; i < text.length; i++) {
            // Handle bold (**text**)
            if (text.substring(i, i + 2) === '**') {
                parts.push(currentText);
                currentText = '';
                inBold = !inBold;
                i++; // Skip the second *
                continue;
            }
            
            // Handle italic (*text*)
            if (text[i] === '*' && text[i-1] !== '*' && text[i+1] !== '*') {
                parts.push(currentText);
                currentText = '';
                inItalic = !inItalic;
                continue;
            }
            
            // Handle inline code (`code`)
            if (text[i] === '`') {
                parts.push(currentText);
                currentText = '';
                inCode = !inCode;
                continue;
            }
            
            // Add formatting tags
            if (inBold) {
                currentText += text[i];
                if (i === text.length - 1 || (text.substring(i + 1, i + 3) === '**')) {
                    parts.push(<strong key={`bold-${i}`} className="text-[#28595a]">{currentText}</strong>);
                    currentText = '';
                }
            } else if (inItalic) {
                currentText += text[i];
                if (i === text.length - 1 || text[i + 1] === '*') {
                    parts.push(<em key={`italic-${i}`} className="text-gray-700">{currentText}</em>);
                    currentText = '';
                }
            } else if (inCode) {
                currentText += text[i];
                if (i === text.length - 1 || text[i + 1] === '`') {
                    parts.push(
                        <code key={`code-${i}`} className="bg-[#dbf0dd] text-[#28595a] px-1 py-0.5 rounded font-mono text-sm">
                            {currentText}
                        </code>
                    );
                    currentText = '';
                }
            } else {
                currentText += text[i];
                if (i === text.length - 1) {
                    parts.push(currentText);
                }
            }
        }
        
        return parts;
    };

    return (
        <div className="relative left-[15%] bg-[#f6fbf6] w-[85%] min-h-screen py-8 px-8">
            {/* Topic Header */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="bg-[#28595a] px-6 py-4 text-white">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">{topic.title}</h1>
                        <Link 
                            to="/courses/introduction-to-react" 
                            className="inline-flex items-center px-3 py-1.5 bg-amber-600 bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-colors text-sm"
                        >
                            <ChevronLeft size={16} className="mr-1" />
                            Back to Course
                        </Link>
                    </div>
                    <p className="text-[#dbf0dd] mt-2">{topic.description}</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex px-6 border-b border-gray-200">
                    <button 
                        className={`px-4 py-3 font-medium transition-colors ${
                            activeTab === 'content' 
                                ? 'text-[#28595a] border-b-2 border-[#28595a]' 
                                : 'text-gray-500 hover:text-[#28595a]'
                        }`} 
                        onClick={() => setActiveTab('content')}
                    >
                        <div className="flex items-center">
                            <FileText size={18} className="mr-2" />
                            Content
                        </div>
                    </button>
                    <button 
                        className={`px-4 py-3 font-medium transition-colors ${
                            activeTab === 'video' 
                                ? 'text-[#28595a] border-b-2 border-[#28595a]' 
                                : 'text-gray-500 hover:text-[#28595a]'
                        }`} 
                        onClick={() => setActiveTab('video')}
                    >
                        <div className="flex items-center">
                            <Video size={18} className="mr-2" />
                            Video
                        </div>
                    </button>
                    <button 
                        className={`px-4 py-3 font-medium transition-colors ${
                            activeTab === 'quiz' 
                                ? 'text-[#28595a] border-b-2 border-[#28595a]' 
                                : 'text-gray-500 hover:text-[#28595a]'
                        }`} 
                        onClick={() => setActiveTab('quiz')}
                    >
                        <div className="flex items-center">
                            <HelpCircle size={18} className="mr-2" />
                            Quiz
                        </div>
                    </button>
                    <button 
                        className={`px-4 py-3 font-medium transition-colors ${
                            activeTab === 'resources' 
                                ? 'text-[#28595a] border-b-2 border-[#28595a]' 
                                : 'text-gray-500 hover:text-[#28595a]'
                        }`} 
                        onClick={() => setActiveTab('resources')}
                    >
                        <div className="flex items-center">
                            <BookOpen size={18} className="mr-2" />
                            Resources
                        </div>
                    </button>
                </div>
            </div>

            {/* Content Panel */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    {activeTab === 'content' && (
                        <div className="prose max-w-none">
                            {renderContent(topic.content)}
                        </div>
                    )}

                    {activeTab === 'video' && (
                        <div>
                            {topic.video ? (
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe 
                                        src={topic.video} 
                                        className="w-full h-[500px] rounded-lg border border-[#dbf0dd]"
                                        title={topic.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                                    <Video size={48} className="text-[#dbf0dd] mb-4" />
                                    <p>No video available for this topic.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'quiz' && (
                        <div>
                            {topic.quiz && topic.quiz.length > 0 ? (
                                <div>
                                    <h2 className="text-xl font-semibold mb-6 text-[#28595a] flex items-center">
                                        <HelpCircle size={20} className="mr-2" />
                                        Topic Quiz
                                    </h2>
                                    
                                    {quizSubmitted ? (
                                        <div className="bg-[#dbf0dd] p-6 rounded-xl mb-6">
                                            <h3 className="text-lg font-bold text-[#28595a] mb-2 flex items-center">
                                                <Award size={20} className="mr-2" />
                                                Quiz Results
                                            </h3>
                                            <p className="text-gray-700">
                                                You scored <span className="font-bold text-[#28595a]">{calculateScore()}</span> out of <span className="font-bold">{topic.quiz.length}</span>.
                                            </p>
                                            
                                            {calculateScore() === topic.quiz.length && (
                                                <div className="mt-4 flex items-center text-[#28595a]">
                                                    <CheckCircle size={18} className="mr-2" />
                                                    <span className="font-medium">Perfect score! Great job!</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : null}
                                    
                                    {topic.quiz.map((question, qIndex) => (
                                        <div key={qIndex} className="mb-6 p-6 border border-[#dbf0dd] rounded-xl">
                                            <h3 className="font-medium text-lg mb-4 text-[#28595a]">{qIndex + 1}. {question.question}</h3>
                                            <div className="space-y-3">
                                                {question.options.map((option, oIndex) => (
                                                    <div key={oIndex} className="flex items-center p-3 rounded-lg transition-colors hover:bg-[#f6fbf6]">
                                                        <input 
                                                            type="radio" 
                                                            id={`q${qIndex}-o${oIndex}`} 
                                                            name={`question-${qIndex}`} 
                                                            className="mr-3 h-4 w-4 text-[#28595a] focus:ring-[#28595a]"
                                                            checked={userAnswers[qIndex] === oIndex}
                                                            onChange={() => handleAnswerSelect(qIndex, oIndex)}
                                                            disabled={quizSubmitted}
                                                        />
                                                        <label 
                                                            htmlFor={`q${qIndex}-o${oIndex}`} 
                                                            className={`flex-1 ${
                                                                quizSubmitted && oIndex === question.answer 
                                                                    ? 'text-green-600 font-medium' 
                                                                    : quizSubmitted && userAnswers[qIndex] === oIndex && oIndex !== question.answer 
                                                                    ? 'text-red-600 font-medium' 
                                                                    : 'text-gray-700'
                                                            }`}
                                                        >
                                                            {option}
                                                        </label>
                                                        {quizSubmitted && oIndex === question.answer && (
                                                            <CheckCircle size={18} className="text-green-500 ml-2" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            {quizSubmitted && userAnswers[qIndex] !== question.answer && (
                                                <div className="mt-4 text-sm p-3 bg-red-50 text-red-700 rounded-lg">
                                                    <p className="font-medium">Incorrect.</p>
                                                    <p>The correct answer is: {question.options[question.answer]}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    
                                    {!quizSubmitted && (
                                        <button 
                                            className="px-6 py-3 bg-[#ff8400] hover:bg-[#e67700] text-white font-medium rounded-lg transition-colors shadow-sm flex items-center"
                                            onClick={handleSubmitQuiz}
                                        >
                                            <CheckCircle size={18} className="mr-2" />
                                            Submit Quiz
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                                    <HelpCircle size={48} className="text-[#dbf0dd] mb-4" />
                                    <p>No quiz available for this topic.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-6 text-[#28595a] flex items-center">
                                <BookOpen size={20} className="mr-2" />
                                Additional Resources
                            </h2>
                            
                            {topic.resources && topic.resources.length > 0 ? (
                                <div className="space-y-4">
                                    {topic.resources.map((resource, index) => (
                                        <div key={index} className="group border border-[#dbf0dd] rounded-xl overflow-hidden">
                                            <a 
                                                href={resource.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center p-4 hover:bg-[#dbf0dd] hover:bg-opacity-30 transition-colors"
                                            >
                                                <div className="w-10 h-10 bg-[#dbf0dd] rounded-lg flex items-center justify-center mr-4 text-[#28595a] flex-shrink-0">
                                                    <DownloadCloud size={20} />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-[#28595a] font-medium group-hover:text-[#28595a]/80 transition-colors">{resource.name}</h3>
                                                    <p className="text-sm text-gray-500">External resource</p>
                                                </div>
                                                <ExternalLink size={16} className="text-[#28595a] ml-2" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                                    <BookOpen size={48} className="text-[#dbf0dd] mb-4" />
                                    <p>No additional resources available for this topic.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Topic Navigation */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-[#dbf0dd]">
                        <button
                            onClick={goToPrevTopic}
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                topic.prev 
                                    ? 'bg-[#28595a] text-white hover:bg-[#1e4445]' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!topic.prev}
                        >
                            <ChevronLeft size={18} className="mr-2" />
                            Previous Topic
                        </button>
                        
                        <button
                            onClick={goToNextTopic}
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                topic.next 
                                    ? 'bg-[#ff8400] text-white hover:bg-[#e67700]' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!topic.next}
                        >
                            Next Topic
                            <ChevronRight size={18} className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicDetail;