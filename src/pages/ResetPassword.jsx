import React, { useRef } from "react";
import auth from "../firebase/firebase.init";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const emailRef = useRef();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("A reset link has been sent to your email.");
    } catch (error) {
      toast.error(error.message);
    }
    e.target.reset();
  };

  return (
    <div>
      <div className="flex justify-center items-center flex-col relative min-h-[calc(100vh-95px)] md:min-h-[calc(100vh-95px)] px-4">
        <h2 className="text-4xl font-bold drop-shadow-xl mb-6 tracking-tight">
          Reset Password
        </h2>
        <fieldset className="fieldset bg-base-100 border border-base-300 rounded-2xl w-full max-w-sm p-6 shadow-xl">
          <form onSubmit={handleResetPassword} className="space-y-3">
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

            <button className="btn btn-primary mt-0 w-full text-[17px] shadow-md hover:shadow-lg duration-200">
              Reset
            </button>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default ResetPassword;
