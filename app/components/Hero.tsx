export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
        Matches don’t matter. Dates do.
      </h1>

      <p className="max-w-2xl text-lg md:text-xl text-gray-300 mb-10">
        LoveAll is built to get you off the app and into real game-day moments.
      </p>

      <button className="bg-white text-black px-10 py-4 rounded-full font-semibold text-lg hover:scale-105 transition">
        Join the Waitlist
      </button>
    </section>
  );
}
