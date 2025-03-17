export interface questionInterface {
    question: string;
    answer: 'a' | 'b' | 'c' | 'd';
    options: {
        a: string;
        b: string;
        c: string;
        d: string;
    };
    subject: string;
    topic: string;
}

export const quizQuestions: questionInterface[] = [
  {
    subject: "React",
    topic: "JSX",
    question: "What does JSX stand for in React?",
    options: {
      a: "JavaScript XML",
      b: "Java Syntax Extension",
      c: "JavaScript Extension",
      d: "JavaScript Express"
    },
    answer: "a"
  },
  {
    subject: "React",
    topic: "Components",
    question: "Which type of component is defined as a function that returns JSX?",
    options: {
      a: "Class Component",
      b: "Functional Component",
      c: "Higher Order Component",
      d: "Pure Component"
    },
    answer: "b"
  },
  {
    subject: "React",
    topic: "State",
    question: "Which React hook is used to manage state in a functional component?",
    options: {
      a: "useEffect",
      b: "useState",
      c: "useReducer",
      d: "useContext"
    },
    answer: "b"
  },
  {
    subject: "React",
    topic: "Props",
    question: "How do you pass data from a parent component to a child component in React?",
    options: {
      a: "Using state",
      b: "Using Redux",
      c: "Using props",
      d: "Using context"
    },
    answer: "c"
  },
  {
    subject: "React",
    topic: "Lifecycle Methods",
    question: "Which lifecycle method is invoked immediately after a component is inserted into the DOM?",
    options: {
      a: "componentDidMount",
      b: "componentDidUpdate",
      c: "componentWillUnmount",
      d: "render"
    },
    answer: "a"
  },
  {
    subject: "React",
    topic: "Hooks",
    question: "Which React hook is used for performing side effects in a functional component?",
    options: {
      a: "useState",
      b: "useEffect",
      c: "useRef",
      d: "useMemo"
    },
    answer: "b"
  },
  {
    subject: "React",
    topic: "Virtual DOM",
    question: "What is the Virtual DOM in React?",
    options: {
      a: "A real representation of the UI in memory",
      b: "A copy of the real DOM that React updates efficiently",
      c: "An alternative to the real DOM",
      d: "A feature that directly updates the browser's DOM"
    },
    answer: "b"
  },
  {
    subject: "React",
    topic: "Events",
    question: "How do you handle events in React?",
    options: {
      a: "Using addEventListener()",
      b: "Using event delegation",
      c: "Using inline JavaScript",
      d: "Using event handlers like onClick"
    },
    answer: "d"
  },
  {
    subject: "React",
    topic: "Forms",
    question: "Which property is used to create controlled components in React?",
    options: {
      a: "value",
      b: "defaultValue",
      c: "onSubmit",
      d: "checked"
    },
    answer: "a"
  },
  {
    subject: "React",
    topic: "Keys",
    question: "Why are keys used in React lists?",
    options: {
      a: "To uniquely identify elements for efficient updates",
      b: "To improve performance by storing elements in local storage",
      c: "To define the order of rendering",
      d: "To bind event handlers to list items"
    },
    answer: "a"
  }
];
