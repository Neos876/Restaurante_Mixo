type StatsBarProps = {
  total: number;
  upcoming: number;
  guests: number;
  today: number;
};

export default function StatsBar({ total, upcoming, guests, today }: StatsBarProps) {
  const stats = [
    { label: 'Reservas totales', value: total },
    { label: 'Próximas', value: upcoming },
    { label: 'Para hoy', value: today },
    { label: 'Comensales previstos', value: guests },
  ];

  return (
    <section aria-label="Resumen" className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-500">{stat.label}</p>
          <p className="mt-1 text-3xl font-semibold text-zinc-100">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}
