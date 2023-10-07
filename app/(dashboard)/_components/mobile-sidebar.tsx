import { Menu, Sidebar } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 pt-1 bg-white"
      >
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
