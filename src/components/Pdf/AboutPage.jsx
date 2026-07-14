export default function AboutPage() {
  return (
    <section className="h-[1120px] bg-white p-20">
      <span className="text-yellow-600 font-semibold">
        02
      </span>

      <h2 className="text-6xl font-bold mt-4 mb-10">
        About RKGC
      </h2>

      <div className="grid grid-cols-2 gap-16">
        <div>
          <h3 className="text-3xl font-bold mb-6">
            Since 1996
          </h3>

          <p className="text-lg text-gray-700 leading-9">
            RKGC is a technology-enabled construction company
            delivering Road Works, Structure Works, Interior
            Solutions and Real Estate projects.
          </p>

          <p className="text-lg text-gray-700 leading-9 mt-6">
            Founded by Mr. R.K. Gupta, the organization
            currently employs 80+ professionals and has
            successfully delivered projects across India.
          </p>
        </div>

        <div className="bg-black rounded-3xl p-10 text-white">
          <div className="mb-10">
            <h4 className="text-yellow-400 text-5xl font-bold">
              80+
            </h4>
            <p>Employees</p>
          </div>

          <div className="mb-10">
            <h4 className="text-yellow-400 text-5xl font-bold">
              30+
            </h4>
            <p>Years Experience</p>
          </div>

          <div>
            <h4 className="text-yellow-400 text-5xl font-bold">
              150 Cr
            </h4>
            <p>Working Capacity</p>
          </div>
        </div>
      </div>
    </section>
  );
}