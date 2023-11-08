import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import {
  findCourseOwner,
  createAttachment,
} from '@/server';

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();
    const { url } = await request.json();
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

    const attachments = await createAttachment({
      url,
      name: url.split('/').pop(),
      courseId: params.courseId,
    });

    return NextResponse.json(attachments);
  } catch (error) {
    console.error('COURSE_ID ATTACHMENTS', error);
    return new NextResponse('Internal error', {
      status: 500,
    });
  }
}
