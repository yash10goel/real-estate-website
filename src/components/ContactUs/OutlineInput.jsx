export function OutlineInput({ label }) {
  return (
    <div className="relative w-full">
      {/* Label */}
      <label className="absolute -top-2 left-3 bg-[#f3f1ec] px-1 text-sm text-gray-600">
        {label}
      </label>

      {/* Input */}
      <input
        className="w-full px-4 py-3 rounded-lg border border-gray-400 
        bg-transparent outline-none
        focus:border-yellow-500 focus:ring-1 focus:ring-yellow-300
        transition-all duration-300"
      />
    </div>
  );
}