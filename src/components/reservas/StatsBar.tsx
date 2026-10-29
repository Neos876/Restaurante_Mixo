type StatsBarProps = {
  pending: number;
  today: number;
  completed: number;
  guestsServed: number;
  deleted: number;
};

export default function StatsBar({ pending, today, completed, guestsServed, deleted }: StatsBarProps) {
  const stats = [
    { label: 'Pendientes', value: pending, tone: 'text-zinc-100' },
    { label: 'Para hoy', value: today, tone: 'text-zinc-100' },
    { label: 'Realizadas', value: completed, tone: 'text-emerald-400' },
    { label: 'Personas atendidas', value: guestsServed, tone: 'text-amber-400' },
    { label: 'Borradas', value: deleted, tone: 'text-red-400' },
  ];

  return (
    <section aria-label="Resumen" className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-500">{stat.label}</p>
          <p className={`mt-1 text-3xl font-semibold ${stat.tone}`}>{stat.value}</p>
        </div>
      ))}
    </section>
  );
}
