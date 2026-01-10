import { useContext, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/ui/Loading";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
  });
  const [errors, setErrors] = useState({});

  const { data = {}, isLoading } = useQuery({
    queryKey: ["user-data", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/profile`);
      return res.data;
    },
  });

  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim().length > 50) return "Name must not exceed 50 characters";
    return "";
  };

  const validatePhotoURL = (url) => {
    if (!url.trim()) return "";
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        return "URL must use http:// or https://";
      }
      return "";
    } catch {
      return "Please enter a valid URL";
    }
  };

  const handleEdit = () => {
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });
    setErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ displayName: "", photoURL: "" });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "displayName") {
      error = validateName(value);
    } else if (name === "photoURL") {
      error = validatePhotoURL(value);
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameError = validateName(formData.displayName);
    const photoError = validatePhotoURL(formData.photoURL);

    if (nameError || photoError) {
      setErrors({
        displayName: nameError,
        photoURL: photoError,
      });
      toast.error("Please fix all errors before submitting");
      return;
    }

    setUpdating(true);

    try {
      await updateProfile(user, {
        displayName: formData.displayName.trim(),
        photoURL: formData.photoURL.trim() || null,
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col min-h-[calc(100vh-95px)] px-4 py-10">
        <h2 className="text-4xl font-bold drop-shadow-xl mb-6">My Profile</h2>

        <div className="bg-base-100 border border-base-300 rounded-2xl w-full max-w-md p-6 shadow-xl">
          {!isEditing ? (
            <div className="flex flex-col items-center gap-3">
              <img
                src={
                  user?.photoURL ||
                  "https://img.icons8.com/?size=100&id=fUUEbUbXhzOA&format=png&color=ffffff"
                }
                alt="Profile"
                className="w-28 h-28 rounded-2xl shadow-md object-cover"
              />

              <h1 className="text-xl font-bold">{user?.displayName}</h1>
              <p className="text-[15px] text-base-content/70">
                Email: {user?.email || "Not available"}
              </p>
              <p className="text-[15px] text-base-content/70 capitalize">
                Role: {data?.role || "Not available"}
              </p>

              <button
                onClick={handleEdit}
                className="btn btn-primary mt-4 w-full"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                <img
                  src={
                    formData.photoURL ||
                    user?.photoURL ||
                    "https://img.icons8.com/?size=100&id=fUUEbUbXhzOA&format=png&color=ffffff"
                  }
                  alt="Profile Preview"
                  className="w-28 h-28 rounded-2xl shadow-md object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://img.icons8.com/?size=100&id=fUUEbUbXhzOA&format=png&color=ffffff";
                  }}
                />
                <p className="text-xs text-base-content/60 mt-2">
                  Profile Preview
                </p>
              </div>

              <div>
                <label className="label font-semibold">
                  Display Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/40 ${
                    errors.displayName ? "input-error" : ""
                  }`}
                  placeholder="Enter your name"
                  disabled={updating}
                />
                {errors.displayName && (
                  <p className="text-error text-sm mt-1 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.displayName}
                  </p>
                )}
              </div>

              <div>
                <label className="label font-semibold">Photo URL</label>
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/40 ${
                    errors.photoURL ? "input-error" : ""
                  }`}
                  placeholder="https://example.com/photo.jpg"
                  disabled={updating}
                />
                {errors.photoURL && (
                  <p className="text-error text-sm mt-1 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.photoURL}
                  </p>
                )}
                <p className="text-xs text-base-content/60 mt-1">
                  Leave empty to use default avatar
                </p>
              </div>

              <div>
                <label className="label font-semibold">Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  className="input input-bordered w-full bg-base-200 cursor-not-allowed"
                  disabled
                  readOnly
                />
                <p className="text-xs text-base-content/60 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className="label font-semibold">Role</label>
                <input
                  type="text"
                  value={data?.role || "Not available"}
                  className="input input-bordered w-full bg-base-200 cursor-not-allowed capitalize"
                  disabled
                  readOnly
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-outline flex-1"
                  disabled={updating}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

