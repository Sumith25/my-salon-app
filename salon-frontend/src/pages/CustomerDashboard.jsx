export default function CustomerDashboard() {
  const name = sessionStorage.getItem("name");

return (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-semibold">Welcome, {name}!</h1>
    <p className="mt-4">You are logged in as a customer.</p>
  </div>
);
}
