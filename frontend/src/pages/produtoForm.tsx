import React, { useState } from "react";
import SideBar from "../components/sideBar";

function ProdutoForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Produto cadastrado com sucesso!");
        setFormData({
          name: "",
          price: "",
          description: "",
        });
      } else {
        console.error("Erro ao cadastrar produto:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };
  return (
    <div className="flex h-screen overflow-hidden family-roboto">
      <SideBar />

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="bg-gray-50 p-3 flex items-center shadow-sm ">
          <span className="relative flex flex-row items-center p-[0.37rem] focus:outline-none hover:bg-gray-50 text-gray-600 ">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              ></path>
            </svg>
          </span>
          <span className="text-gray-600 ">/</span>
          <span className="text-gray-600 ml-2">Cadastrar Produto</span>
        </div>

        <div className="py-2 px-6 w-full bg-gray-50 border-t flex gap-12 items-center">
          <h1 className="text-2xl font-bold">Cadastrar novo produto</h1>
        </div>
        <div className=" flex flex-col items-center justify-center">
          <div className="py-2 px-6 w-full bg-white border-t flex gap-12 items-center">
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    Nome
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Preço (em reais)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Preço"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Descrição
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Descrição do produto"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3">
                  <button
                    className="bg-[#ae8352] hover:bg-[#8a6841] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Cadastrar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProdutoForm;
