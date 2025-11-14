export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">404 - Page Not Found</h2>
        <a
          href="/"
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}






