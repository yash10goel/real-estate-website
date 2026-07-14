export default function ServicesPage() {
  const services = [
    {
      title: "Road Work",
      description:
        "Construction and maintenance of highways, roads, and infrastructure projects.",
      percentage: "70%",
    },
    {
      title: "Building Work",
      description:
        "Residential, commercial and industrial building construction.",
      percentage: "15%",
    },
    {
      title: "Interior Work",
      description:
        "Premium interior design, fit-outs and turnkey solutions.",
      percentage: "10%",
    },
    {
      title: "Real Estate",
      description:
        "Property development and real estate investment solutions.",
      percentage: "5%",
    },
  ];

  return (
    <section className="min-h-[1120px] bg-black text-white p-20">
      <span className="text-yellow-400 font-semibold text-lg">
        05
      </span>

      <h2 className="text-6xl font-bold mt-4 mb-16">
        Our Services
      </h2>

      <div className="grid grid-cols-2 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-yellow-500 rounded-3xl p-10"
          >
            <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center text-2xl font-bold mb-6">
              {index + 1}
            </div>

            <h3 className="text-3xl font-bold text-yellow-400 mb-4">
              {service.title}
            </h3>

            <p className="text-gray-300 leading-7 mb-6">
              {service.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-sm uppercase tracking-wider text-gray-400">
                Work Profile
              </span>

              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                {service.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-zinc-900 rounded-3xl border border-yellow-500 p-10">
        <h3 className="text-3xl font-bold text-yellow-400 mb-4">
          Excellence Across Every Project
        </h3>

        <p className="text-gray-300 text-lg leading-8">
          RKGC delivers end-to-end solutions in road construction,
          building development, interior execution and real estate,
          ensuring quality, safety and timely delivery.
        </p>
      </div>
    </section>
  );
}