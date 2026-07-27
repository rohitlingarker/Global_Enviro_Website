'use client';
import React from 'react';
import Image from 'next/image';

export default function EOTCranesPage() {
  return (
    <div className="bg-white text-gray-800 leading-relaxed">
      {/* ---------- Intro Section ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <h1 className="text-4xl font-bold mb-4 text-blue-800">EOT Cranes</h1>
        <p>
          An EOT Crane is a heavy-duty material handling system designed to
          lift, transport, and position materials within industrial
          facilities. Operating on elevated runway beams, EOT cranes provide
          safe, efficient, and precise movement of heavy loads, improving
          productivity and reducing manual handling efforts. EOT Cranes
          provide a safe, reliable, and efficient solution for heavy
          material handling, enabling seamless movement of loads across
          industrial facilities while maximizing operational efficiency and
          workplace safety.
        </p>
      </section>

      {/* ---------- Product Overview ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { src: "/assets/images/warehouse-projects/EOT_DoubleG.png", label: "Double Girder EOT Crane" },
          { src: "/assets/images/warehouse-projects/EOT_SingleG.png", label: "Single Girder EOT Crane" },
        ].map((item) => (
          <figure key={item.src} className="flex flex-col items-center gap-2">
            <div className="relative w-full h-[220px] sm:h-[260px] md:h-[320px]">
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-contain rounded-lg shadow-md"
              />
            </div>
            <figcaption className="text-sm font-medium text-gray-600">{item.label}</figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
}
