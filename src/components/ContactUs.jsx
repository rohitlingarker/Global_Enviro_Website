"use client";

import React from "react";
import { Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";
import MotionWrapper from "@/components/common/MotionWrapper";

const branches = [
  {
    name: "Global Enviro Air Systems – Unit I & II",
    address: "Sy. No. 163/A, Gagillapur Village,Dundigal–Gandimaisamma Mandal,Medchal–Malkajgiri District,Hyderabad – 500043, Telangana, India",
    // ✅ Head Office map embed
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.7368658972755!2d78.39407517512182!3d17.59745768345095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8eb0081aaaab%3A0x82bf120ade91c860!2sGlobal%20Enviro%20Air%20Systems%20pvt%20limited!5e0!3m2!1sen!2sin!4v1730649852000!5m2!1sen!2sin",
    mapUrl: "https://www.google.com/maps/place/Global+Enviro+Air+Systems+pvt+limited/@17.5974577,78.3940752,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb8eb0081aaaab:0x82bf120ade91c860!8m2!3d17.5974577!4d78.3966501!16s%2Fg%2F11b8b80n0z",
  },
  {
    name: "Hyderabad – Jeedimetla Unit",
    address: "Survey No 303, Rami Reddy Nagar, Quthbullapur (Mdl), I.D.A Jeedimetla, Hyderabad – 500055, Telangana.",
    // Exact map embed for 17°31'27.1"N 78°27'33.3"E with red pinpoint symbol
    mapSrc: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3805.023423719001!2d78.4566612!3d17.5242043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDMxJzI3LjEiTiA3OMKwMjcnMzMuMyJF!5e0!3m2!1sen!2sin!4v1730649852000!5m2!1sen!2sin",
    mapUrl: "https://www.google.com/maps/place/17%C2%B031'27.1%22N+78%C2%B027'33.3%22E/@17.5242043,78.4566612,666m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d17.5242043!4d78.4592361?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Global Metallurgicals",
    address: "Plot No 89, Aleap Industrial Estate, Surampalli Village, Gannavaram Mandal, Krishna District – 521212, Andhra Pradesh.",
    // Exact map embed for 16°35'49.7"N 80°42'55.6"E with red pinpoint symbol
    mapSrc: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3821.0!2d80.7154308!3d16.5971291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDM1JzQ5LjciTiA4MMKwNDInNTUuNiJF!5e0!3m2!1sen!2sin!4v1730649852002!5m2!1sen!2sin",
    mapUrl: "https://www.google.com/maps/place/16%C2%B035'49.7%22N+80%C2%B042'55.6%22E/@16.5971291,80.7154308,17z/data=!3m1!4b1!4m4!3m3!8m2!3d16.5971291!4d80.7154308?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "SV BioFuel",
    address: "SV Bio fuels, Rami Reddy Nagar, Jeedimetla, Hyderabad, Telangana 500055.",
    // Exact map embed for 17°02'11.0"N 80°53'55.5"E with red pinpoint symbol
    mapSrc: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3821.0!2d80.8961756!3d17.0363989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDAyJzExLjAiTiA4MMKwNTMnNTUuNSJF!5e0!3m2!1sen!2sin!4v1730649852004!5m2!1sen!2sin",
    mapUrl: "https://www.google.com/maps/place/17%C2%B002'11.0%22N+80%C2%B053'55.5%22E/@17.0363989,80.8961756,667m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d17.0363989!4d80.8987505?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Jet Tech – Philippines Branch",
    address: "3rd Floor, Vitra Building, P. Alcantara Street, San Pablo City, Laguna, Philippines – 4000.",
    phone: "(63) 999-881-1927 / (02) 381-5530",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3868.0!2d121.3244!3d14.0690!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd6f1c1c1c1c1c%3A0x1c1c1c1c1c1c1c1c!2sSan%20Pablo%20City%2C%20Laguna%2C%20Philippines!5e0!3m2!1sen!2sin!4v1730649852003!5m2!1sen!2sin",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Vitra+Building+San+Pablo+City+Laguna+Philippines",
  },
];

export default function ContactUS() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb] text-gray-800">

      {/* ── Banner ── */}
      <section className="relative bg-gradient-to-r from-blue-100 to-blue-50 pb-8">
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#f9fafb" d="M0,32 C360,100 1080,0 1440,80 L1440,120 L0,120 Z" />
        </svg>
        <div className="relative container mx-auto px-6 pt-8 text-center">
          <MotionWrapper
            as="h1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 tracking-wide"
          >
            Get In Touch
          </MotionWrapper>
          <MotionWrapper
            as="p"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-4 text-gray-700 max-w-2xl mx-auto text-lg"
          >
            Reach out to Global Enviro Air Systems for enquiries, support, or
            partnership discussions.
            <br/>
          </MotionWrapper>
        </div>
        <br/>
      </section>

      {/* ── Contact Info Bar ── */}
      <section className="relative z-10 -mt-10 bg-white shadow-lg rounded-2xl w-[92%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
            <Phone className="w-5 h-5 text-[#3877d4]" />
          </div>
          <h4 className="font-semibold text-[#0f172a] mb-2">Call Us</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            +91 9666 669 922<br />
            +91 9666 266 113<br />
            +91 9666 879 977<br />
            08418 257264 to 68
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
            <Mail className="w-5 h-5 text-[#3877d4]" />
          </div>
          <h4 className="font-semibold text-[#0f172a] mb-2">Email</h4>
          {/* ✅ Only one email as requested */}
          <a
            href="mailto:info@globalenviro.in"
            className="text-[#3877d4] text-sm font-medium hover:underline"
          >
            info@globalenviro.in
          </a>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5 text-[#3877d4]" />
          </div>
          <h4 className="font-semibold text-[#0f172a] mb-2">Head Office</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
           Sy. No. 163/A, Gagillapur Village,<br />
Dundigal–Gandimaisamma Mandal,<br />
Medchal–Malkajgiri District,<br />
Hyderabad – 500043, Telangana, India
          </p>
        </div>
      </section>

      {/* ── Branch Locations with Maps ── */}
      <section className="py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1e3d] mb-3">Our Locations</h2>
            <p className="text-gray-500 text-base">Find us across India and internationally</p>
            <div className="mt-4 mx-auto w-20 h-1 bg-[#3877d4] rounded-full" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {branches.map((branch, index) => (
              <MotionWrapper
                as="div"
                key={branch.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Map */}
                <div className="w-full h-40">
                  <iframe
                    title={branch.name}
                    src={branch.mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Card Info */}
                <div className="p-5 space-y-3">
                  {/* Branch name */}
                  <h3 className="font-bold text-[#0b1e3d] text-base">
                    {branch.mapUrl ? (
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#3877d4] transition-colors"
                      >
                        {branch.name}
                      </a>
                    ) : (
                      branch.name
                    )}
                  </h3>

                  {/* Address */}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#3877d4] mt-0.5 shrink-0" />
                    {branch.mapUrl ? (
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 text-sm leading-relaxed hover:text-[#3877d4] hover:underline transition-colors"
                      >
                        {branch.address}
                      </a>
                    ) : (
                      <p className="text-gray-500 text-sm leading-relaxed">{branch.address}</p>
                    )}
                  </div>

                  {/* Phone — only for Philippines branch */}
                  {branch.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#3877d4] shrink-0" />
                      <span className="text-gray-500 text-sm">{branch.phone}</span>
                    </div>
                  )}

                  {/* Links section: Email and View on Map */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#3877d4] shrink-0" />
                      <a
                        href="mailto:info@globalenviro.in"
                        className="text-sm text-[#3877d4] hover:underline font-medium"
                      >
                        info@globalenviro.in
                      </a>
                    </div>
                    {branch.mapUrl && (
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-[#3877d4] hover:underline font-medium bg-blue-50 px-2.5 py-1 rounded-full transition-all hover:bg-blue-100"
                      >
                        <span>View on Map</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form + Head Office Map ── */}
      <section className="bg-white py-7 px-6">
        <div className="max-w-6xl mx-auto grid gap-5 md:grid-cols-2 items-start">

          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#0b1e3d] mb-2">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-5">
              We'll get back to you at{" "}
              <a href="mailto:info@globalenviro.in" className="text-[#3877d4] font-medium hover:underline">
                info@globalenviro.in
              </a>
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#3877d4] outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#3877d4] outline-none"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#3877d4] outline-none"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#3877d4] outline-none resize-none"
              />
              <button
                type="submit"
                className="bg-[#3877d4] hover:bg-[#2f5fb8] text-white w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Head Office Map */}
          <div>
            <h2 className="text-2xl font-bold text-[#0b1e3d] mb-2">Head Office</h2>
            <p className="text-gray-500 text-sm mb-4">
              Survey No. 163/A (Part), Gagillapur (Vill.),
              Gandimaisamma (Mdl),Medchal–Malkajgiri (dist), Hyderabad – 500043, Telangana.
            </p>
            <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 h-64 sm:h-80 md:h-100">
              <iframe
                title="Global Enviro Air Systems - Head Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.7368658972755!2d78.39407517512182!3d17.59745768345095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8eb0081aaaab%3A0x82bf120ade91c860!2sGlobal%20Enviro%20Air%20Systems%20pvt%20limited!5e0!3m2!1sen!2sin!4v1730649852000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}