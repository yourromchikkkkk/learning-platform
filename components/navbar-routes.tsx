'use client';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { ROUTES_PATH } from '@/lib/const';

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith(
    ROUTES_PATH.Teacher,
  );
  const isPlayerPage =
    pathname?.includes('/chapter');

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href={ROUTES_PATH.Dashboard}>
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exite
          </Button>
        </Link>
      ) : (
        <Link href={ROUTES_PATH.TeacherCourses}>
          <Button size="sm" variant="ghost">
            Teacher Mode
          </Button>
        </Link>
      )}
      <UserButton
        afterSignOutUrl={ROUTES_PATH.Dashboard}
      />
    </div>
  );
};

export default NavbarRoutes;
