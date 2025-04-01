import React, { useState } from "react";
import { FaReact } from "react-icons/fa";
import { useParams, Link, useNavigate } from "react-router-dom";

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
            navigate(`/courses/topic/${topic.prev}`);
            window.scrollTo(0, 0);
            setActiveTab("content");
        }
    };

    // Other existing handlers and functions remain the same...
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
                        <pre key={`code-${i}`} className="bg-gray-800 text-white p-4 rounded-md overflow-auto my-4">
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
                    <h2 key={`h2-${i}`} className="text-2xl font-bold mt-8 mb-4 text-gray-800 border-b pb-2">
                        {headerText}
                    </h2>
                );
                continue;
            }
            
            // Sub headers (### Heading)
            if (line.startsWith('###')) {
                const headerText = line.replace(/^###\s+/, '');
                renderedContent.push(
                    <h3 key={`h3-${i}`} className="text-xl font-semibold mt-6 mb-3 text-gray-700">
                        {headerText}
                    </h3>
                );
                continue;
            }
            
            // Sub-sub headers (#### Heading)
            if (line.startsWith('####')) {
                const headerText = line.replace(/^####\s+/, '');
                renderedContent.push(
                    <h4 key={`h4-${i}`} className="text-lg font-semibold mt-4 mb-2 text-gray-700">
                        {headerText}
                    </h4>
                );
                continue;
            }
            
            // Blockquotes (> Quote)
            if (line.startsWith('>')) {
                const quoteText = line.replace(/^>\s+/, '');
                renderedContent.push(
                    <blockquote key={`quote-${i}`} className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 rounded-r-md text-gray-700 italic">
                        {quoteText}
                    </blockquote>
                );
                continue;
            }
            
            // Horizontal rule (---)
            if (line === '---') {
                renderedContent.push(
                    <hr key={`hr-${i}`} className="my-6 border-t border-gray-300" />
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
                            className="rounded-lg shadow-md max-w-full mx-auto" 
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
                        <span className="font-bold text-blue-500 mr-2">{number}.</span>
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
                        <span className="text-blue-500 mr-2 font-bold">•</span>
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
                    parts.push(<strong key={`bold-${i}`}>{currentText}</strong>);
                    currentText = '';
                }
            } else if (inItalic) {
                currentText += text[i];
                if (i === text.length - 1 || text[i + 1] === '*') {
                    parts.push(<em key={`italic-${i}`}>{currentText}</em>);
                    currentText = '';
                }
            } else if (inCode) {
                currentText += text[i];
                if (i === text.length - 1 || text[i + 1] === '`') {
                    parts.push(
                        <code key={`code-${i}`} className="bg-gray-100 text-purple-600 px-1 py-0.5 rounded font-mono text-sm">
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
        <div className="relative left-[15%] bg-[#f6fbf6] w-[85%] min-h-screen p-8">
            {/* Topic Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">{topic.title} <FaReact className="text-blue-500" /></h1>
                        <p className="text-gray-600 mt-2">{topic.description}</p>
                    </div>
                    <Link 
                        to="/courses/introduction-to-react" 
                        className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors text-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Course
                    </Link>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b mt-6">
                    <button 
                        className={`px-4 py-2 font-medium ${activeTab === 'content' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} 
                        onClick={() => setActiveTab('content')}
                    >
                        Content
                    </button>
                    <button 
                        className={`px-4 py-2 font-medium ${activeTab === 'video' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} 
                        onClick={() => setActiveTab('video')}
                    >
                        Video
                    </button>
                    <button 
                        className={`px-4 py-2 font-medium ${activeTab === 'quiz' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} 
                        onClick={() => setActiveTab('quiz')}
                    >
                        Quiz
                    </button>
                    <button 
                        className={`px-4 py-2 font-medium ${activeTab === 'resources' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} 
                        onClick={() => setActiveTab('resources')}
                    >
                        Resources
                    </button>
                </div>
            </div>

            {/* Content Panel */}
            <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === 'content' && (
                    <div className="prose max-w-none">
                        {renderContent(topic.content)}
                    </div>
                )}

                {/* Rest of the tabs remain the same */}
                {activeTab === 'video' && (
                    <div>
                        {topic.video ? (
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe 
                                    src={topic.video} 
                                    className="w-full h-[500px] rounded-lg"
                                    title={topic.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                No video available for this topic.
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'quiz' && (
                    <div>
                        {topic.quiz && topic.quiz.length > 0 ? (
                            <div>
                                <h2 className="text-xl font-semibold mb-6">Topic Quiz</h2>
                                {quizSubmitted ? (
                                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                        <h3 className="text-lg font-medium text-blue-800">Quiz Results</h3>
                                        <p className="text-blue-700 mt-2">You scored {calculateScore()} out of {topic.quiz.length}.</p>
                                    </div>
                                ) : null}
                                
                                {topic.quiz.map((question, qIndex) => (
                                    <div key={qIndex} className="mb-6 p-4 border rounded-lg">
                                        <h3 className="font-medium text-lg mb-3">{qIndex + 1}. {question.question}</h3>
                                        <div className="space-y-2">
                                            {question.options.map((option, oIndex) => (
                                                <div key={oIndex} className="flex items-center">
                                                    <input 
                                                        type="radio" 
                                                        id={`q${qIndex}-o${oIndex}`} 
                                                        name={`question-${qIndex}`} 
                                                        className="mr-3 h-4 w-4 text-blue-600"
                                                        checked={userAnswers[qIndex] === oIndex}
                                                        onChange={() => handleAnswerSelect(qIndex, oIndex)}
                                                        disabled={quizSubmitted}
                                                    />
                                                    <label 
                                                        htmlFor={`q${qIndex}-o${oIndex}`} 
                                                        className={`${quizSubmitted && oIndex === question.answer ? 'text-green-600 font-medium' : ''} 
                                                                            ${quizSubmitted && userAnswers[qIndex] === oIndex && oIndex !== question.answer ? 'text-red-600 font-medium' : ''}`}
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        {quizSubmitted && (
                                            <div className="mt-3 text-sm">
                                                {userAnswers[qIndex] === question.answer ? 
                                                    <p className="text-green-600">Correct!</p> : 
                                                    <p className="text-red-600">Incorrect. The correct answer is: {question.options[question.answer]}</p>
                                                }
                                            </div>
                                        )}
                                    </div>
                                ))}
                                
                                {!quizSubmitted && (
                                    <button 
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors shadow-sm"
                                        onClick={handleSubmitQuiz}
                                    >
                                        Submit Quiz
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                No quiz available for this topic.
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'resources' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
                        {topic.resources && topic.resources.length > 0 ? (
                            <ul className="space-y-3">
                                {topic.resources.map((resource, index) => (
                                    <li key={index} className="group">
                                        <a 
                                            href={resource.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center p-3 rounded-md hover:bg-blue-50 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            <span className="text-blue-600 group-hover:text-blue-700 font-medium">{resource.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                No additional resources available for this topic.
                            </div>
                        )}
                    </div>
                )}

                {/* Topic Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                    <button
                        onClick={goToPrevTopic}
                        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                            topic.prev 
                                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!topic.prev}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous Topic
                    </button>
                    
                    <button
                        onClick={goToNextTopic}
                        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                            topic.next 
                                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!topic.next}
                    >
                        Next Topic
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopicDetail;