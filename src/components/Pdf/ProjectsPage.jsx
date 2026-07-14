const projects = [
  {
    department: "YEIDA",
    amount: "11.09 Cr",
    progress: "90%",
    location: "Sector 20 Yamuna",
  },
  {
    department: "YEIDA",
    amount: "3.99 Cr",
    progress: "60%",
    location: "Sector 17 Yamuna",
  },
  {
    department: "UPSIDA",
    amount: "10.52 Cr",
    progress: "93%",
    location: "Unnao",
  },
  {
    department: "NOIDA",
    amount: "5.02 Cr",
    progress: "60%",
    location: "Sector 5 Noida",
  },
  {
    department: "DFC",
    amount: "13.65 Cr",
    progress: "80%",
    location: "Khurja",
  },
];

export default function ProjectsPage() {
  return (
    <section className="h-[1120px] bg-white p-20">
      <div className="mb-14">
        <span className="text-yellow-600 font-semibold">
          07
        </span>

        <h2 className="text-6xl font-bold mt-4">
          Ongoing Projects
        </h2>
      </div>

      <div className="overflow-hidden rounded-3xl border">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-6 text-left">
                Department
              </th>

              <th className="p-6 text-left">
                Tender Amount
              </th>

              <th className="p-6 text-left">
                Progress
              </th>

              <th className="p-6 text-left">
                Location
              </th>
            </tr>
          </thead>

          <tbody>
            {projects.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-yellow-50"
              >
                <td className="p-6 font-semibold">
                  {item.department}
                </td>

                <td className="p-6">
                  {item.amount}
                </td>

                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-40 h-3 rounded-full bg-gray-200">
                      <div
                        className="h-3 rounded-full bg-yellow-500"
                        style={{
                          width: item.progress,
                        }}
                      />
                    </div>

                    <span>{item.progress}</span>
                  </div>
                </td>

                <td className="p-6">
                  {item.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-16">
        <div className="bg-black text-white rounded-3xl p-8">
          <h3 className="text-yellow-400 text-5xl font-bold">
            50+
          </h3>
          <p className="mt-3">
            Completed Projects
          </p>
        </div>

        <div className="bg-black text-white rounded-3xl p-8">
          <h3 className="text-yellow-400 text-5xl font-bold">
            20+
          </h3>
          <p className="mt-3">
            Running Projects
          </p>
        </div>

        <div className="bg-black text-white rounded-3xl p-8">
          <h3 className="text-yellow-400 text-5xl font-bold">
            100%
          </h3>
          <p className="mt-3">
            Quality Commitment
          </p>
        </div>
      </div>
    </section>
  );
}