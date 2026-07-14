export default function BrandsPage() {
  const brands = [
    {
      name: "Hillberg",
      tag: "Premium Lifestyle Brand",
    },
    {
      name: "Orgo Olives",
      tag: "100% Natural Products",
    },
    {
      name: "Moo",
      tag: "Healthy Farm Milk",
    },
  ];

  return (
    <section className="h-[1120px] bg-[#0f0f0f] text-white p-20">
      <span className="text-yellow-400 font-semibold">
        15
      </span>

      <h2 className="text-6xl font-bold mt-4 mb-20">
        Other Brands By RKGC
      </h2>

      <div className="grid grid-cols-3 gap-10">

        {brands.map((brand) => (
          <div
            key={brand.name}
            className="bg-zinc-900 border border-yellow-500 rounded-3xl p-12 text-center"
          >
            <div className="w-28 h-28 mx-auto rounded-full bg-yellow-400 text-black flex items-center justify-center text-3xl font-bold">
              {brand.name.charAt(0)}
            </div>

            <h3 className="text-4xl font-bold mt-8">
              {brand.name}
            </h3>

            <p className="text-gray-400 mt-4">
              {brand.tag}
            </p>
          </div>
        ))}

      </div>

      <div className="mt-24 text-center">
        <h3 className="text-5xl font-bold text-yellow-400">
          RKGC GROUP
        </h3>

        <p className="mt-4 text-gray-400">
          Building Infrastructure • Creating Value • Delivering Excellence
        </p>
      </div>
    </section>
  );
}