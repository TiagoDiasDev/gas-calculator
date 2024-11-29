"use client";

export function FuelPriceForm({ register, errors }) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Preço da Gasolina (por litro)
        </label>
        <input
          {...register("precoGasolina", { valueAsNumber: true })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
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
          {...register("precoAlcool", { valueAsNumber: true })}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          placeholder="Ex: 4.20"
        />
        {errors.precoAlcool && (
          <p className="text-sm text-red-600 mt-1">
            {errors.precoAlcool.message}
          </p>
        )}
      </div>
    </>
  );
}
