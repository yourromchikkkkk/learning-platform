import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PSOT(
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

    const courseOwner = await db.course.findUnique({
      where: { id: params.courseId, userId: userId },
    });

    if (!courseOwner) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    const lastChapter = await db.chapter.findFirst({
      where: { courseId: params.courseId },
      orderBy: { position: 'desc' },
    });

    const newPosotion = lastChapter
      ? lastChapter.position + 1
      : 1;

    const chapter = await db.chapter.create({
      data: {
        title: '',
        courseId: params.courseId,
        position: newPosotion,
      },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.error('COURSE_ID CHAPTERS', error);
    return new NextResponse('Internal error', {
      status: 500,
    });
  }
}
