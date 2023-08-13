import { signInWithGoogle } from "../firebase";

const Login = () => {
  return (
    <div className="dashboard">
      <button onClick={signInWithGoogle}>Sing in with Google</button>
    </div>
  );
};

export default Login;
