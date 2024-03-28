export default function Navbar({ setShowDashboard }) {
  return (
    <div className="flex flex-row items-center justify-between shadow-lg py-3 px-3 md:px-8 md:py-6 bg-gray-100">
      <div
        className="text-lg font-semibold cursor-pointer"
        onClick={() => setShowDashboard(true)}
      >
        Dashboard
      </div>
      <div className="text-2xl font-bold">CityCabbie</div>
      <div
        className="text-lg font-semibold cursor-pointer"
        onClick={() => setShowDashboard(false)}
      >
        Book Cab
      </div>
    </div>
  );
}
