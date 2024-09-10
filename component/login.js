import React from "react";
import { signInWithGoogle } from "../firebaseConfig";

const Login = () => {
  return (
    <div>
      <h2>Login to Chat App</h2>
      <button onClick={signInWithGoogle}>Login with Google</button>
    </div>
  );
};

export default Login;
