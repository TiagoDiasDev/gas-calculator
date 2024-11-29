"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
          >
            <h1 className="text-gray-100 text-xl font-semibold hover:text-white transition-colors">
              CarInfo
            </h1>
          </div>

          {/* Links Desktop */}
          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => navigate("/calculadora")}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Calculadora de Combustível
            </button>
            <button
              onClick={() => navigate("/blog")}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Blog
            </button>
          </div>

          {/* Menu Hamburguer para Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              <span className="sr-only">Abrir Menu</span>
              <svg
                className={`h-6 w-6 transition-transform ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                navigate("/calculadora");
                setIsOpen(false);
              }}
              className="block px-3 py-2 text-gray-300 hover:text-white text-base font-medium transition-colors w-full text-left"
            >
              Calculadora de Combustível
            </button>
            <button
              onClick={() => {
                navigate("/blog");
                setIsOpen(false);
              }}
              className="block px-3 py-2 text-gray-300 hover:text-white text-base font-medium transition-colors w-full text-left"
            >
              Blog
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
