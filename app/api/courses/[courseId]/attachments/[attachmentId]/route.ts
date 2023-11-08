import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { utapi } from '@/lib/const/uploadthing-api';
import { findCourseOwner } from '@/server';
import { deleteAttachment } from '@/server';

export async function DELETE(
  request: Request,
  {
    params,
  }: { params: { courseId: string; attachmentId: string } },
) {
  try {
    const { userId } = auth();

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

    const attachment = await deleteAttachment({
      id: params.attachmentId,
      courseId: params.attachmentId,
    });
    const splitUrl = attachment.url.split('/');
    utapi.deleteFiles([splitUrl[splitUrl.length - 1]]);

    return NextResponse.json(attachment);
  } catch (error) {
    console.error('COURSE_ID ATTACHMENTS', error);
    return new NextResponse('Internal error', {
      status: 500,
    });
  }
}
