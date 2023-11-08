import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { updateCourseByIdAndOwner } from '@/server';

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const value = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', {
        status: 401,
      });
    }

    const course = await updateCourseByIdAndOwner({
      id: courseId,
      userId,
      ...value,
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error('[COURSEID]: ', error);
    return new NextResponse('Internal Error', {
      status: 500,
    });
  }
}
