import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export const createChapter = async (
  data: Prisma.ChapterUncheckedCreateInput,
) => {
  return await db.chapter.create({ data: { ...data } });
};
