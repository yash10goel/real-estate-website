export default function ContactPage() {
  return (
    <section className="h-[1120px] bg-white p-20">
      <span className="text-yellow-600 font-semibold">
        14
      </span>

      <h2 className="text-6xl font-bold mt-4 mb-16">
        Contact Information
      </h2>

      <div className="grid grid-cols-2 gap-12">

        <div className="bg-black text-white rounded-3xl p-12">
          <h3 className="text-yellow-400 text-3xl font-bold mb-8">
            Head Office
          </h3>

          <p className="text-lg leading-8">
            Plot No 2, Vill Kot
            <br />
            Near EPE Toll Plaza
            <br />
            Dadri - 203207
          </p>
        </div>

        <div className="bg-black text-white rounded-3xl p-12">
          <h3 className="text-yellow-400 text-3xl font-bold mb-8">
            Meeting Office
          </h3>

          <p className="text-lg leading-8">
            408-409, 4th Floor
            <br />
            Aditya High Street
            <br />
            Lal Kuan, Ghaziabad
          </p>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-8 mt-12">

        <div className="border rounded-3xl p-8">
          <h4 className="font-bold text-xl mb-3">
            Phone
          </h4>

          <p>+91 7735235277</p>
          <p>+91 8527190899</p>
        </div>

        <div className="border rounded-3xl p-8">
          <h4 className="font-bold text-xl mb-3">
            Email
          </h4>

          <p>info@rkgcgroup.com</p>
          <p>rkgupta0001@gmail.com</p>
        </div>

        <div className="border rounded-3xl p-8">
          <h4 className="font-bold text-xl mb-3">
            Website
          </h4>

          <p>www.rkgcgroup.com</p>
        </div>

      </div>
    </section>
  );
}