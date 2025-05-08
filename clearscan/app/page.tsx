export default function HomePage() {
  return (
    <main className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-6">Welcome to ClearScan</h1>
        <a href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Login
        </a>
      </div>
    </main>
  );
}
