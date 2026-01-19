import WaitlistForm from "../components/WaitlistForm";

export const metadata = {
  title: "Join the LoveAll Waitlist",
  description: "Join the LoveAll waitlist for early access and updates",
};

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {/* Left Side - Heading and Text */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Join the LoveAll Waitlist
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Be among the first to experience LoveAll. Get early access to the app
              and stay updated on our launch. We can't wait to have you join our
              community of game-day enthusiasts.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="flex items-center">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </div>
  );
}
