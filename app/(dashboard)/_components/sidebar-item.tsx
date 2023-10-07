'use client';

import { ROUTES_PATH } from '@/lib/const';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import {
  usePathname,
  useRouter,
} from 'next/navigation';

interface ISidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: ISidebarItem) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === ROUTES_PATH.Dashboard &&
      href === ROUTES_PATH.Dashboard) ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
        isActive && 'text-sky-700 bg-sky-200/20',
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            'text-slate-500',
            isActive && 'text-sky-700',
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          'ml-auto opacity-0 border-2 border-sky-700 h-full transition-all',
          isActive && 'opacity-100',
        )}
      />
    </button>
  );
};

export default SidebarItem;
