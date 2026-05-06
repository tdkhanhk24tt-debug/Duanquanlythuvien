import { useState } from "react";

export default function Books() {
  const [search, setSearch] = useState("");
  const books = [
    { id: 1, name: "React Basics", author: "John", category: "IT", status: "Available" },
    { id: 2, name: "NodeJS Guide", author: "Anna", category: "IT", status: "Out" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <input
        placeholder="Search book..."
        className="border p-2 mb-4 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-2">Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books
            .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
            .map((b) => (
              <tr key={b.id} className="text-center border-b">
                <td>{b.name}</td>
                <td>{b.author}</td>
                <td>{b.category}</td>
                <td>{b.status}</td>
                <td>
                  <button className="text-blue-600">Edit</button>
                  <button className="text-red-600 ml-2">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}