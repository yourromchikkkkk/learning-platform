import { db } from '@/lib/db';

interface FindCourseByIdAndOwnerArgs {
  courseId: string;
  ownerId: string;
}

export const findCourseOwner = async ({
  courseId,
  ownerId,
}: FindCourseByIdAndOwnerArgs) => {
  return await db.course.findUnique({
    where: { id: courseId, userId: ownerId },
  });
};

export const findCourseDataByIdAndOwner = async ({
  courseId,
  ownerId,
}: FindCourseByIdAndOwnerArgs) => {
  return await db.course.findUnique({
    where: { id: courseId, userId: ownerId },
    include: {
      attachments: { orderBy: { createdAt: 'desc' } },
      chapters: { orderBy: { position: 'asc' } },
    },
  });
};
