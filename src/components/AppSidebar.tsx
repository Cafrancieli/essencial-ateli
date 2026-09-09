import { Link } from "@tanstack/react-router";

const itens = [
  { to: "/", rotulo: "Início", numero: "1" },
  { to: "/insumos", rotulo: "Insumos", numero: "2" },
  { to: "/produtos", rotulo: "Produtos", numero: "3" },
  { to: "/ficha-tecnica", rotulo: "Ficha Técnica", numero: "4" },
] as const;

export function AppSidebar() {
  return (
    <aside className="w-full shrink-0 bg-brand-deep px-6 py-8 text-cream md:h-dvh md:w-72 md:sticky md:top-0 md:flex md:flex-col">
      <div className="mb-8 flex items-center gap-3 md:mb-10">
        <div className="grid size-11 place-items-center rounded-xl bg-cream/10 font-display text-2xl text-sand">
          e
        </div>
        <div>
          <p className="font-display text-lg leading-tight">Essencial</p>
          <p className="text-sm tracking-wide text-sand/70">Gestão Ateliê</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2" aria-label="Principal">
        {itens.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            className="flex min-h-14 items-center gap-3 rounded-xl px-4 py-4 text-lg transition-colors hover:bg-cream/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-clay"
            activeProps={{ className: "bg-cream hover:bg-cream" }}
          >
            {({ isActive }) => (
              <span
                className={`flex w-full items-center gap-3 ${
                  isActive ? "font-semibold text-brand-deep" : "font-medium text-cream"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={
                    isActive
                      ? "grid size-9 shrink-0 place-items-center rounded-lg bg-brand text-lg text-cream"
                      : "grid size-9 shrink-0 place-items-center rounded-lg bg-cream/10 text-sand"
                  }
                >
                  {item.numero}
                </span>
                {item.rotulo}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-8 md:mt-auto md:pt-6">
        <div className="rounded-xl bg-cream/5 p-4">
          <p className="text-sm text-sand/70">Ateliê ativo</p>
          <p className="font-display text-lg">Oficina do Linho</p>
        </div>
      </div>
    </aside>
  );
}
