export default function Problem() {
  return (
    <section className="bg-black text-white py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-wider text-gray-400">
            THE PROBLEM
          </p>
        </div>

        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="pb-8 md:pb-0 md:border-r md:border-white/10 md:pr-8 lg:pr-12">
            <div className="text-emerald-300 text-2xl md:text-3xl font-light mb-4">
              01
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Endless Swiping
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Dating apps keep you scrolling, not connecting. Hours spent, few real dates.
            </p>
          </div>

          <div className="pb-8 md:pb-0 md:border-r md:border-white/10 md:pr-8 lg:pr-12 lg:border-r-0">
            <div className="text-emerald-300 text-2xl md:text-3xl font-light mb-4">
              02
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Low-Quality Matches
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Algorithms prioritize engagement over compatibility. More matches, less meaning.
            </p>
          </div>

          <div className="pb-8 md:pb-0 md:col-span-2 lg:col-span-1 lg:border-l lg:border-white/10 lg:pl-12">
            <div className="text-emerald-300 text-2xl md:text-3xl font-light mb-4">
              03
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              No Real Connection
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Text conversations that go nowhere. The app becomes the destination, not the start.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
