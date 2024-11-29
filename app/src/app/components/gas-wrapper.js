"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ModalDialog } from "./dialog";
import { CalculateButton } from "./calculete-button";
import { CarSelector } from "./car-selector";
import { FuelPriceForm } from "./fuel-price-form";

const schema = z.object({
  precoGasolina: z.number().positive("O preço da gasolina deve ser positivo"),
  precoAlcool: z.number().positive("O preço do álcool deve ser positivo"),
});

const carros = [
  {
    marca: "Toyota",
    modelos: [
      {
        modelo: "Corolla",
        consumo: 11,
        problemas: {
          gasolina: [
            "Formação de depósitos de carbono no motor com gasolina de baixa qualidade",
            "Problemas no catalisador devido à queima incompleta",
            "Desempenho reduzido com combustível adulterado",
          ],
          alcool: [
            "Dificuldade de partida em dias frios",
            "Corrosão no sistema de combustível devido a alta concentração de água",
          ],
        },
      },
      {
        modelo: "Etios",
        consumo: 13,
        problemas: {
          gasolina: [
            "Formação de depósitos de carbono no motor com gasolina de baixa qualidade",
            "Desempenho reduzido com combustível adulterado",
          ],
          alcool: [
            "Dificuldade de partida em dias frios",
            "Corrosão no sistema de combustível devido a alta concentração de água",
          ],
        },
      },
    ],
  },
  {
    marca: "Chevrolet",
    modelos: [
      {
        modelo: "Onix",
        consumo: 14,
        problemas: {
          gasolina: [
            "Acúmulo de resíduos no sistema de injeção",
            "Instabilidade na marcha lenta com gasolina de baixa qualidade",
          ],
          alcool: [
            "Aumento do desgaste das velas de ignição com uso contínuo de álcool",
            "Ressecamento de componentes de borracha no sistema de combustível",
          ],
        },
      },
      {
        modelo: "Tracker",
        consumo: 12,
        problemas: {
          gasolina: [
            "Consumo elevado em trânsito urbano",
            "Danos ao sistema de injeção com combustíveis adulterados",
          ],
          alcool: [
            "Baixo rendimento em viagens longas",
            "Aumento do desgaste das velas de ignição",
          ],
        },
      },
    ],
  },
  {
    marca: "Volkswagen",
    modelos: [
      {
        modelo: "Gol",
        consumo: 12,
        problemas: {
          gasolina: [
            "Danos ao sistema de injeção eletrônica por combustíveis adulterados",
            "Diminuição na potência em motores mais antigos",
          ],
          alcool: [
            "Maior consumo em relação à gasolina",
            "Vazamentos no tanque ou nas conexões devido ao ressecamento causado pelo etanol",
          ],
        },
      },
      {
        modelo: "T-Cross",
        consumo: 11,
        problemas: {
          gasolina: [
            "Danos ao sistema de injeção eletrônica com combustíveis de baixa qualidade",
            "Redução da eficiência do motor a longo prazo",
          ],
          alcool: [
            "Aumento no desgaste de componentes internos devido à umidade do álcool",
            "Problemas na partida em regiões frias",
          ],
        },
      },
    ],
  },
  {
    marca: "Hyundai",
    modelos: [
      {
        modelo: "HB20",
        consumo: 13,
        problemas: {
          gasolina: [
            "Rendimento abaixo do esperado em modelos que favorecem o uso de etanol",
            "Entupimento de bicos injetores com gasolina de baixa qualidade",
          ],
          alcool: [
            "Aumento de falhas de ignição em regiões frias",
            "Redução da vida útil do motor caso o etanol esteja adulterado",
          ],
        },
      },
      {
        modelo: "Creta",
        consumo: 10,
        problemas: {
          gasolina: [
            "Problemas de desempenho devido a combustíveis adulterados",
            "Aumento no consumo em relação ao projetado",
          ],
          alcool: [
            "Corrosão em componentes metálicos devido ao álcool",
            "Maior consumo em comparação à gasolina em longas distâncias",
          ],
        },
      },
    ],
  },
  {
    marca: "Fiat",
    modelos: [
      {
        modelo: "Argo",
        consumo: 13,
        problemas: {
          gasolina: [
            "Diminuição da vida útil da bomba de combustível com gasolina adulterada",
            "Possível detonação (batida de pino) em motores mais antigos",
          ],
          alcool: [
            "Problemas no sistema de partida a frio, especialmente sem gasolina no tanque auxiliar",
            "Corrosão no sistema de escape devido ao aumento de água na combustão do etanol",
          ],
        },
      },
      {
        modelo: "Mobi",
        consumo: 14,
        problemas: {
          gasolina: [
            "Desgaste acelerado do sistema de ignição com combustíveis de baixa qualidade",
            "Redução de eficiência em condições de trânsito intenso",
          ],
          alcool: [
            "Dificuldade na partida a frio sem gasolina auxiliar",
            "Ressecamento das borrachas do sistema de combustível",
          ],
        },
      },
    ],
  },
];

export default function GasWrapper() {
  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [consumoSelecionado, setConsumoSelecionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [problemasModal, setProblemasModal] = useState([]);

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
      setModalMessage("Por favor, selecione uma marca e um modelo.");
      setIsModalOpen(true);
      return;
    }

    const relacao = precoAlcool / precoGasolina;

    const recomendacao = relacao <= 0.7 ? "Álcool (Etanol)" : "Gasolina";

    const problemas = carros
      .find((carro) => carro.marca === marcaSelecionada)
      ?.modelos.find(
        (modelo) => modelo.modelo === modeloSelecionado
      )?.problemas;

    const problemasCombustivel = problemas
      ? relacao <= 0.7
        ? problemas.alcool
        : problemas.gasolina
      : [];

    setModalMessage(
      `Recomendamos abastecer com ${recomendacao}.
  Consumo: ${consumoSelecionado} km/l
  Relação Álcool/Gasolina: ${relacao.toFixed(2)}`
    );

    setProblemasModal(problemasCombustivel); // Novo estado para passar os problemas
    setIsModalOpen(true);
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
          Compare Combustíveis
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CarSelector
            carros={carros}
            marcaSelecionada={marcaSelecionada}
            modeloSelecionado={modeloSelecionado}
            setMarcaSelecionada={setMarcaSelecionada}
            handleModeloChange={handleModeloChange}
          />
          <FuelPriceForm register={register} errors={errors} />
          <CalculateButton />
        </form>
      </div>

      <ModalDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Resultado da Análise"
        message={modalMessage}
        problemas={problemasModal}
      />
    </div>
  );
}
