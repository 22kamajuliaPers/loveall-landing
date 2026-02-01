"use client";

import Image from "next/image";

interface Profile {
  name: string;
  age: number;
  location: string;
  image: string;
  teams: string[];
  sports: string[];
  prefersWatching: string;
}

const profiles: Profile[] = [
  {
    name: "Maya",
    age: 29,
    location: "Brooklyn, NY",
    image: "/images/profile-maya.jpg",
    teams: ["Yankees", "Knicks"],
    sports: ["Baseball", "Basketball", "Tennis"],
    prefersWatching: "At the stadium or a sports bar",
  },
  {
    name: "Jordan",
    age: 32,
    location: "Los Angeles, CA",
    image: "/images/profile-jordan.jpg",
    teams: ["Lakers", "Dodgers"],
    sports: ["Basketball", "Baseball", "Soccer"],
    prefersWatching: "At home with friends",
  },
  {
    name: "Sam",
    age: 27,
    location: "Chicago, IL",
    image: "/images/profile-sam.jpg",
    teams: ["Bears", "Cubs"],
    sports: ["Football", "Baseball", "Hockey"],
    prefersWatching: "At the stadium",
  },
];

export default function ProfilesIdentitySection() {
  return (
    <section className="relative w-full bg-[#f6f1ea] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900">
            Profiles built around identity
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed mt-4">
            Sports fandom tells you something real about a person—what they care about, how they spend their time, and what brings them joy.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="bg-white/60 border border-gray-200 rounded-xl p-6"
            >
              {/* Profile Image */}
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden">
                <Image
                  src={profile.image}
                  alt={`${profile.name}, ${profile.age}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Name and Location */}
              <div className="mt-5">
                <h3 className="text-lg font-medium text-gray-900">
                  {profile.name}, {profile.age}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {profile.location}
                </p>
              </div>

              {/* Teams */}
              <div className="mt-5">
                <p className="text-xs tracking-widest text-gray-500 uppercase">
                  Teams
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.teams.map((team, teamIndex) => (
                    <span
                      key={teamIndex}
                      className="px-3 py-1 text-xs rounded-full bg-emerald-50 border border-emerald-100 text-gray-700"
                    >
                      {team}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sports */}
              <div className="mt-5">
                <p className="text-xs tracking-widest text-gray-500 uppercase">
                  Sports
                </p>
                <p className="mt-2 text-sm text-gray-800">
                  {profile.sports.map((sport, sportIndex) => (
                    <span key={sportIndex}>
                      {sportIndex > 0 && <span className="mx-1"> · </span>}
                      <span className={sportIndex === 0 ? "font-medium" : ""}>
                        {sport}
                      </span>
                    </span>
                  ))}
                </p>
              </div>

              {/* Divider */}
              <div className="mt-5 pt-5 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  <span className="font-medium text-gray-600">Prefers watching:</span>{" "}
                  {profile.prefersWatching}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Line */}
        <p className="text-center text-sm text-gray-500 mt-10">
          Photos matter, but they don't define. Sports identity leads.
        </p>
      </div>
    </section>
  );
}
