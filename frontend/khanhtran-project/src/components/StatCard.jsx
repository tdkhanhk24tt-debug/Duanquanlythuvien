export default function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-2xl font-bold text-blue-900">{value}</p>
    </div>
  );
}