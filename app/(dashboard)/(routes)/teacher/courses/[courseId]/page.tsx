import { ROUTES_PATH } from '@/lib/const';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import EditCourseForm from './_components';
import {
  findAllCategories,
  findCourseDataByIdAndOwner,
} from '@/server';

const CourseDataPage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) return redirect(ROUTES_PATH.Browse);

  const course = await findCourseDataByIdAndOwner({
    courseId: params.courseId,
    ownerId: userId,
  });

  if (!course) return redirect(ROUTES_PATH.Browse);

  const categories = await findAllCategories();

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields =
    requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Course setup
          </h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>

      <EditCourseForm
        course={course}
        categories={categories}
      />
    </div>
  );
};

export default CourseDataPage;
