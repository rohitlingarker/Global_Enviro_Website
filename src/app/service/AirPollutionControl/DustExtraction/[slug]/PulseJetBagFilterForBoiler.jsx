'use client';
import React from 'react';
import Image from 'next/image';

export default function PulseJetBagFilterForBoilerPage() {
  return (
    <div className="bg-white text-gray-800 leading-relaxed">
      {/* ---------- Intro Section ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <h1 className="text-4xl font-bold mb-2 text-blue-800">
          Pulse Jet Bag Filter for Boiler
        </h1>
      </section>

      {/* ---------- Product Overview ---------- */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-3 items-center px-6 py-4">
        <div>
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">
            Product Overview
          </h2>
          <p>
            Pulse Jet Bag Filters for boilers are specialized air pollution
            control systems designed to capture fly ash, soot, and hazardous
            particulate matter from boiler flue gas before it is discharged
            through the stack. Boiler applications present harsh operating
            environments, featuring high flue gas temperatures, corrosive
            gases, sparks, and fluctuating moisture levels that can cause acid
            dew point corrosion or filter blinding. Widely used in process
            industries, they help maintain clean air, improve workplace
            safety, and comply with environmental standards.
          </p>
          <p className="mt-2 font-semibold text-gray-700">Ideal For:</p>
          <ul className="list-disc pl-6 mt-1 space-y-1">
            <li className="break-inside-avoid">Pharmaceutical Industries</li>
            <li className="break-inside-avoid">Food Processing Units</li>
            <li className="break-inside-avoid">Cement &amp; Mineral Processing Plants</li>
            <li className="break-inside-avoid">Steel &amp; Foundry Industries</li>
            <li className="break-inside-avoid">Chemical &amp; Fertilizer Plants</li>
          </ul>
        </div>

        <div className="relative w-full aspect-4/3">
          <Image
            src="/assets/images/Air_Pollution/a01. Pulsejet Bag Filter for Boiler.jpg"
            alt="Pulse Jet Bag Filter for Boiler"
            fill
            className="object-contain rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* ---------- Key Features ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-4">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">
          Key Features
        </h2>
        <ul className="list-disc pl-6 space-y-2 md:columns-2 md:gap-x-10">
          <li className="break-inside-avoid">High dust collection efficiency for fine particles</li>
          <li className="break-inside-avoid">Continuous operation with automatic pulse cleaning</li>
          <li className="break-inside-avoid">Low maintenance and long filter bag life</li>
          <li className="break-inside-avoid">Compact and robust construction</li>
          <li className="break-inside-avoid">Energy-efficient operation with reduced pressure loss</li>
          <li className="break-inside-avoid">Suitable for high dust load applications</li>
          <li className="break-inside-avoid">Easy access for inspection and maintenance</li>
          <li className="break-inside-avoid">Customized capacities and filtration configurations available</li>
        </ul>
      </section>

      {/* ---------- Technical Specifications ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-4">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">
          Technical Specifications
        </h2>
        <ul className="list-disc pl-6 space-y-1 md:columns-2 md:gap-x-10">
          <li className="break-inside-avoid">
            <strong>Capacity Range:</strong> 500 CMH to 3,00,000 CMH
          </li>
          <li className="break-inside-avoid">
            <strong>Type of Fuel:</strong> Coal, Rice Husk, Biomass
            Briquettes
          </li>
          <li className="break-inside-avoid">
            <strong>Temperature:</strong> Up to 260°C depending on filter
            media
          </li>
          <li className="break-inside-avoid">
            <strong>Types of Filter Bags:</strong> PPS, Nomex, PTFE,
            Fiberglass, P84
          </li>
          <li className="break-inside-avoid">
            <strong>Types of Cleaning:</strong> Pulse Jet
          </li>
          <li className="break-inside-avoid">
            <strong>MOC:</strong> IS2062
          </li>
        </ul>
      </section>
    </div>
  );
}
