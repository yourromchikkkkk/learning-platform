import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export const updateCourseByIdAndOwner = async ({
  id,
  userId,
  ...data
}: {
  id: string;
  userId: string;
}) => {
  if (!id || !userId) return;
  return await db.course.update({
    where: { id, userId },
    data: { ...data },
  });
};
