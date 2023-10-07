import { ROUTES_PATH } from '@/lib/const';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <p>This is protected page</p>
      <UserButton
        afterSignOutUrl={ROUTES_PATH.Dashboard}
      />
    </div>
  );
}
