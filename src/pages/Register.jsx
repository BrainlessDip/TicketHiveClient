import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import useAxios from "./../hooks/useAxios";

const Register = () => {
  const { handleRegister, handleSignin } = useContext(AuthContext);
  const api = useAxios();
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!regex.test(password)) {
      toast.error(
        <div>
          <div>Password must</div>
          <div>- Have at least one uppercase letter</div>
          <div>- Have at least one lowercase letter</div>
          <div>- Be at least 6 characters long</div>
        </div>
      );
      return;
    }

    const result = await handleRegister(email, password, name, photoURL);

    if (result) {
      await api.post("/register", { name, email });
      await navigate("/");
    }
  };

  const handleGoogleSignin = async () => {
    const result = await handleSignin();
    if (result) {
      navigate("/");
    }
  };

  useEffect(() => {
    document.title = `Register | Ticket Hive`;
  }, []);

  return (
    <div className="flex justify-center items-center flex-col relative min-h-[calc(100vh-95px)] md:min-h-[calc(100vh-95xp)] px-4">
      <h2 className="text-4xl font-bold drop-shadow-xl mb-6 tracking-tight">
        Create an Account
      </h2>

      <fieldset className="fieldset bg-base-100 border border-base-300 rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <form onSubmit={registerUser} className="space-y-3">
          <label className="label font-semibold">Name</label>
          <input
            type="text"
            className="input input-bordered focus:outline-none focus:ring focus:ring-primary/40 w-full"
            name="name"
            placeholder="Your full name"
            required
          />

          <label className="label font-semibold">Photo URL</label>
          <input
            type="text"
            className="input input-bordered focus:outline-none focus:ring focus:ring-primary/40 w-full"
            name="photoURL"
            placeholder="Your photo URL"
            required
          />

          <label className="label font-semibold">Email</label>
          <input
            type="email"
            className="input input-bordered focus:outline-none focus:ring focus:ring-primary/40 w-full"
            name="email"
            placeholder="your@email.com"
            required
          />

          <label className="label font-semibold">Password</label>
          <input
            type="password"
            className="input input-bordered focus:outline-none focus:ring focus:ring-primary/40 w-full"
            name="password"
            placeholder="At least 6 characters"
            required
          />

          <button className="btn btn-primary mt-4 w-full text-[17px] shadow-md hover:shadow-lg duration-200">
            Register
          </button>

          <p className="mt-2 text-center text-[15px] text-primary">
            Already have an account?{" "}
            <span
              className="font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleGoogleSignin}
            className="btn bg-white text-black border border-base-300 shadow-sm hover:shadow duration-200"
            type="button"
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
  );
};

export default Register;
