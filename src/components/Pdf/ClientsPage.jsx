const clients = [
  "PWD",
  "PMGSY",
  "UPSIDA",
  "YEIDA",
  "NOIDA Authority",
  "Greater Noida Authority",
  "NHAI",
  "DFC",
  "UP Rajkiya Nirman Nigam",
  "Ashoka Buildcon",
  "Jaypee Group",
  "Aditya World City"
];

export default function ClientsPage() {
  return (
    <section className="h-[1120px] p-20 bg-white">
      <h2 className="text-6xl font-bold mb-16">
        Our Clients
      </h2>

      <div className="grid grid-cols-3 gap-8">
        {clients.map((client) => (
          <div
            key={client}
            className="border rounded-2xl p-8 text-center text-xl font-semibold"
          >
            {client}
          </div>
        ))}
      </div>
    </section>
  );
}