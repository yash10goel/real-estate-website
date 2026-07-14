export default function CapabilityPage() {
  return (
    <section className="h-[1120px] bg-black text-white p-20">
      <h2 className="text-6xl font-bold mb-16">
        Our Capability
      </h2>

      <div className="grid grid-cols-3 gap-8">
        <div className="bg-zinc-900 p-10 rounded-3xl border border-yellow-500">
          <h3 className="text-yellow-400 text-6xl font-bold">
            150 Cr
          </h3>

          <p className="mt-4 text-xl">
            Working Capacity
          </p>
        </div>

        <div className="bg-zinc-900 p-10 rounded-3xl border border-yellow-500">
          <h3 className="text-yellow-400 text-6xl font-bold">
            16 Cr
          </h3>

          <p className="mt-4 text-xl">
            Solvency
          </p>
        </div>

        <div className="bg-zinc-900 p-10 rounded-3xl border border-yellow-500">
          <h3 className="text-yellow-400 text-6xl font-bold">
            49.30 Cr
          </h3>

          <p className="mt-4 text-xl">
            Latest Turnover
          </p>
        </div>
      </div>
    </section>
  );
}