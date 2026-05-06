export default function Members() {
  const members = [
    { id: 1, name: "Khánh", status: "Active" },
    { id: 2, name: "Nam", status: "Locked" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="text-center border-b">
              <td>{m.name}</td>
              <td>{m.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
