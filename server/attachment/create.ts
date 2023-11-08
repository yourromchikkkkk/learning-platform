import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export const createAttachment = async (
  data: Prisma.AttachmentCreateArgs['data'],
) => {
  return await db.attachment.create({ data: { ...data } });
};
