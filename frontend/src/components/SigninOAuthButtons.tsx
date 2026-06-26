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
  // TODO-DONE : No, remove this code. The disabled prop already handles it — button is unclickable during "fetching" and shows "Redirecting...". Returning null would just make the button disappear mid-click which is worse UX. The TODO is solved.
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