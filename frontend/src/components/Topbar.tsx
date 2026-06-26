import { Show, SignInButton, SignOutButton } from '@clerk/react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SigninOAuthButtons from './SigninOAuthButtons.tsx';

const Topbar = () => {
  const isAdmin = false;
  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-mmd z-10'>
      <div className='flex gap-2 items-center'>
        Spotify
      </div>
      <div className='flex items-center gap-4'>
        {
          isAdmin && (
            <Link to={"/admin"} className='flex items-center'>
              <LayoutDashboardIcon className='size-4 mr-2'/>
              Admin Dashboard
            </Link>
          )
        }

        {/* when signed in */}
        <Show when="signed-in">
          <SignOutButton>
            Sign Out
          </SignOutButton>
        </Show>

        {/* when signed out */}
        <Show when="signed-out">
            <SigninOAuthButtons />
        </Show>
      </div>
    </div>
  )
}

export default Topbar