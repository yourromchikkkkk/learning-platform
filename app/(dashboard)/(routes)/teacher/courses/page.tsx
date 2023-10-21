import { Button } from '@/components/ui/button';
import { ROUTES_PATH } from '@/lib/const';
import Link from 'next/link';

const CoursesPage = () => {
  return (
    <div className="p-6">
      <Link href={ROUTES_PATH.TeacherCreateCourse}>
        <Button>New Course</Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
