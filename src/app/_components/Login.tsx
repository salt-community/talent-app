'use client'
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
const  {data: session2} = useSession()
  return (
    <>
      {!session2 && <button onClick={async () => await signIn("google", { callbackUrl: '/' })}>Sign In</button>}
      {session2 && <button onClick={async () => await signOut()}>Sign Out</button>}
    </>

  )
}

export default Login

