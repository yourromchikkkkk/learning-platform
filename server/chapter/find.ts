import { db } from '@/lib/db';

export const findFirstChapter = async (courseId: string) => {
  return await db.chapter.findFirst({
    where: { courseId },
    orderBy: { position: 'desc' },
  });
};
