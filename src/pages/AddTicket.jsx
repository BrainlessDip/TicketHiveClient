import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const availablePerks = ["AC", "Breakfast", "WiFi", "Snacks", "Extra Legroom"];

const AddTicket = () => {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const api = useAxiosSecure();

  // Validation functions
  const validateTitle = (value) => {
    if (!value.trim()) return "Title is required";
    if (value.trim().length < 3) return "Title must be at least 3 characters";
    if (value.trim().length > 100) return "Title must not exceed 100 characters";
    return "";
  };

  const validateLocation = (value, fieldName) => {
    if (!value.trim()) return `${fieldName} location is required`;
    if (value.trim().length < 2) return `${fieldName} must be at least 2 characters`;
    return "";
  };

  const validatePrice = (value) => {
    const price = Number(value);
    if (isNaN(price)) return "Price must be a valid number";
    if (price <= 0) return "Price must be greater than 0";
    if (price > 1000000) return "Price seems unreasonably high";
    return "";
  };

  const validateQuantity = (value) => {
    const quantity = Number(value);
    if (isNaN(quantity)) return "Quantity must be a valid number";
    if (quantity <= 0) return "Quantity must be greater than 0";
    if (!Number.isInteger(quantity)) return "Quantity must be a whole number";
    if (quantity > 10000) return "Quantity seems unreasonably high";
    return "";
  };

  const validateDeparture = (value) => {
    if (!value) return "Departure date and time is required";
    const departureDate = new Date(value);
    const now = new Date();
    if (departureDate <= now) return "Departure must be in the future";
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    if (departureDate > oneYearFromNow) return "Departure date is too far in the future";
    return "";
  };

  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "title":
        error = validateTitle(value);
        break;
      case "from":
        error = validateLocation(value, "From");
        break;
      case "to":
        error = validateLocation(value, "To");
        break;
      case "pricePerUnit":
        error = validatePrice(value);
        break;
      case "quantity":
        error = validateQuantity(value);
        break;
      case "departure":
        error = validateDeparture(value);
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFieldChange = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePerkChange = (perk) => {
    setSelectedPerks((prev) =>
      prev.includes(perk) ? prev.filter((p) => p !== perk) : [...prev, perk]
    );
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be less than 5MB");
      return;
    }

    setImageError("");
    setImageUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=14df36cab39c34955113e8a12782d9a6",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setImageFile(data.data.url);
        toast.success("Image uploaded successfully!");
      } else {
        setImageError("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageError("Error uploading image. Please try again.");
      toast.error("Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  const validateForm = (formData) => {
    const newErrors = {};

    newErrors.title = validateTitle(formData.get("title"));
    
    const from = formData.get("from");
    const to = formData.get("to");
    
    if (!from || from === "Select") {
      newErrors.from = "Please select a departure location";
    } else {
      newErrors.from = validateLocation(from, "From");
    }
    
    if (!to || to === "Select") {
      newErrors.to = "Please select a destination location";
    } else {
      newErrors.to = validateLocation(to, "To");
    }
    
    newErrors.pricePerUnit = validatePrice(formData.get("pricePerUnit"));
    newErrors.quantity = validateQuantity(formData.get("quantity"));
    newErrors.departure = validateDeparture(formData.get("departure"));

    const transportType = formData.get("transportType");
    if (!transportType || transportType === "Select") {
      newErrors.transportType = "Please select a transport type";
    }

    if (from && to && from !== "Select" && to !== "Select" && from.toLowerCase() === to.toLowerCase()) {
      newErrors.to = "Destination must be different from origin";
    }

    if (!imageFile) {
      newErrors.image = "Please upload an image";
    }

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, v]) => v !== "")
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);

    if (!validateForm(formData)) {
      toast.error("Please fill all fields before submitting");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        title: formData.get("title"),
        from: formData.get("from"),
        to: formData.get("to"),
        transportType: formData.get("transportType"),
        pricePerUnit: Number(formData.get("pricePerUnit")),
        quantity: Number(formData.get("quantity")),
        departure: new Date(formData.get("departure")).toISOString(),
        perks: selectedPerks,
        imageUrl: imageFile,
      };

      const res = await api.post("/add-ticket", payload);
      
      setShowSuccess(true);
      toast.success(res.data.message || "Ticket added successfully!");
      
      e.target.reset();
      setImageFile(null);
      setSelectedPerks([]);
      setErrors({});
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Error adding ticket:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to add ticket";
      toast.error("Error: " + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col relative min-h-[calc(100vh-95px)] md:min-h-[calc(100vh-95px)] px-4 py-8">
        <h2 className="text-4xl font-bold drop-shadow-xl mb-6 tracking-tight">
          Add Ticket
        </h2>

        <datalist id="locations">
          <option value="Dhaka" />
          <option value="Chittagong" />
          <option value="Sylhet" />
          <option value="Rajshahi" />
          <option value="Khulna" />
        </datalist>

        <fieldset 
          className="fieldset bg-base-100 border border-base-300 rounded-2xl w-full max-w-lg p-6 shadow-xl relative"
          disabled={submitting}
        >
          {showSuccess && (
            <div className="absolute inset-0 bg-success/10 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
              <div className="bg-success text-success-content px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg font-semibold">Ticket Added Successfully!</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label font-semibold">
                Title <span className="text-error">*</span>
              </label>
              <input
                name="title"
                className={`input input-bordered focus:outline-none focus:ring focus:ring-primary/40 w-full ${
                  errors.title ? "input-error" : ""
                }`}
                placeholder="e.g., Dhaka to Chittagong Express"
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
              />
              {errors.title && (
                <p className="text-error text-sm mt-1 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.title}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label font-semibold">
                  From (Location) <span className="text-error">*</span>
                </label>
                <select
                  name="from"
                  className={`select select-bordered w-full focus:outline-none focus:ring focus:ring-primary/40 ${
                    errors.from ? "select-error" : ""
                  }`}
                  onChange={handleFieldChange}
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                  <option>Rajshahi</option>
                  <option>Khulna</option>
                </select>
                {errors.from && (
                  <p className="text-error text-xs mt-1">{errors.from}</p>
                )}
              </div>
              <div>
                <label className="label font-semibold">
                  To (Location) <span className="text-error">*</span>
                </label>
                <select
                  name="to"
                  className={`select select-bordered w-full focus:outline-none focus:ring focus:ring-primary/40 ${
                    errors.to ? "select-error" : ""
                  }`}
                  onChange={handleFieldChange}
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                  <option>Rajshahi</option>
                  <option>Khulna</option>
                </select>
                {errors.to && (
                  <p className="text-error text-xs mt-1">{errors.to}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="label font-semibold">
                  Transport <span className="text-error">*</span>
                </label>
                <select
                  name="transportType"
                  className={`select select-bordered w-full focus:outline-none focus:ring focus:ring-primary/40 ${
                    errors.transportType ? "select-error" : ""
                  }`}
                  onChange={handleFieldChange}
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option>Bus</option>
                  <option>Train</option>
                  <option>Launch</option>
                  <option>Plane</option>
                </select>
                {errors.transportType && (
                  <p className="text-error text-xs mt-1">{errors.transportType}</p>
                )}
              </div>

              <div>
                <label className="label font-semibold">
                  Price <span className="text-error">*</span>
                </label>
                <input
                  name="pricePerUnit"
                  type="number"
                  step="1"
                  className={`input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/40 ${
                    errors.pricePerUnit ? "input-error" : ""
                  }`}
                  placeholder="850"
                  min="0"
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                />
                {errors.pricePerUnit && (
                  <p className="text-error text-xs mt-1">{errors.pricePerUnit}</p>
                )}
              </div>

              <div>
                <label className="label font-semibold">
                  Quantity <span className="text-error">*</span>
                </label>
                <input
                  name="quantity"
                  type="number"
                  className={`input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/40 ${
                    errors.quantity ? "input-error" : ""
                  }`}
                  placeholder="40"
                  min="0"
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                />
                {errors.quantity && (
                  <p className="text-error text-xs mt-1">{errors.quantity}</p>
                )}
              </div>
            </div>

            {/* Departure */}
            <div>
              <label className="label font-semibold">
                Departure date &amp; time <span className="text-error">*</span>
              </label>
              <input
                name="departure"
                type="datetime-local"
                className={`input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/40 ${
                  errors.departure ? "input-error" : ""
                }`}
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
              />
              {errors.departure && (
                <p className="text-error text-sm mt-1 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.departure}
                </p>
              )}
            </div>

            {/* Perks */}
            <div>
              <label className="label font-semibold">Perks (Optional)</label>
              <div className="flex justify-center items-start gap-1 flex-col">
                {availablePerks.map((p) => (
                  <label key={p} className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={selectedPerks.includes(p)}
                      onChange={() => handlePerkChange(p)}
                      disabled={submitting}
                    />
                    <span className="ml-2">{p}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="label font-semibold">
                Image <span className="text-error">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className={`file-input file-input-bordered w-full ${
                  errors.image || imageError ? "file-input-error" : ""
                }`}
                disabled={imageUploading || submitting}
              />
              
              {imageUploading && (
                <div className="mt-3 flex items-center gap-2 text-primary">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span className="text-sm">Uploading image...</span>
                </div>
              )}
              
              {imageError && (
                <p className="text-error text-sm mt-1 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {imageError}
                </p>
              )}
              
              {errors.image && !imageFile && !imageUploading && (
                <p className="text-error text-sm mt-1 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.image}
                </p>
              )}
              
              {imageFile && !imageUploading && (
                <div className="mt-3 relative">
                  <img
                    src={imageFile}
                    alt="preview"
                    className="rounded-lg w-full object-cover border border-base-300"
                  />
                  <div className="absolute top-2 right-2 badge badge-success gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Uploaded
                  </div>
                </div>
              )}
            </div>

            {/* Vendor Info */}
            <div>
              <label className="label font-semibold">Vendor name</label>
              <input
                name="name"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="label font-semibold">Vendor email</label>
              <input
                name="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary mt-0 w-full text-[17px] shadow-md hover:shadow-lg duration-200"
              disabled={submitting || imageUploading}
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Adding ticket...
                </>
              ) : (
                "Add Ticket"
              )}
            </button>
          </form>
        </fieldset>
      </div>
    </>
  );
};

export default AddTicket;
