"use client";
import MotionWrapper from "@/components/common/MotionWrapper";

const keyPersons = [
  { name: "T. Naveen Kumar ",         role: "Head Accounts" },
  { name: "M. Sridhar ",        role: "Head Purchases" },
  { name: "B.S. Ramesh",         role: "Head Engineering" },
  { name: "NVS Rao",        role: "Head Projects" },
  { name: "A. Aravind  Reddy",        role: "Head Manufacturing & Execution – Air Pollution" },
  { name: "P. Venkata Ramana ",         role: "Head Manufacturing & Execution – Material Handling" },
  { name: "K. Srinivasa Reddy", role: "Head HVAC Projects" },
  { name: "P. Suresh Reddy",   role: "Head Marketing" },
  { name: "A. Prem Sai",           role: "Head Quality Control" },
  { name: "G. Sarala",         role: "Head Commercial" },
];

export default function KeyPersons() {
  return (
    <section className="py-6 px-6 md:px-16 bg-gradient-to-br from-white via-[#f2f8ff] to-[#e6f0ff]">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-5">
          <MotionWrapper
            as="h2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold text-[#081736] mb-3"
          >
            Key Persons
          </MotionWrapper>
          <p className="text-gray-500 text-lg">
            The dedicated leaders driving our operations forward
          </p>
          <div className="mt-4 mx-auto w-20 h-1 bg-[#3877d4] rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {keyPersons.map((person, index) => (
            <MotionWrapper
              as="div"
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="flex flex-col items-center text-center bg-white rounded-2xl shadow-sm p-4 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {/* Avatar — initial letter, replace with <Image> when photos available */}
              <div className="w-16 h-16 rounded-full bg-[#3877d4] flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-md">
                {person.name.charAt(0)}
              </div>
              <p className="font-semibold text-gray-800 text-sm leading-snug">
                {person.name}
              </p>
              <p className="text-xs text-[#3877d4] mt-1 font-medium leading-snug">
                {person.role}
              </p>
            </MotionWrapper>
          ))}
        </div>

      </div>
    </section>
  );
}