"use client";

import MotionWrapper from "@/components/common/MotionWrapper";
import Image from "next/image";
import { clients } from "@/data/clients";

const stats = [
  { value: "200+", label: "Clients Served" },
  { value: "25+", label: "Years of Trust" },
  { value: "15+", label: "Industries" },
  { value: "500+", label: "Projects Delivered" },
];

export default function OurClientsPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb]">

      {/* Banner */}
      <section className="relative bg-gradient-to-r from-blue-100 to-blue-50 pb-8">
        
        {/* CURVE (IMPORTANT) */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#f9fafb"
            d="M0,32 C360,100 1080,0 1440,80 L1440,120 L0,120 Z"
          />
        </svg>

        <div className="relative container mx-auto px-6 pt-8 text-center">
          <p className="text-[#3877d4] uppercase tracking-[5px] text-sm font-semibold mb-3">
            Trusted Worldwide
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900">
            Our Clients
          </h1>

          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Trusted by industry leaders across pharma, power, cement, FMCG,
            and defense sectors — we build partnerships that last.
          </p>
        </div>
      </section>

      {/* Stats */}
      {/* <section className="relative -mt-6 bg-white shadow-lg rounded-2xl w-[92%] max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 overflow-hidden">
        {stats.map((stat, i) => (
          <div key={stat.label} className={`py-6 text-center ${i < stats.length - 1 ? "border-r" : ""}`}>
            <div className="text-3xl font-bold text-[#3877d4]">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </section> */}

      {/* Clients Grid */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {clients.map((client) => (
            <MotionWrapper
              key={client.logo}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col items-center gap-3 hover:shadow-md transition"
            >
              <div className="h-16 flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={client.name || "Client logo"}
                  width={140}
                  height={56}
                  className="max-h-12 object-contain"
                />
              </div>
              {client.name && (
                <p className="text-xs text-gray-500 text-center">{client.name}</p>
              )}
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* CTA */}
      {/* <section className="bg-[#3877d4] py-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Join Our Growing Client Base</h2>
        <p className="text-gray-300 mb-6">
          Partner with us for reliable industrial solutions trusted by 200+ companies.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/contactUs" className="bg-[#3877d4] px-6 py-3 rounded-lg">
            Get in Touch
          </a>
          <a href="/RequestQuote" className="border px-6 py-3 rounded-lg">
            Request a Quote
          </a>
        </div>
      </section> */}

    </div>
  );
}