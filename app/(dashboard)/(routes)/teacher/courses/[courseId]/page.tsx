import { ROUTES_PATH } from '@/lib/const';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import EditCourseForm from './_components';

const CourseDataPage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) return redirect(ROUTES_PATH.Browse);

  const course = await db.course.findFirst({
    where: { id: params.courseId },
    include: {
      attachments: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!course) return redirect(ROUTES_PATH.Browse);

  const categories = await db.category.findMany({
    orderBy: { name: 'asc' },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
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
