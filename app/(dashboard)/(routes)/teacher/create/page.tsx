'use client';
import CreateCourseForm from './_components';

const CreateCoursePage = () => {
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? You can
          rename the course later.
        </p>
        <CreateCourseForm />
      </div>
    </div>
  );
};

export default CreateCoursePage;
