import { Link } from "react-router-dom";

const CourseDetail = () => {
  const course = {
    title: "Introduction to React",
    topics: [
      "React Basics",
      "JSX and Components",
      "State and Props",
      "React Hooks",
      "Routing with React Router",
    ],
    resources: [
      { name: "React Docs", link: "https://react.dev/" },
      { name: "React Router Guide", link: "https://reactrouter.com/" },
    ],
    quizzes: [
      { title: "React Basics Quiz", link: "/quiz/react-basics" },
      { title: "Hooks & State Quiz", link: "/quiz/hooks-state" },
    ],
    videos: [
      { title: "React Crash Course", link: "https://youtu.be/w7ejDZ8SWv8" },
      { title: "React Hooks Explained", link: "https://youtu.be/dpw9EHDh2bM" },
    ],
  };

  return (
    <div className="p-6 flex flex-col relative left-[15%] bg-[#f6fbf6] w-[85%] min-h-screen">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      
      <h2 className="text-2xl mt-4">Topics</h2>
      <ul className="list-disc ml-6">
        {course.topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>

      <h2 className="text-2xl mt-4">Resources</h2>
      <ul className="list-disc ml-6">
        {course.resources.map((res, index) => (
          <li key={index}><a href={res.link} target="_blank" className="text-blue-500">{res.name}</a></li>
        ))}
      </ul>

      <h2 className="text-2xl mt-4">Quizzes</h2>
      <ul className="list-disc ml-6">
        {course.quizzes.map((quiz, index) => (
          <li key={index}><Link to={quiz.link} className="text-blue-500">{quiz.title}</Link></li>
        ))}
      </ul>

      <h2 className="text-2xl mt-4">Video Lectures</h2>
      <ul className="list-disc ml-6">
        {course.videos.map((vid, index) => (
          <li key={index}><a href={vid.link} target="_blank" className="text-blue-500">{vid.title}</a></li>
        ))}
      </ul>

      <Link to="/" className="mt-4 inline-block bg-gray-500 text-white p-2 rounded">Back to Courses</Link>
    </div>
  );
};

export default CourseDetail;