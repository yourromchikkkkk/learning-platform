'use client';

import {
  BarChart,
  Compass,
  Layout,
  List,
  icons,
} from 'lucide-react';
import SidebarItem from './sidebar-item';
import { usePathname } from 'next/navigation';
import {
  ROUTES_NAME,
  ROUTES_PATH,
} from '@/lib/const';

const guestRoutes = [
  {
    icon: Layout,
    label: ROUTES_NAME.Dashboard,
    href: ROUTES_PATH.Dashboard,
  },
  {
    icon: Compass,
    label: ROUTES_NAME.Browse,
    href: ROUTES_PATH.Browse,
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: ROUTES_NAME.Courses,
    href: ROUTES_PATH.TeacherCourses,
  },
  {
    icon: BarChart,
    label: ROUTES_NAME.Analytics,
    href: ROUTES_PATH.TeacherAnalytics,
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();

  const routes = pathname.includes(
    ROUTES_PATH.Teacher,
  )
    ? teacherRoutes
    : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
