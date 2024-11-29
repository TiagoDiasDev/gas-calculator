"use client";

export function CarSelector({
  carros,
  marcaSelecionada,
  modeloSelecionado,
  setMarcaSelecionada,
  handleModeloChange,
}) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Marca do carro
        </label>
        <select
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          value={marcaSelecionada}
          onChange={(e) => {
            setMarcaSelecionada(e.target.value);
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
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
    </>
  );
}
