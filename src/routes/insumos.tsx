import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatarReal, useInsumos } from "@/lib/atelie-store";

export const Route = createFileRoute("/insumos")({
  head: () => ({
    meta: [
      { title: "Insumos — Essencial Gestão Ateliê" },
      {
        name: "description",
        content: "Cadastre e consulte os materiais do seu ateliê com nome, unidade e preço.",
      },
      { property: "og:title", content: "Insumos — Essencial Gestão Ateliê" },
      {
        property: "og:description",
        content: "Cadastre e consulte os materiais do seu ateliê com nome, unidade e preço.",
      },
    ],
  }),
  component: InsumosPage,
});

function InsumosPage() {
  const { insumos, adicionar, remover } = useInsumos();
  const [nome, setNome] = useState("");
  const [unidade, setUnidade] = useState("metro");
  const [preco, setPreco] = useState("");

  function salvar(evento: React.FormEvent) {
    evento.preventDefault();
    if (!nome.trim()) return;
    adicionar({ nome: nome.trim(), unidade, preco: Number(preco.replace(",", ".")) || 0 });
    setNome("");
    setPreco("");
  }

  return (
    <div className="px-6 py-10 md:px-12">
      <h1 className="font-display text-4xl text-brand-deep md:text-5xl">Insumos</h1>
      <p className="mt-3 max-w-xl text-lg text-ink/70">
        Tudo o que você compra para produzir: tecidos, linhas, botões e aviamentos.
      </p>

      <form
        onSubmit={salvar}
        className="mt-8 rounded-2xl border border-sand bg-card p-6 shadow-sm"
        aria-label="Cadastrar novo insumo"
      >
        <h2 className="font-display text-2xl text-brand-deep">Cadastrar insumo</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="insumo-nome" className="block text-base font-semibold">
              Nome do insumo
            </label>
            <input
              id="insumo-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Linho cru"
              className="mt-2 h-14 w-full rounded-xl border-2 border-sand bg-background px-4 text-lg placeholder:text-ink/40 focus-visible:border-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
            />
          </div>
          <div>
            <label htmlFor="insumo-unidade" className="block text-base font-semibold">
              Unidade de medida
            </label>
            <select
              id="insumo-unidade"
              value={unidade}
              onChange={(e) => setUnidade(e.target.value)}
              className="mt-2 h-14 w-full rounded-xl border-2 border-sand bg-background px-4 text-lg focus-visible:border-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
            >
              <option value="metro">metro</option>
              <option value="unidade">unidade</option>
              <option value="quilo">quilo</option>
              <option value="litro">litro</option>
            </select>
          </div>
          <div>
            <label htmlFor="insumo-preco" className="block text-base font-semibold">
              Preço (R$)
            </label>
            <input
              id="insumo-preco"
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
          Salvar insumo
        </button>
      </form>

      <section className="mt-8" aria-label="Lista de insumos">
        <div className="overflow-hidden rounded-2xl border border-sand bg-card">
          <div className="grid grid-cols-[1.6fr_1fr_1fr_auto] gap-4 border-b border-sand px-6 py-4 text-sm font-semibold uppercase tracking-wide text-ink/60">
            <span>Nome</span>
            <span>Unidade</span>
            <span>Preço</span>
            <span className="sr-only">Ações</span>
          </div>
          {insumos.length === 0 && (
            <p className="px-6 py-8 text-lg text-ink/60">Nenhum insumo cadastrado ainda.</p>
          )}
          {insumos.map((insumo) => (
            <div
              key={insumo.id}
              className="grid grid-cols-[1.6fr_1fr_1fr_auto] items-center gap-4 border-b border-sand px-6 py-5 text-lg last:border-b-0"
            >
              <span className="font-semibold">{insumo.nome}</span>
              <span className="text-ink/70">{insumo.unidade}</span>
              <span>{formatarReal(insumo.preco)}</span>
              <button
                onClick={() => remover(insumo.id)}
                className="min-h-11 rounded-lg border-2 border-sand px-4 text-base font-semibold text-clay transition-colors hover:bg-sand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
