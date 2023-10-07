'use client';
import Link from 'next/link';
import Logo from './logo';
import SidebarRoutes from './sidebar-routes';
import { usePathname } from 'next/navigation';
import { ROUTES_PATH } from '@/lib/const';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Link
          href={
            pathname.includes(ROUTES_PATH.Teacher)
              ? ROUTES_PATH.TeacherCourses
              : ROUTES_PATH.Dashboard
          }
        >
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
