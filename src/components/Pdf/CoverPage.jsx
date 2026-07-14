export default function CoverPage() {
  return (
    <section className="h-[1120px] bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/construction.jpg')] bg-cover bg-center opacity-30" />

      <div className="relative z-10 h-full flex flex-col justify-center px-20">
        <p className="uppercase tracking-[10px] text-yellow-400 mb-4">
          RKGC GROUP
        </p>

        <h1 className="text-8xl font-bold leading-tight mb-8">
          Building
          <span className="block text-yellow-400">
            Excellence
          </span>
        </h1>

        <div className="grid grid-cols-2 gap-8 max-w-3xl">
          <div className="border-l-4 border-yellow-400 pl-4">
            Road Work
          </div>

          <div className="border-l-4 border-yellow-400 pl-4">
            Structure Work
          </div>

          <div className="border-l-4 border-yellow-400 pl-4">
            Interior Work
          </div>

          <div className="border-l-4 border-yellow-400 pl-4">
            Real Estate
          </div>
        </div>
      </div>
    </section>
  );
}