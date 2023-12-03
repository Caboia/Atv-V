import { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { Link } from "react-router-dom";

function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:3000/clientes");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []); 

  return (
    <div className="flex h-screen overflow-hidden family-roboto">
      <SideBar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="bg-gray-50 p-3 flex items-center shadow-sm ">
          <span className="relative flex flex-row items-center p-[0.37rem] focus:outline-none hover:bg-gray-50 text-gray-600 ">
            <svg
              className="w-5 h-5 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </span>
          <span className="text-gray-600 ">/</span>
          <span className="text-gray-600 ml-2">Clientes</span>
        </div>
        <div className="py-2 px-6 w-full bg-gray-50 border-t flex gap-12 items-center flex-wrap ">
          <h1 className="text-2xl font-bold mb-2 sm:mb-0">Clientes</h1>
          <Link to="/formCliente">
            <button className="w-full sm:w-auto flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Novo Cliente</span>
            </button>
          </Link>
        </div>
        <div className="py-2 px-6 w-full bg-white border-t flex gap-12 items-center flex-wrap  ">
          <div className="flex flex-wrap items-stretch w-full relative">
            <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-white">
              <div className="flex">
                <span className="flex items-center leading-normal bg-white rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                  <svg
                    width="18"
                    height="18"
                    className="w-4 lg:w-auto"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.9993 16.9993L13.1328 13.1328"
                      stroke="#455A64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative bg-white focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-br-lg w-full">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 ">
                  ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 ">
                  Nome
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 ">
                  Gênero
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 ">
                  Produtos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider">
                {user.id}
                </td>
                <td className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider">
                {user.name}
                </td>
                <td className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider">
                {user.gender}
                </td>
                <td className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 tracking-wider">
                  <button className="w-full sm:w-auto flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Consumir produto</span>
                  </button>
                </td>
              </tr>
               ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Users;
