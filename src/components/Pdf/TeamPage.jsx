export default function TeamPage() {
  const team = [
    {
      name: "R.K. Gupta",
      role: "CEO & Founder",
    },
    {
      name: "Neeraj Sharma",
      role: "Executive Officer",
    },
    {
      name: "Ankur Goyal",
      role: "Executive Officer",
    },
  ];

  return (
    <section className="h-[1120px] bg-[#0f0f0f] text-white p-20">
      <span className="text-yellow-400 font-semibold">
        13
      </span>

      <h2 className="text-6xl font-bold mt-4 mb-20">
        Leadership Team
      </h2>

      <div className="grid grid-cols-3 gap-10">
        {team.map((member) => (
          <div
            key={member.name}
            className="bg-zinc-900 border border-yellow-500 rounded-3xl p-10 text-center"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-yellow-400 text-black flex items-center justify-center text-4xl font-bold">
              {member.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </div>

            <h3 className="text-3xl font-bold mt-8">
              {member.name}
            </h3>

            <p className="text-yellow-400 mt-3">
              {member.role}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-24 bg-zinc-900 rounded-3xl p-12 border border-yellow-500">
        <h3 className="text-3xl font-bold text-yellow-400 mb-6">
          Our Vision
        </h3>

        <p className="text-gray-300 text-lg leading-8">
          To become India's most trusted infrastructure,
          construction and real estate company by delivering
          exceptional quality, innovation and customer value.
        </p>
      </div>
    </section>
  );
}