export default function Error({ message }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md mt-2">
      <div className="flex">
        <div className="py-1">
          <svg
            className="fill-current h-6 w-6 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM5.879 5.879a1 1 0 1 1 1.414-1.414L10 8.586l2.707-2.707a1 1 0 1 1 1.414 1.414L11.414 10l2.707 2.707a1 1 0 1 1-1.414 1.414L10 11.414l-2.707 2.707a1 1 0 1 1-1.414-1.414L8.586 10 5.879 7.293a1 1 0 0 1 0-1.414z"
            />
          </svg>
        </div>
        <div>
          <p className="font-bold">Error:</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
