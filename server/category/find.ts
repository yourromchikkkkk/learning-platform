import { db } from '@/lib/db';

export const findAllCategories = async () => {
  return await db.category.findMany({
    orderBy: { name: 'asc' },
  });
};
