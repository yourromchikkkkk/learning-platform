import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export const deleteAttachment = async (
  whereArgs: Prisma.AttachmentDeleteArgs['where'],
) => {
  return await db.attachment.delete({
    where: { ...whereArgs },
  });
};
