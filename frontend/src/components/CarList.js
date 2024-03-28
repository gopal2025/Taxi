export default function CarList({ carsData, handleBook, closeModal }) {
  const handleClick = (carName) => {
    handleBook(carName);
  };

  return (
    <div
      className="fixed w-full inset-0 z-50 bg-black bg-opacity-60 flex flex-col justify-center items-center overflow-auto"
      onClick={closeModal}
    >
      {carsData.length ? (
        <div className="flex flex-col gap-4 md:w-1/2 xl:w-1/3">
          {carsData.map((car, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-md flex flex-row items-center gap-4 p-4 md:justify-around xl:justify-center xl:gap-12"
            >
              <div className="flex flex-col items-center gap-2">
                <div>
                  <img
                    className="w-24 md:w-32 rounded-md"
                    src={car.img}
                    alt={car.carName}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center gap-1">
                <div className="font-semibold">{`Car ${car.carName}`}</div>
                <div className="text-gray-700">Price: ₹{car.price}</div>
                <div className="text-gray-700">
                  Journey Time: {car.timeToReach} minutes
                </div>
              </div>
              <div
                onClick={() => handleClick(car.carName)}
                className="bg-blue-500 max-w-max max-h-max text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
              >
                Book
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap bg-gray-100 rounded text-lg font-bold p-16">
          No Cars Available. Please try later.
        </div>
      )}
    </div>
  );
}
