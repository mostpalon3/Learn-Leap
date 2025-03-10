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
    subject: "Physics",
    topic: "Kinematics",
    question: "A car accelerates uniformly from 10 m/s to 30 m/s in 5 seconds. What is its acceleration?",
    options: {
      a: "2 m/s²",
      b: "4 m/s²",
      c: "5 m/s²",
      d: "6 m/s²"
    },
    answer: "b"
  },
  {
    subject: "Physics",
    topic: "Electricity",
    question: "What is the SI unit of electric resistance?",
    options: {
      a: "Volt",
      b: "Ohm",
      c: "Farad",
      d: "Coulomb"
    },
    answer: "b"
  },
  {
    subject: "Chemistry",
    topic: "Acids and Bases",
    question: "Which of the following is an example of a strong acid?",
    options: {
      a: "Acetic acid",
      b: "Hydrochloric acid",
      c: "Carbonic acid",
      d: "Hydrofluoric acid"
    },
    answer: "b"
  },
  {
    subject: "Chemistry",
    topic: "Redox Reactions",
    question: "What is the oxidation state of chromium in K₂Cr₂O₇?",
    options: {
      a: "+6",
      b: "+3",
      c: "+2",
      d: "+4"
    },
    answer: "a"
  },
  {
    subject: "Mathematics",
    topic: "Differentiation",
    question: "What is the derivative of sin(x) with respect to x?",
    options: {
      a: "cos(x)",
      b: "-cos(x)",
      c: "sin(x)",
      d: "-sin(x)"
    },
    answer: "a"
  },
  {
    subject: "Mathematics",
    topic: "Quadratic Equations",
    question: "If the sum of the roots of a quadratic equation ax² + bx + c = 0 is 7 and the product is 12, what is the equation?",
    options: {
      a: "x² - 7x + 12 = 0",
      b: "x² + 7x - 12 = 0",
      c: "x² - 12x + 7 = 0",
      d: "x² + 12x - 7 = 0"
    },
    answer: "a"
  },
  {
    subject: "Physics",
    topic: "Electromagnetism",
    question: "Which of the following statements is true about electromagnetic waves?",
    options: {
      a: "They require a medium to travel",
      b: "They travel at different speeds in vacuum",
      c: "They consist of oscillating electric and magnetic fields",
      d: "They have no practical applications"
    },
    answer: "c"
  },
  {
    subject: "Chemistry",
    topic: "Reactivity of Metals",
    question: "Which gas is produced when zinc reacts with dilute hydrochloric acid?",
    options: {
      a: "Oxygen",
      b: "Hydrogen",
      c: "Carbon dioxide",
      d: "Chlorine"
    },
    answer: "b"
  },
  {
    subject: "Mathematics",
    topic: "Integration",
    question: "The integral of e^x with respect to x is:",
    options: {
      a: "e^x + C",
      b: "x e^x",
      c: "(e^x)/x",
      d: "xe^x + C"
    },
    answer: "a"
  },
  {
    subject: "Physics",
    topic: "Work and Energy",
    question: "What is the work done when a force of 10 N moves an object by 5 meters in the direction of the force?",
    options: {
      a: "2 J",
      b: "10 J",
      c: "50 J",
      d: "100 J"
    },
    answer: "c"
  }
];
