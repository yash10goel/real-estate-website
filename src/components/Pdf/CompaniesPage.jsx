export default function CompaniesPage() {
  const companies = [
    {
      name: "M/S R.K. Gupta Contractor",
      desc: "Core Infrastructure, Road Construction & Building Projects",
      gst: "09AHMPG9176E1ZY",
    },
    {
      name: "Earthtek Ventures Pvt Ltd",
      desc: "Real Estate Development & Investment Projects",
      gst: "Registered Entity",
    },
    {
      name: "Popularfi Exporters & Traders",
      desc: "Export, Trading & Business Solutions",
      gst: "09ABGFR9956B1ZO",
    },
  ];

  return (
    <section className="min-h-[1120px] bg-[#fafafa] p-20">
      <div className="mb-16">
        <span className="text-yellow-600 font-semibold text-lg">
          03
        </span>

        <h2 className="text-6xl font-bold mt-3 mb-6">
          RKGC Group
        </h2>

        <p className="text-gray-600 text-lg max-w-3xl">
          RKGC Group operates through multiple business entities,
          delivering excellence across construction, infrastructure,
          real estate development and trading services.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {companies.map((company) => (
          <div
            key={company.name}
            className="bg-black text-white rounded-3xl p-10 border border-yellow-500"
          >
            <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-2xl mb-6">
              RK
            </div>

            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              {company.name}
            </h3>

            <p className="text-gray-300 leading-7 mb-6">
              {company.desc}
            </p>

            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-400">
                {company.gst}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-black rounded-3xl p-12 text-center">
        <h3 className="text-4xl font-bold text-yellow-400 mb-4">
          One Group. Multiple Expertise.
        </h3>

        <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-8">
          From large-scale infrastructure projects and government
          contracts to premium interiors and real estate
          developments, RKGC Group provides end-to-end solutions
          with quality, innovation and reliability.
        </p>
      </div>
    </section>
  );
}