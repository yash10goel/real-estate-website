export default function GrowthPage() {
  const growthData = [
    { year: "20-21", value: 8 },
    { year: "21-22", value: 18 },
    { year: "22-23", value: 28 },
    { year: "23-24", value: 35 },
    { year: "24-25", value: 55 },
    { year: "25-26", value: 80 },
    { year: "26-27", value: 100 },
  ];

  return (
    <section className="h-[1120px] bg-[#0f0f0f] text-white p-20">
      <div className="mb-16">
        <span className="text-yellow-400 font-semibold">
          04
        </span>

        <h2 className="text-6xl font-bold mt-4">
          RKGC Growth Chart
        </h2>

        <p className="text-gray-400 mt-4 text-lg max-w-3xl">
          Consistent growth through quality execution,
          government infrastructure projects, and real estate
          developments.
        </p>
      </div>

      <div className="flex items-end justify-between h-[500px] mt-24">
        {growthData.map((item) => (
          <div
            key={item.year}
            className="flex flex-col items-center"
          >
            <div
              className="w-20 rounded-t-xl bg-gradient-to-t from-yellow-600 to-yellow-400"
              style={{
                height: `${item.value * 4}px`,
              }}
            />

            <p className="mt-4 text-gray-300">
              {item.year}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8 mt-24">
        <div className="bg-zinc-900 p-8 rounded-3xl border border-yellow-500">
          <h3 className="text-yellow-400 text-4xl font-bold">
            80+
          </h3>
          <p className="mt-2 text-gray-300">
            Team Members
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-yellow-500">
          <h3 className="text-yellow-400 text-4xl font-bold">
            150Cr+
          </h3>
          <p className="mt-2 text-gray-300">
            Working Capacity
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-yellow-500">
          <h3 className="text-yellow-400 text-4xl font-bold">
            30+
          </h3>
          <p className="mt-2 text-gray-300">
            Years Experience
          </p>
        </div>
      </div>
    </section>
  );
}