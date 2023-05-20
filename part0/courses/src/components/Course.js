import Content from "./Content";
import Titles from "./Titles";
import Total from "./Total";

const Course = ({ courses, exercises }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Titles titles={course.name} />
          <Content parts={course.parts} />
          <Total exercises={exercises} />
        </div>
      ))}
    </div>
  );
};
export default Course;
