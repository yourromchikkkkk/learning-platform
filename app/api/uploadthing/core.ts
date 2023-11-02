import {
  createUploadthing,
  type FileRouter,
} from 'uploadthing/next';
import { auth } from '@clerk/nextjs';

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const uploadthingFileRouter = {
  courseImage: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  courseAttachment: f([
    'text',
    'image',
    'audio',
    'video',
    'pdf',
  ])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  chapterVideo: f({
    video: { maxFileCount: 1, maxFileSize: '2GB' },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type UploadthingFileRouter = typeof uploadthingFileRouter;
