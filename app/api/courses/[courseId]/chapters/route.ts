import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import {
  createChapter,
  findFirstChapter,
  findCourseOwner,
} from '@/server';

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();
    const { title } = await request.json();

    if (!userId) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    const courseOwner = await findCourseOwner({
      courseId: params.courseId,
      ownerId: userId,
    });

    if (!courseOwner) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    const lastChapter = await findFirstChapter(
      params.courseId,
    );

    const newPosotion = lastChapter
      ? lastChapter.position + 1
      : 1;

    const chapter = await createChapter({
      title,
      courseId: params.courseId,
      position: newPosotion,
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.error('COURSE_ID CHAPTERS', error);
    return new NextResponse('Internal error', {
      status: 500,
    });
  }
}
