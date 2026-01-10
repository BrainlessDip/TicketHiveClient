import { use, useEffect, useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.init.js";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Login = () => {
  const { setUser, handleSignin } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const DEMO_CREDENTIALS = {
    email: "demo@gmail.com",
    password: "Demo123456",
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFieldChange = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDemoLogin = async () => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = DEMO_CREDENTIALS.email;
      passwordRef.current.value = DEMO_CREDENTIALS.password;
      setErrors({});
      const result = await signInWithEmailAndPassword(auth, DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
      setUser(result.user);
      toast.success("Login successful! Welcome back.");
      navigate("/");
    }
  };

  const handleEmailSignin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      toast.error("Please fix all errors before submitting");
      return;
    }

    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      toast.success("Login successful! Welcome back.");
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
        case "auth/wrong-password":
        case "auth/user-not-found":
          toast.error(
            "Invalid email or password. Please check your credentials."
          );
          setErrors({
            email: "Invalid credentials",
            password: "Invalid credentials",
          });
          break;
        case "auth/too-many-requests":
          toast.error(
            "Too many failed login attempts. Please try again later."
          );
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format. Please check your email.");
          setErrors({ email: "Invalid email format" });
          break;
        default:
          toast.error("An unexpected error occurred. Please try again later.");
          console.error("Login error:", error);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `Login | Ticket Hive`;
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col relative min-h-[calc(100vh-95px)] md:min-h-[calc(100vh-95px)] px-4 py-8">
        <h2 className="text-4xl font-bold drop-shadow-xl mb-6 tracking-tight">
          Login
        </h2>
        <fieldset 
          className="fieldset bg-base-100 border border-base-300 rounded-2xl w-full max-w-sm p-6 shadow-xl"
          disabled={loading}
        >
          <form onSubmit={handleEmailSignin} className="space-y-3">
            <div>
              <label className="label font-semibold">
                Email <span className="text-error">*</span>
              </label>
              <input
                type="email"
                className={`input input-bordered focus:outline-none focus:ring focus:ring-primary/40 w-full ${
                  errors.email ? "input-error" : ""
                }`}
                name="email"
                placeholder="your.email@example.com"
                autoComplete="username"
                ref={emailRef}
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
              />
              {errors.email && (
                <p className="text-error text-sm mt-1 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="label font-semibold">
                Password <span className="text-error">*</span>
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/40 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="Enter your password"
                  name="password"
                  autoComplete="current-password"
                  ref={passwordRef}
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl text-base-content/70 hover:opacity-60"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-error text-sm mt-1 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            <p className="text-[15px] text-center text-primary">
              Forgot your account password?{" "}
              <span
                className="font-semibold hover:underline cursor-pointer"
                onClick={() => navigate("/reset-password")}
              >
                Reset it
              </span>
            </p>

            <button 
              type="submit"
              className="btn btn-primary mt-0 w-full text-[17px] shadow-md hover:shadow-lg duration-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn btn-outline btn-secondary w-full text-[16px]"
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Demo Login
            </button>

            <p className="mt-1 text-[15px] text-center text-primary">
              Don't have an account?{" "}
              <span
                className="font-semibold hover:underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register now
              </span>
            </p>
          </form>

          <div className="divider text-sm text-base-content/60">OR</div>

          <div className="flex justify-center items-center">
            <button
              onClick={handleSignin}
              className="btn bg-white text-black border border-base-300 shadow-sm hover:shadow duration-200 w-full"
              disabled={loading}
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
              Continue with Google
            </button>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default Login;

