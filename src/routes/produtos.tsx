import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatarReal, useProdutos } from "@/lib/atelie-store";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos — Essencial Gestão Ateliê" },
      {
        name: "description",
        content: "Cadastre as peças que você produz e vende, com descrição e preço.",
      },
      { property: "og:title", content: "Produtos — Essencial Gestão Ateliê" },
      {
        property: "og:description",
        content: "Cadastre as peças que você produz e vende, com descrição e preço.",
      },
    ],
  }),
  component: ProdutosPage,
});

function ProdutosPage() {
  const { produtos, adicionar, remover } = useProdutos();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  function salvar(evento: React.FormEvent) {
    evento.preventDefault();
    if (!nome.trim()) return;
    adicionar({
      nome: nome.trim(),
      descricao: descricao.trim(),
      preco: Number(preco.replace(",", ".")) || 0,
    });
    setNome("");
    setDescricao("");
    setPreco("");
  }

  return (
    <div className="px-6 py-10 md:px-12">
      <h1 className="font-display text-4xl text-brand-deep md:text-5xl">Produtos</h1>
      <p className="mt-3 max-w-xl text-lg text-ink/70">
        As peças prontas do seu ateliê, com preço de venda.
      </p>

      <form
        onSubmit={salvar}
        className="mt-8 rounded-2xl border border-sand bg-card p-6 shadow-sm"
        aria-label="Cadastrar novo produto"
      >
        <h2 className="font-display text-2xl text-brand-deep">Cadastrar produto</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="produto-nome" className="block text-base font-semibold">
              Nome do produto
            </label>
            <input
              id="produto-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Camisa de Linho"
              className="mt-2 h-14 w-full rounded-xl border-2 border-sand bg-background px-4 text-lg placeholder:text-ink/40 focus-visible:border-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
            />
          </div>
          <div>
            <label htmlFor="produto-descricao" className="block text-base font-semibold">
              Descrição
            </label>
            <input
              id="produto-descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Linho cru · verde oliva"
              className="mt-2 h-14 w-full rounded-xl border-2 border-sand bg-background px-4 text-lg placeholder:text-ink/40 focus-visible:border-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
            />
          </div>
          <div>
            <label htmlFor="produto-preco" className="block text-base font-semibold">
              Preço de venda (R$)
            </label>
            <input
              id="produto-preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              inputMode="decimal"
              placeholder="0,00"
              className="mt-2 h-14 w-full rounded-xl border-2 border-sand bg-background px-4 text-lg placeholder:text-ink/40 focus-visible:border-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 min-h-14 rounded-2xl bg-brand px-7 text-lg font-semibold text-cream transition-colors hover:bg-brand-deep focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
        >
          Salvar produto
        </button>
      </form>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {produtos.map((produto) => (
          <li
            key={produto.id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-sand bg-card p-6"
          >
            <div>
              <p className="font-display text-2xl text-brand-deep">{produto.nome}</p>
              <p className="mt-1 text-base text-ink/60">{produto.descricao}</p>
              <p className="mt-2 text-lg font-semibold text-clay">
                {formatarReal(produto.preco)}
              </p>
            </div>
            <button
              onClick={() => remover(produto.id)}
              className="min-h-11 rounded-lg border-2 border-sand px-4 text-base font-semibold text-clay transition-colors hover:bg-sand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
            >
              Excluir
            </button>
          </li>
        ))}
        {produtos.length === 0 && (
          <li className="text-lg text-ink/60">Nenhum produto cadastrado ainda.</li>
        )}
      </ul>
    </div>
  );
}
