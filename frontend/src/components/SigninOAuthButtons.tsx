import { useSignIn } from '@clerk/react'
import { Button } from './ui/button';

const SigninOAuthButtons = () => {
  const {signIn, fetchStatus} = useSignIn();

  const signInWithGoogle = async () => {
    // ? sso <- authenticateWithRedirect 
    await signIn.sso({
      strategy: "oauth_google",
      redirectCallbackUrl: "/sso-callback",
      redirectUrl: "/auth-callback" // on completion
    });
  }

  // TODO : fix here
  // if(fetchStatus === "fetching"){
  //   return null;
  // }

  return (
    <>
      <Button variant={"secondary"} className='w-full text-white h-11' 
        onClick={signInWithGoogle}
        disabled={fetchStatus === "fetching"}
      >
        {fetchStatus === "fetching" ? "Signing in..." : "Continue with Google"}
      </Button>
    </>
  )
}

export default SigninOAuthButtons