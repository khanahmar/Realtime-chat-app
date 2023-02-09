import React from "react"
import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const Auth = (props) => {
  async function signInWithGoogle() {
    const { setIsAuth } = props
    try {
      const result = await signInWithPopup(auth, provider)
      cookies.set("auth-token", result.user.refreshToken)
      setIsAuth(true)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="auth">
      <p>Sign in with google to continue</p>
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  )
}

export default Auth
