import { createFileRoute, Link } from "@tanstack/react-router";
import { formatarReal, useFichas, useInsumos, useProdutos } from "@/lib/atelie-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Essencial Gestão Ateliê — seu ateliê organizado" },
      {
        name: "description",
        content:
          "Sistema simples para organizar insumos, produtos e fichas técnicas do seu ateliê.",
      },
      { property: "og:title", content: "Essencial Gestão Ateliê" },
      {
        property: "og:description",
        content:
          "Sistema simples para organizar insumos, produtos e fichas técnicas do seu ateliê.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { insumos } = useInsumos();
  const { produtos } = useProdutos();
  const { fichas } = useFichas();

  return (
    <div className="max-w-5xl px-6 py-10 md:px-12">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-clay">Bem-vinda</p>
          <h1 className="mt-1 font-display text-4xl text-brand-deep md:text-5xl">
            Seu ateliê, bem organizado.
          </h1>
          <p className="mt-3 max-w-xl text-lg text-ink/70">
            Acompanhe insumos, produtos e fichas técnicas em um só lugar, com passos simples e
            claros.
          </p>
        </div>
        <Link
          to="/produtos"
          className="inline-flex min-h-14 items-center rounded-2xl bg-brand px-7 text-lg font-semibold text-cream shadow-sm transition-colors hover:bg-brand-deep focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
        >
          Novo produto
        </Link>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-sand p-5">
          <p className="text-base font-medium text-ink/70">Insumos cadastrados</p>
          <p className="mt-1 font-display text-3xl text-brand-deep">{insumos.length}</p>
        </div>
        <div className="rounded-2xl bg-sand p-5">
          <p className="text-base font-medium text-ink/70">Produtos cadastrados</p>
          <p className="mt-1 font-display text-3xl text-brand-deep">{produtos.length}</p>
        </div>
        <div className="rounded-2xl bg-sand p-5">
          <p className="text-base font-medium text-ink/70">Fichas técnicas</p>
          <p className="mt-1 font-display text-3xl text-brand-deep">{fichas.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-sand bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-brand-deep">Produtos</h2>
            <span className="text-base font-medium text-ink/60">{produtos.length} itens</span>
          </div>
          <ul className="mt-4 divide-y divide-sand">
            {produtos.slice(0, 3).map((produto) => (
              <li key={produto.id} className="flex items-center justify-between gap-4 py-3">
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="grid size-11 place-items-center rounded-xl bg-brand/10 font-display text-brand-deep"
                  >
                    {produto.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{produto.nome}</p>
                    <p className="text-base text-ink/60">{produto.descricao}</p>
                  </div>
                </div>
                <span className="font-semibold text-clay">{formatarReal(produto.preco)}</span>
              </li>
            ))}
            {produtos.length === 0 && (
              <li className="py-3 text-lg text-ink/60">Nenhum produto ainda.</li>
            )}
          </ul>
        </article>

        <article className="flex flex-col rounded-2xl bg-brand-deep p-6 text-cream">
          <h2 className="font-display text-2xl">Ficha Técnica</h2>
          <p className="mt-3 text-sand/80">
            Registre os materiais e as medidas de cada peça que você produz.
          </p>
          <ul className="mt-4 space-y-3 text-base">
            {insumos.slice(0, 4).map((insumo) => (
              <li
                key={insumo.id}
                className="flex justify-between gap-4 border-b border-cream/10 pb-3 last:border-b-0"
              >
                <span className="text-sand/80">{insumo.nome}</span>
                <span className="font-semibold">
                  {formatarReal(insumo.preco)} / {insumo.unidade}
                </span>
              </li>
            ))}
          </ul>
          <Link
            to="/ficha-tecnica"
            className="mt-6 inline-flex min-h-14 items-center justify-center rounded-xl bg-cream px-6 text-lg font-semibold text-brand-deep transition-colors hover:bg-sand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
          >
            Abrir ficha técnica
          </Link>
        </article>
      </div>
    </div>
  );
}
