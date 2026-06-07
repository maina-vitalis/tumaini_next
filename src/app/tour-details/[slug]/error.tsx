"use client";

type ErrorProps = {
  reset: () => void;
};

const ErrorPage = ({ reset }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-72 bg-muted text p-5 mt-5 rounded-lg">
      <div className="text-6xl mb-4 text-red-500">⚠️</div>
      <h1 className="text-xl md:text-3xl font-bold mb-2 text-center">
        Oops! Something Went Wrong
      </h1>
      <p className="md:text-lg mb-6 text-center">
        We couldn&apos;t fetch the tour details. Please try again later or
        refresh the page.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 text-white bg-greenPrimary rounded-lg shadow-md transition-all duration-300"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;
