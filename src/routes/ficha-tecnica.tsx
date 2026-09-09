import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatarReal, useFichas, useInsumos, useProdutos } from "@/lib/atelie-store";

export const Route = createFileRoute("/ficha-tecnica")({
  head: () => ({
    meta: [
      { title: "Ficha Técnica — Essencial Gestão Ateliê" },
      {
        name: "description",
        content: "Monte a ficha técnica de cada peça e veja o custo dos materiais usados.",
      },
      { property: "og:title", content: "Ficha Técnica — Essencial Gestão Ateliê" },
      {
        property: "og:description",
        content: "Monte a ficha técnica de cada peça e veja o custo dos materiais usados.",
      },
    ],
  }),
  component: FichaTecnicaPage,
});

function FichaTecnicaPage() {
  const { insumos } = useInsumos();
  const { produtos } = useProdutos();
  const { fichas, adicionar, remover } = useFichas();

  const [produtoId, setProdutoId] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [quantidades, setQuantidades] = useState<Record<string, string>>({});

  function salvar(evento: React.FormEvent) {
    evento.preventDefault();
    const produtoEscolhido = produtoId || produtos[0]?.id;
    if (!produtoEscolhido) return;
    const itens = Object.entries(quantidades)
      .map(([insumoId, valor]) => ({
        insumoId,
        quantidade: Number(valor.replace(",", ".")) || 0,
      }))
      .filter((item) => item.quantidade > 0);
    adicionar({ produtoId: produtoEscolhido, observacoes: observacoes.trim(), itens });
    setObservacoes("");
    setQuantidades({});
  }

  function custo(itens: { insumoId: string; quantidade: number }[]) {
    return itens.reduce((total, item) => {
      const insumo = insumos.find((i) => i.id === item.insumoId);
      return total + (insumo ? insumo.preco * item.quantidade : 0);
    }, 0);
  }

  return (
    <div className="px-6 py-10 md:px-12">
      <h1 className="font-display text-4xl text-brand-deep md:text-5xl">Ficha Técnica</h1>
      <p className="mt-3 max-w-xl text-lg text-ink/70">
        Escolha um produto, informe quanto usa de cada insumo e veja o custo dos materiais.
      </p>

      <form
        onSubmit={salvar}
        className="mt-8 rounded-2xl border border-sand bg-card p-6 shadow-sm"
        aria-label="Criar nova ficha técnica"
      >
        <h2 className="font-display text-2xl text-brand-deep">Nova ficha técnica</h2>

        <div className="mt-4 max-w-md">
          <label htmlFor="ficha-produto" className="block text-base font-semibold">
            Produto
          </label>
          <select
            id="ficha-produto"
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
            className="mt-2 h-14 w-full rounded-xl border-2 border-sand bg-background px-4 text-lg focus-visible:border-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
          >
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="mt-6">
          <legend className="text-base font-semibold">Quanto usa de cada insumo</legend>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {insumos.map((insumo) => (
              <div key={insumo.id} className="flex items-center justify-between gap-4">
                <label htmlFor={`qtd-${insumo.id}`} className="text-lg">
                  {insumo.nome}{" "}
                  <span className="text-base text-ink/60">({insumo.unidade})</span>
                </label>
                <input
                  id={`qtd-${insumo.id}`}
                  value={quantidades[insumo.id] ?? ""}
                  onChange={(e) =>
                    setQuantidades((atual) => ({ ...atual, [insumo.id]: e.target.value }))
                  }
                  inputMode="decimal"
                  placeholder="0"
                  className="h-14 w-28 rounded-xl border-2 border-sand bg-background px-4 text-lg placeholder:text-ink/40 focus-visible:border-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
                />
              </div>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 max-w-2xl">
          <label htmlFor="ficha-obs" className="block text-base font-semibold">
            Observações
          </label>
          <textarea
            id="ficha-obs"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows={3}
            placeholder="Tamanhos, acabamento, cor…"
            className="mt-2 w-full rounded-xl border-2 border-sand bg-background px-4 py-3 text-lg placeholder:text-ink/40 focus-visible:border-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
          />
        </div>

        <button
          type="submit"
          className="mt-5 min-h-14 rounded-2xl bg-brand px-7 text-lg font-semibold text-cream transition-colors hover:bg-brand-deep focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
        >
          Salvar ficha técnica
        </button>
      </form>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {fichas.map((ficha) => {
          const produto = produtos.find((p) => p.id === ficha.produtoId);
          return (
            <article key={ficha.id} className="rounded-2xl bg-brand-deep p-6 text-cream">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-2xl">{produto?.nome ?? "Produto removido"}</h2>
                <button
                  onClick={() => remover(ficha.id)}
                  className="min-h-11 rounded-lg border-2 border-cream/30 px-4 text-base font-semibold text-cream transition-colors hover:bg-cream/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
                >
                  Excluir
                </button>
              </div>
              <ul className="mt-4 space-y-3">
                {ficha.itens.map((item) => {
                  const insumo = insumos.find((i) => i.id === item.insumoId);
                  return (
                    <li
                      key={item.insumoId}
                      className="flex justify-between gap-4 border-b border-cream/10 pb-3 text-base"
                    >
                      <span className="text-sand/80">{insumo?.nome ?? "Insumo removido"}</span>
                      <span className="font-semibold">
                        {item.quantidade} {insumo?.unidade ?? ""}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {ficha.observacoes && (
                <p className="mt-4 text-base text-sand/80">{ficha.observacoes}</p>
              )}
              <p className="mt-5 text-lg font-semibold">
                Custo dos materiais: {formatarReal(custo(ficha.itens))}
              </p>
            </article>
          );
        })}
        {fichas.length === 0 && (
          <p className="text-lg text-ink/60">Nenhuma ficha técnica criada ainda.</p>
        )}
      </div>
    </div>
  );
}
