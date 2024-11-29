"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  precoGasolina: z.number().positive("O preço da gasolina deve ser positivo"),
  precoAlcool: z.number().positive("O preço do álcool deve ser positivo"),
});

const carros = [
  {
    marca: "Toyota",
    modelos: [
      { modelo: "Corolla", consumo: 11 },
      { modelo: "Etios", consumo: 13 },
    ],
  },
  {
    marca: "Chevrolet",
    modelos: [
      { modelo: "Onix", consumo: 14 },
      { modelo: "Tracker", consumo: 12 },
    ],
  },
  {
    marca: "Volkswagen",
    modelos: [
      { modelo: "Gol", consumo: 12 },
      { modelo: "T-Cross", consumo: 11 },
    ],
  },
  {
    marca: "Hyundai",
    modelos: [
      { modelo: "HB20", consumo: 13 },
      { modelo: "Creta", consumo: 10 },
    ],
  },
  {
    marca: "Fiat",
    modelos: [
      { modelo: "Argo", consumo: 13 },
      { modelo: "Mobi", consumo: 14 },
    ],
  },
];

export default function Home() {
  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [consumoSelecionado, setConsumoSelecionado] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      precoGasolina: "",
      precoAlcool: "",
    },
  });

  const onSubmit = (data) => {
    const { precoGasolina, precoAlcool } = data;

    if (!consumoSelecionado) {
      alert("Por favor, selecione uma marca e um modelo.");
      return;
    }

    const relacao = precoAlcool / precoGasolina;

    const mensagem =
      relacao <= 0.7
        ? `Abasteça com Álcool (Etanol). Consumo: ${consumoSelecionado} km/l`
        : `Abasteça com Gasolina. Consumo: ${consumoSelecionado} km/l`;

    alert(`${mensagem}\nRelação Álcool/Gasolina: ${relacao.toFixed(2)}`);
  };

  const handleModeloChange = (modelo) => {
    const consumo = carros
      .find((carro) => carro.marca === marcaSelecionada)
      ?.modelos.find((m) => m.modelo === modelo)?.consumo;

    setModeloSelecionado(modelo);
    setConsumoSelecionado(consumo);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Álcool ou Gasolina?
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marca do carro
            </label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={marcaSelecionada}
              onChange={(e) => {
                setMarcaSelecionada(e.target.value);
                setModeloSelecionado("");
                setConsumoSelecionado(null);
              }}
            >
              <option value="">Selecione</option>
              {carros.map((carro) => (
                <option key={carro.marca} value={carro.marca}>
                  {carro.marca}
                </option>
              ))}
            </select>
          </div>

          {marcaSelecionada && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Modelo do carro
              </label>
              <select
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={modeloSelecionado}
                onChange={(e) => handleModeloChange(e.target.value)}
              >
                <option value="">Selecione</option>
                {carros
                  .find((carro) => carro.marca === marcaSelecionada)
                  ?.modelos.map((modelo) => (
                    <option key={modelo.modelo} value={modelo.modelo}>
                      {modelo.modelo}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preço da Gasolina (por litro)
            </label>
            <input
              type="number"
              {...register("precoGasolina", { valueAsNumber: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ex: 6.00"
            />
            {errors.precoGasolina && (
              <p className="text-sm text-red-600 mt-1">
                {errors.precoGasolina.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preço do Álcool (por litro)
            </label>
            <input
              type="number"
              {...register("precoAlcool", { valueAsNumber: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ex: 4.20"
            />
            {errors.precoAlcool && (
              <p className="text-sm text-red-600 mt-1">
                {errors.precoAlcool.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calcular
          </button>
        </form>
      </div>
    </div>
  );
}
