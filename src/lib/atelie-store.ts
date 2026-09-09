import { useCallback, useEffect, useState } from "react";

export type Insumo = {
  id: string;
  nome: string;
  unidade: string;
  preco: number;
};

export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
};

export type ItemFicha = {
  insumoId: string;
  quantidade: number;
};

export type Ficha = {
  id: string;
  produtoId: string;
  observacoes: string;
  itens: ItemFicha[];
};

const KEYS = {
  insumos: "essencial.insumos",
  produtos: "essencial.produtos",
  fichas: "essencial.fichas",
} as const;

export const insumosIniciais: Insumo[] = [
  { id: "i1", nome: "Linho cru 120g", unidade: "metro", preco: 42.9 },
  { id: "i2", nome: "Linha de costura", unidade: "metro", preco: 0.4 },
  { id: "i3", nome: "Botão de madrepérola", unidade: "unidade", preco: 0.8 },
  { id: "i4", nome: "Forro de cetim", unidade: "metro", preco: 18 },
];

export const produtosIniciais: Produto[] = [
  { id: "p1", nome: "Camisa de Linho", descricao: "Linho cru · verde oliva", preco: 189 },
  { id: "p2", nome: "Saia Midi", descricao: "Viscose · terracota", preco: 149 },
  { id: "p3", nome: "Bolsa Tecelã", descricao: "Algodão · natural", preco: 99 },
];

export const fichasIniciais: Ficha[] = [
  {
    id: "f1",
    produtoId: "p1",
    observacoes: "Tamanhos P, M e G. Forro apenas na gola.",
    itens: [
      { insumoId: "i1", quantidade: 1.8 },
      { insumoId: "i2", quantidade: 12 },
      { insumoId: "i3", quantidade: 7 },
    ],
  },
];

function ler<T>(chave: string, inicial: T): T {
  if (typeof window === "undefined") return inicial;
  try {
    const bruto = window.localStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as T) : inicial;
  } catch {
    return inicial;
  }
}

function useLista<T>(chave: string, inicial: T[]) {
  const [itens, setItens] = useState<T[]>(inicial);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setItens(ler<T[]>(chave, inicial));
    setPronto(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave]);

  const salvar = useCallback(
    (proximos: T[]) => {
      setItens(proximos);
      try {
        window.localStorage.setItem(chave, JSON.stringify(proximos));
      } catch {
        /* armazenamento indisponível */
      }
    },
    [chave],
  );

  return { itens, salvar, pronto };
}

export function novoId() {
  return Math.random().toString(36).slice(2, 10);
}

export function useInsumos() {
  const { itens, salvar, pronto } = useLista<Insumo>(KEYS.insumos, insumosIniciais);
  return {
    insumos: itens,
    pronto,
    adicionar: (insumo: Omit<Insumo, "id">) => salvar([...itens, { ...insumo, id: novoId() }]),
    remover: (id: string) => salvar(itens.filter((i) => i.id !== id)),
  };
}

export function useProdutos() {
  const { itens, salvar, pronto } = useLista<Produto>(KEYS.produtos, produtosIniciais);
  return {
    produtos: itens,
    pronto,
    adicionar: (produto: Omit<Produto, "id">) => salvar([...itens, { ...produto, id: novoId() }]),
    remover: (id: string) => salvar(itens.filter((p) => p.id !== id)),
  };
}

export function useFichas() {
  const { itens, salvar, pronto } = useLista<Ficha>(KEYS.fichas, fichasIniciais);
  return {
    fichas: itens,
    pronto,
    adicionar: (ficha: Omit<Ficha, "id">) => salvar([...itens, { ...ficha, id: novoId() }]),
    remover: (id: string) => salvar(itens.filter((f) => f.id !== id)),
  };
}

export function formatarReal(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
