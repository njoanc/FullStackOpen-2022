import courses from "./courses";
// import Total from "./components/Total";
import Course from "./components/Course";
const App = () => {
  const parts = courses.map((course) => course.parts).flat();
  const calculateTotalExercises = parts.reduce(
    (total, part) => total + part.exercises,
    0
  );

  return (
    <div>
      <Course courses={courses} exercises={calculateTotalExercises} />
    </div>
  );
};

export default App;
