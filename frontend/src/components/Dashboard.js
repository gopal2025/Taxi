export default function Dashboard({ dashboardData }) {
  return (
    <div className="container mx-auto md:mt-9 p-8">
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4 justify-center">
        {dashboardData.map((car, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-row items-center gap-4 w-full"
          >
            <div>
              <img
                src={car.img}
                className="w-64 rounded-md"
                alt={car.carName}
              />
            </div>
            <div className="grid grid-rows-4 max-h-max justify-center gap-1">
              {car.available ? (
                <div className="max-w-max border text-xs bg-green-500 rounded text-white flex items-center justify-center px-2">
                  Available
                </div>
              ) : (
                <div className="max-w-max border text-xs bg-red-500 rounded text-white flex items-center justify-center px-2">
                  On Trip
                </div>
              )}

              <div className="text-sm md:text-lg font-semibold flex items-center">
                Car {car.carName}
              </div>

              {car.bookedBy ? (
                <div className="text-xs md:text-sm text-gray-700 flex items-center">
                  Booked By: {car.bookedBy}
                </div>
              ) : (
                <div className="text-xs md:text-sm md:font-semibold text-gray-700 flex items-center">
                  Price/min ₹{car.price}
                </div>
              )}
              {car.timeLeft > 0 && (
                <div className="text-xs md:text-sm md:font-semibold text-teal-600 flex items-center">
                  Available in {car.timeLeft} minutes
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
