import React, { useEffect, useState } from "react";
import { makeGETRequest, makePOSTRequest } from "../utils/serverHelpers";
import CarList from "./CarList";
import Dashboard from "./Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./Error";
import Navbar from "./Navbar";
import Loader from "./Loader";

export default function Form() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [email, setEmail] = useState("");
  const [carsData, setCarsData] = useState();
  const [dashboardData, setDashboardData] = useState();
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await makeGETRequest("/dashboard");
        setDashboardData(response);
        setError(null);
      } catch (error) {
        setIsLoading(true);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
    const intervalId = setInterval(fetchDashboardData, 60000);
    return () => clearInterval(intervalId);
  }, [carsData]);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  const handleSourceChange = (e) => {
    const newSource = e.target.value;
    setSource(newSource);
  };

  const handleDestinationChange = (e) => {
    const newDestination = e.target.value;
    setDestination(newDestination);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!source) {
        toast.error("Please specify the source city");
        return;
      }
      if (!destination) {
        toast.error("Please specify the destination city");
        return;
      }
      if (!email) {
        toast.error("Please specify the email ID");
        return;
      }
      const response = await makePOSTRequest("/available-cars", {
        source,
        destination,
        email,
      });
      setCarsData(response);
      setError(null);
      setModal(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBook = async (carName) => {
    try {
      const response = await makePOSTRequest("/book-car", {
        source,
        destination,
        email,
        carName,
      });
      toast.success("Congratulations! Your cab reservation is confirmed.");
      handleSentMail(
        email,
        source,
        destination,
        carName,
        response.endTime - response.bookTime,
        response.price * (response.endTime - response.bookTime)
      );
      setCarsData(null);
      setEmail("");
      setDestination("");
      setSource("");
      setShowDashboard(true);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const handleSentMail = async (
    email,
    source,
    destination,
    carName,
    time,
    price
  ) => {
    try {
      const response = await makePOSTRequest("/sent-mail", {
        source,
        destination,
        email,
        carName,
        time,
        price,
      });
    } catch (error) {
      setError(error);
    }
  };

  const sourceOptions = ["none", "A", "B", "C", "D", "E", "F"]
    .filter((city) => city !== destination)
    .map((city) => (
      <option key={city} value={city}>
        {city === "none" ? "none" : `City ${city}`}
      </option>
    ));

  const destinationOptions = ["none", "A", "B", "C", "D", "E", "F"]
    .filter((city) => city !== source)
    .map((city) => (
      <option key={city} value={city}>
        {city === "none" ? "none" : `City ${city}`}
      </option>
    ));

  return (
    <div className="">
      <Navbar setShowDashboard={setShowDashboard} />
      {isLoading && <Loader />}
      {!isLoading && dashboardData && showDashboard && (
        <Dashboard dashboardData={dashboardData} />
      )}
      {!showDashboard && (
        <div className="max-w-md mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-xl">
          <div className="text-2xl font-semibold mb-4">
            Select Source and Destination City
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center"
          >
            <div className="mb-4">
              <label htmlFor="source" className="block text-gray-700">
                Email:
              </label>
              <input
                id="email"
                placeholder="Enter Your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 px-2 py-2 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="source" className="block text-gray-700">
                Source City:
              </label>
              <select
                id="source"
                value={source}
                onChange={handleSourceChange}
                className="mt-1 px-1 py-2 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
              >
                {sourceOptions}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="destination" className="block text-gray-700 ">
                Destination City:
              </label>
              <select
                id="destination"
                value={destination}
                onChange={handleDestinationChange}
                className="mt-1 px-1 py-2 block w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
              >
                {destinationOptions}
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 mt-4 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Find Available Cars
            </button>
          </form>
        </div>
      )}
      {modal && !isLoading && (
        <CarList
          carsData={carsData}
          handleBook={handleBook}
          closeModal={() => {
            setModal(false);
          }}
        />
      )}
      <ToastContainer />
      {error && <Error message={"Something went wrong!"} />}
    </div>
  );
}
