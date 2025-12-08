import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const availablePerks = ["AC", "Breakfast", "WiFi", "Snacks", "Extra Legroom"];

export default function AddTicketForm() {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const api = useAxiosSecure();

  const handlePerkChange = (perk) => {
    setSelectedPerks((prev) =>
      prev.includes(perk) ? prev.filter((p) => p !== perk) : [...prev, perk]
    );
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

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
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const payload = {
        name: e.target.name.value,
        email: e.target.email.value,
        title: e.target.title.value,
        from: e.target.from.value,
        to: e.target.to.value,
        transportType: e.target.transportType.value,
        pricePerUnit: Number(e.target.pricePerUnit.value),
        quantity: Number(e.target.quantity.value),
        departure: new Date(e.target.departure.value).toISOString(),
        perks: selectedPerks,
        imageUrl: imageFile,
      };
      console.log(payload);

      const res = await api.post("/add-ticket", payload);
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Error adding ticket: " + err.message);
    } finally {
      setSubmitting(false);
      e.target.reset();
      setImageFile(null);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col relative min-h-[calc(100vh-95px)] md:min-h-[calc(100vh-95px)] px-4">
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

        <fieldset className="fieldset bg-base-100 border border-base-300 rounded-2xl w-full max-w-lg p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="label font-semibold">Title</label>
            <input
              name="title"
              className="input input-bordered focus:outline-none focus:ring focus:ring-primary/40 w-full"
              placeholder="Ticket title"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label font-semibold">From (Location)</label>
                <input
                  name="from"
                  list="locations"
                  autoComplete="off"
                  className="input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/40"
                  placeholder="From"
                  required
                />
              </div>
              <div>
                <label className="label font-semibold">To (Location)</label>
                <input
                  name="to"
                  list="locations"
                  autoComplete="off"
                  className="input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/40"
                  placeholder="To"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="label font-semibold">Transport Type</label>
                <select
                  name="transportType"
                  className="select select-bordered w-full focus:outline-none focus:ring focus:ring-primary/40"
                  required
                >
                  <option disabled selected>
                    Select Transport Type
                  </option>
                  <option>Bus</option>
                  <option>Train</option>
                  <option>Launch</option>
                  <option>Plane</option>
                </select>
              </div>

              <div>
                <label className="label font-semibold">Price (per unit)</label>
                <input
                  name="pricePerUnit"
                  type="number"
                  className="input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/40"
                  placeholder="850"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="label font-semibold">Quantity</label>
                <input
                  name="quantity"
                  type="number"
                  className="input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/40"
                  placeholder="40"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label font-semibold">
                Departure date &amp; time
              </label>
              <input
                name="departure"
                type="datetime-local"
                className="input input-bordered w-full focus:outline-none focus:ring focus:ring-primary/40"
                required
              />
            </div>

            <div>
              <label className="label font-semibold">Perks</label>
              <div className="flex justify-center items-start gap-1 flex-col">
                {availablePerks.map((p) => (
                  <label key={p} className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={selectedPerks.includes(p)}
                      onChange={() => handlePerkChange(p)}
                      name="perks"
                    />
                    <span className="ml-2">{p}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="label font-semibold">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="file-input file-input-bordered w-full"
                required
              />
              {imageFile && (
                <div className="mt-3">
                  <img
                    src={imageFile}
                    alt="preview"
                    className="rounded-lg  w-full object-cover border border-base-300"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="label font-semibold">Vendor name</label>
              <input
                name="name"
                value={user?.displayName}
                readOnly
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="label font-semibold">Vendor email</label>
              <input
                name="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-0 w-full text-[17px] shadow-md hover:shadow-lg duration-200"
              disabled={submitting}
            >
              {submitting ? "Adding ticket..." : "Add Ticket"}
            </button>
          </form>
        </fieldset>
      </div>
    </>
  );
}
