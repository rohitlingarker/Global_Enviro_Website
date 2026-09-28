"use client";

import React from "react";
import MotionWrapper from "@/components/common/MotionWrapper";
import Image from "next/image";
import { clients } from "@/data/clients";

const ClientsRow = ({ items, reverse }) => (
  <div className="overflow-hidden w-full my-6">
    <MotionWrapper
      as="div"
      className="flex gap-12"
      animate={{ x: reverse ? ["0%", "-100%"] : ["-100%", "0%"] }}
      transition={{
        repeat: Infinity,
        // keep the original pace (~2.5s per logo) however many logos the row has
        duration: items.length * 2.5,
        ease: "linear",
      }}
    >
      {[...items, ...items].map((client, index) => (
        <Image
          key={index}
          src={client.logo}
          alt={client.name || "Client logo"}
          width={120}
          height={56}
          className="h-14 w-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-md"
        />
      ))}
    </MotionWrapper>
  </div>
);

const ClientsPage = () => {
  // Split logos into two rows so every client appears
  const half = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, half);
  const row2 = clients.slice(half);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 mb-2">
        Our Clients
      </h2>
      <p className="text-center text-blue-800 text-lg mb-5 tracking-wide">
    Empowering Sustainable Growth Through Innovation and Trust
  </p>
      <div className="space-y-5">
        <ClientsRow items={row1} reverse={true} />
        <br></br>
        <ClientsRow items={row2} reverse={false} />
      </div>
      {/* Animated Button */}
      <div className="flex justify-center mt-5">
        <a href="/OurClients">
          <MotionWrapper
            as="button"
            whileHover={{
              scale: 1.08,
              backgroundPosition: "right center",
              boxShadow: "0px 8px 20px rgba(30, 64, 175, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="px-8 py-3 bg-gradient-to-tr from-primary to-accent text-white font-semibold rounded-full shadow-md bg-[length:200%_200%] transition-all duration-500"
          >
            View All Clients
          </MotionWrapper>
        </a>
      </div>
    </div>
  );
};

export default ClientsPage;



