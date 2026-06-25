import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';
import { Button } from './components/ui/button';

function App(){
  return (
    <>
    {/* if the user is signed out then show signin & signup buttons else show user button to view profile */}
      <header>
        <Show when="signed-out">
          {/* you can put your own custom button component here for your own styling*/}
          <SignInButton >
            <Button>
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton >
            <Button>
              Sign Up
            </Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App
