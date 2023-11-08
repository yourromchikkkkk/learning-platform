import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export const createCourse = async (
  data: Prisma.CourseCreateInput,
) => {
  return await db.course.create({
    data: {
      ...data,
    },
  });
};
