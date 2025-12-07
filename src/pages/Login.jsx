import { use, useEffect, useRef, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../firebase/firebase.init.js";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { AuthContext } from "../contexts/AuthContext.jsx";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const { setUser } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();

  const handleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/user-disabled":
          toast.error(
            "Your account has been disabled. Please contact support."
          );
          break;
        case "auth/popup-closed-by-user":
          toast.error("Sign-in cancelled. Please try again.");
          break;
        case "auth/network-request-failed":
          toast.error("Network error. Check your connection and try again.");
          break;
        default:
          toast.error("An unexpected error occurred. Please try again later.");
          break;
      }
    }
  };

  const handleEmailSignin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/user-disabled":
          toast.error(
            "Your account has been disabled. Please contact support."
          );
          break;
        case "auth/popup-closed-by-user":
          toast.error("Sign-in cancelled. Please try again.");
          break;
        case "auth/network-request-failed":
          toast.error("Network error. Check your connection and try again.");
          break;
        case "auth/invalid-credential":
          toast.error(
            "Invalid credentials provided. Please try again with correct login details."
          );
          break;
        default:
          toast.error("An unexpected error occurred. Please try again later.");
          break;
      }
    }
  };

  useEffect(() => {
    document.title = `Login | Ticket Hive`;
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col relative min-h-[calc(100vh-95px)] md:min-h-[calc(100vh-95px)] px-4">
        <h2 className="text-4xl font-bold drop-shadow-xl mb-6 tracking-tight">
          Login
        </h2>
        <fieldset className="fieldset bg-base-100 border border-base-300 rounded-2xl w-full max-w-sm p-6 shadow-xl">
          <form onSubmit={handleEmailSignin} className="space-y-3">
            <label className="label font-semibold">Email</label>
            <input
              type="email"
              className="input input-bordered focus:outline-none focus:ring focus:ring-primary/40 w-full"
              name="email"
              placeholder="Email"
              autoComplete="username"
              ref={emailRef}
              required
            />

            <label className="label font-semibold">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/40"
                placeholder="Password"
                name="password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl text-base-content/70 hover:opacity-60"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>

            <button className="btn btn-primary mt-4 w-full text-[17px] shadow-md hover:shadow-lg duration-200">
              Login
            </button>

            <p className="mt-1 text-[15px] text-center text-primary">
              Don’t have an account?{" "}
              <span
                className="font-semibold hover:underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register now
              </span>
            </p>
          </form>

          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handleSignin}
              className="btn bg-white text-black border border-base-300 shadow-sm hover:shadow duration-200"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default Login;
