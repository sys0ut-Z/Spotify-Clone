import { Show, SignOutButton, UserButton } from '@clerk/react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SigninOAuthButtons from './SigninOAuthButtons.tsx';
import { useAuthStore } from '@/store/auth.store.ts';
import { cn } from '@/lib/utils.ts';
import { buttonVariants } from './ui/button.tsx';

const Topbar = () => {
  const {isAdmin} = useAuthStore();

  console.log({isAdmin});

  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-mmd z-10 rounded-md'>
      <div className='flex gap-2 lg:gap-2.5 items-center'>
        <img src="/spotify.png" alt="spotify-logo" className='w-8 h-8' />
        <span className='text-md lg:text-lg'>Spotify</span>
      </div>
      <div className='flex items-center gap-4'>
        {
          isAdmin && (
            <Link to={"/admin"} className={
              cn(buttonVariants({
                variant: "outline",
              }))
            }>
              <LayoutDashboardIcon className='size-4 mr-2'/>
              Admin Dashboard
            </Link>
          )
        }

        {/* when signed in */}
        {/* // ^ User can sign out using 'UserButton' */}
        {/* <Show when="signed-in">
          <SignOutButton>
            Sign Out
          </SignOutButton>
        </Show> */}

        {/* when signed out */}
        <Show when="signed-out">
          <SigninOAuthButtons />
        </Show>

        {/* This button will only show when signed in */}
        <UserButton />
      </div>
    </div>
  )
}

export default Topbar