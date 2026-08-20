'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PRODUCT_CATEGORIES = [
  { name: 'Scientific Door', anchor: 'scientific-door' },
  { name: 'Cleanroom Door', anchor: 'scientific-door' },
  { name: 'Fire-Related Door', anchor: 'fire-rated-door' },
  { name: 'Stainless Steel Doors', anchor: 'stainless-steel-door' },
  { name: 'General Door & Louvered Door', anchor: 'general-door' },
  { name: 'Shaft Door', anchor: 'shaft-door' },
  { name: 'Hatch Door', anchor: null },
  { name: 'Emergency Exit Door', anchor: null },
  { name: 'Commercial Building Metal Louvers', anchor: 'metal-louvers' },
];

const ADVANTAGES = [
  'Cost-Effective Construction',
  'Full Control of Design at all Stages',
  'Minimum Production Lead and Delivery Time',
  'Production Quality Certified to Standards',
  'Modular Construction Facility for Easy Transportation',
  'Variety of Custom Finishes',
];

const COLOR_CODES = [
  { name: 'RAL 9002', hex: '#d7d3c8' },
  { name: 'RAL 9010', hex: '#efece0', border: true },
  { name: 'RAL 5015 Sky Blue', hex: '#0273b9' },
  { name: 'RAL 5012', hex: '#0067ac' },
  { name: 'RAL 5002', hex: '#202b60' },
  { name: 'Reliance Green', hex: '#43bfb5' },
  { name: 'DA Grey', hex: '#4e5759' },
  { name: 'Smoke Grey', hex: '#657886' },
  { name: 'RAL 7022 Umbra Grey', hex: '#31332d' },
  { name: 'RAL 3020 Red', hex: '#bb2025' },
];

const SPEC_ROWS = [
  {
    label: 'Material',
    cleanroom: ['Galvanized Plain Skin Pass Steel', 'Stainless Steel 304 Grade'],
    commercial: ['Galvanized Plain Skin Pass Steel', 'Stainless Steel 304 Grade'],
    general: ['Galvanized Plain Skin Pass Steel', 'Stainless Steel 304 Grade'],
    fire: ['Galvanized Plain Skin Pass Steel', 'Stainless Steel 304 Grade'],
  },
  {
    label: 'Sheet Thickness',
    cleanroom: ['0.8 mm Thick for Shutter', '1.2 mm Thick for Frame'],
    commercial: ['0.8 mm Thick for Shutter', '1.2 mm Thick for Frame'],
    general: ['0.8 mm Thick for Shutter', '1.2 mm Thick for Frame'],
    fire: ['0.8, 1.2 mm Thick for Shutter', '1.2 mm Thick for Frame'],
  },
  {
    label: 'Shutter Thickness',
    cleanroom: ['46 mm'],
    commercial: ['46 mm'],
    general: ['46 mm'],
    fire: ['46 mm'],
  },
  {
    label: 'Infill Material',
    cleanroom: ['Honeycomb / PUF'],
    commercial: ['Honeycomb'],
    general: ['Honeycomb / PUF'],
    fire: ['Rockwool'],
  },
  {
    label: 'Applications',
    cleanroom: ['Pharma, Food Industries, Hospitals, Offices'],
    commercial: ['Malls, Residential, Institutions, Offices'],
    general: ['All'],
    fire: ['Shopping Malls, Pharma, Industries, Apartments'],
  },
];

const DOOR_SIZE_RANGE = [
  { type: 'Single Door', dim: 'Width (mm)', values: ['750 - 1190', '750 - 1190', '750 - 1190', '750 - 1190'] },
  { type: 'Single Door', dim: 'Height (mm)', values: ['1200 - 2500', '1200 - 2500', '1200 - 2500', '1200 - 2500'] },
  { type: 'Double Door', dim: 'Width (mm)', values: ['1000 - 2300', '1000 - 2300', '1000 - 2300', '1000 - 2300'] },
  { type: 'Double Door', dim: 'Height (mm)', values: ['1200 - 2500', '1200 - 2500', '1200 - 2500', '1200 - 2500'] },
];

const INFILL_MATERIALS = [
  {
    name: 'Honeycomb',
    image: '/assets/images/metal-doors/honeycomb.jpg',
    color: 'bg-blue-900',
    points: [
      'Perfect hexagonal shaped strong and lightweight core or filling material, made of 100% recycled material',
      'Widely used as core infill material in interior doors',
      'Offers high pressure strength',
      'Qualified as a core material between flat and moulded facings',
      'Easily adapts to any shape',
    ],
  },
  {
    name: 'Rockwool',
    image: '/assets/images/metal-doors/rockwool.jpg',
    color: 'bg-green-900',
    points: [
      'High density rockwool board insulation produced from molten basalt spun to fine fibers and bonded with heat resistant binder',
      'Meets the requirements of technical fire performance',
      'Optimized density, fiber direction and excellent fit of mineral provide ideal thermal and acoustic insulation for steel doors',
      'Used in the steel stiffened doors',
    ],
  },
  {
    name: 'Polyurethane Foam',
    image: '/assets/images/metal-doors/polyurethane-foam.jpg',
    color: 'bg-red-700',
    points: [
      'Insulated foam injected into the core, expanding to fill all available space within the cavity of the hollow metal door',
      'Best insulation value among the three infill materials',
      'Cannot be fire rated',
      'Generally used for cleanroom applications',
    ],
  },
];

const FEATURES = [
  'Heavy-Duty Galvanized Steel Construction',
  'Good Powder Coated Finish',
  'Infinite Color Possibilities In-House Powder Coating for Customized RAL Shades',
  'Corrosion Resistance',
  'Single & Double Leaf Options',
  'In-House Laser Cutting for Perfect Sizes',
  'High-Quality Frame and Shutter with Vision Glass Options',
  'Infill Honeycomb / Rockwool / Polyurethane Foam Insulation',
  'Smoke and Fire Resistant Seals',
  'Panic Bar Compatibility',
  'Self-Closing Mechanism',
  'Customize Sized Doors Possibility',
  'Low Maintenance, Cost-Effective Solution',
  'Quick and Easy Installation',
];

const WHY_CHOOSE_US = [
  'Advanced Manufacturing Facility',
  'Customized Design Solutions',
  'Industry Standard Compliance',
  'Experienced Engineering Team',
  'Timely Delivery',
  'Complete Installation Support',
  'Quality Assurance',
];

const APPLICATION_AREAS = [
  'Pharmaceutical Industries',
  'Cleanroom',
  'Commercial Buildings',
  'Hospitals',
  'Data Centers',
  'Fire Exits',
  'Warehouses',
  'Manufacturing Industries',
  'Food Processing Industries',
  'R&D Laboratories',
];

function ProductSection({ id, title, image, imageAlt, children }) {
  return (
    <section id={id} className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start px-6 py-8 scroll-mt-28 border-t border-gray-100">
      <div>
        <h3 className="text-2xl font-semibold text-blue-800 mb-3">{title}</h3>
        {children}
      </div>
      <div className="relative w-full h-[260px] sm:h-[300px] md:h-[360px]">
        <Image src={image} alt={imageAlt} fill className="object-contain rounded-lg shadow-md" />
      </div>
    </section>
  );
}

export default function MetalDoors() {
  return (
    <div className="bg-white text-gray-800 leading-relaxed">
      {/* ---------- Hero Banner ---------- */}
      <section className="relative w-full h-64 sm:h-80 md:h-96">
        <Image
          src="/assets/images/metal-doors/hero-banner.jpg"
          alt="Global Enviro Metal Doors"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center px-6 md:px-16">
          <p className="text-amber-400 font-semibold tracking-wide mb-2">STRONGER | SMARTER | SAFER</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-2xl">
            Revolutionary Creation of Steel Doors
          </h1>
          <p className="text-white/90 max-w-xl">
            Engineered for safety. Designed for style. Built to last.
          </p>
        </div>
      </section>

      {/* ---------- About Us ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">About Us</h2>
        <p className="mb-4">
          Global Enviro Air Systems Pvt. Ltd. is a leading company in Air Pollution Control, HVAC Systems
          and Cleanroom Technology Systems, Bulk Material Handling, Metal Doors, Engineered Metal Products
          and end-to-end industrial solutions. Our expertise spans clean room technology, metal castings,
          and global import-export operations. What sets us apart is our commitment to truly understanding
          client needs and delivering solutions that work.
        </p>
        <p>
          As one of the industry&apos;s most trusted names, Global Enviro Air Systems Pvt. Ltd. is
          strategically expanding across diverse sectors. We envision strong, sustainable growth
          throughout the subcontinent in the years ahead.
        </p>
      </section>

      {/* ---------- Our Metal Doors ---------- */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start px-6 py-8">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Metal Doors</h2>
          <p className="mb-4">
            Global Enviro Air Systems is engaged in manufacturing, supply and installation of a wide range
            of metal doors. With over many years of experience and industry knowledge, our company
            continues to manufacture a variety of metal doors designed to meet Pharmaceutical Industries,
            Healthcare, Food Processing Industry, Semiconductor Manufacturing, Biotechnology, Life Sciences,
            Shopping Malls, Commercial Buildings, Data Centers, Staircase Fire Exits, Warehouses, Industrial
            Plants and other fields sensitive to environmental contamination.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              We have world class infrastructure like Laser Cutting machines, CNC bending machines & panel
              bender, in-house automatic powder coating booth with automatic conveyor to heating chamber,
              PU foam insulation filling machine with Hot Press machine facilities.
            </li>
            <li>
              Our factory, located in Hyderabad, offers the best quality standard and custom metal doors.
              We design, manufacture and supply a wide range of metal doors to suit a wide range of needs,
              requirements and uses, fabricated by our well-qualified professionals.
            </li>
            <li>
              Made from galvanized steel & stainless steel, these flush doors are compact, stable and
              strong. Extremely low maintenance, factory finished with a wide range of colors and other
              specifications to meet various clean room requirements.
            </li>
          </ul>
        </div>
        <div className="relative w-full h-[260px] sm:h-[300px] md:h-[360px]">
          <Image
            src="/assets/images/metal-doors/about-door.jpg"
            alt="Cleanroom double door"
            fill
            className="object-contain rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* ---------- Advantages ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
          Advantages of Our Metal Doors
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ADVANTAGES.map((item) => (
            <div key={item} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100">
              <span className="mt-1 h-2 w-2 rounded-full bg-red-700 flex-shrink-0" />
              <span className="font-semibold text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Our Products ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-8 bg-gray-50 rounded-2xl">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Our Products</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PRODUCT_CATEGORIES.map((cat) =>
            cat.anchor ? (
              <a
                key={cat.name}
                href={`#${cat.anchor}`}
                className="bg-white rounded-lg border border-gray-200 px-4 py-3 font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-700 hover:shadow-sm transition"
              >
                {cat.name}
              </a>
            ) : (
              <div
                key={cat.name}
                className="bg-white rounded-lg border border-gray-200 px-4 py-3 font-semibold text-gray-500"
              >
                {cat.name}
              </div>
            )
          )}
        </div>
      </section>

      {/* ---------- Product Detail Sections ---------- */}
      <ProductSection
        id="scientific-door"
        title="Scientific Door"
        image="/assets/images/metal-doors/scientific-door.jpg"
        imageAlt="Scientific Door"
      >
        <p className="mb-4">
          Scientific doors are precision-engineered, flush type door systems designed for sterile and
          highly controlled environments. They are built to withstand rigorous chemical washing, facilitate
          the highest standards, control air pressure and prevent dust — meeting the most stringent
          requirements for clean and hygienic applications. Scientific doors are essential infrastructure
          across high-tech industries that operate under rigid international compliance standards (such as
          USFDA, WHO, cGMP and ISO).
        </p>
        <p>
          Used in cleanroom environments across Pharmaceuticals, Bio-technologies, Food & Beverage,
          Electronics & Hospitals. These fully flush-type doors are available in galvanized steel and
          stainless steel, provided with a range of indigenous and imported ironmongery in stainless steel.
          Door sets can be custom designed for each project&apos;s requirements while incorporating special
          features in addition to the vision glass, hardware and wide range of color finishes.
        </p>
      </ProductSection>

      <ProductSection
        id="double-door"
        title="Double Door"
        image="/assets/images/metal-doors/double-door.jpg"
        imageAlt="Scientific Double Door"
      >
        <p className="mb-4">
          Scientific double doors (also known as double-leaf cleanroom doors) are precision-engineered,
          wide-entry systems designed for controlled, sterile environments. They feature a seamless,
          flush-surface dual-shutter layout that completely eliminates dirt-trapping crevices while
          providing a wide clearance for moving large machinery, equipment, or material trollies without
          disrupting environmental sterility.
        </p>
        <p>
          Scientific double doors are primarily installed at critical entry-and-exit transition points
          within high-tech industries that operate under stringent hygiene standards.
        </p>
      </ProductSection>

      <ProductSection
        id="stainless-steel-door"
        title="Stainless Steel Door"
        image="/assets/images/metal-doors/stainless-steel-door.jpg"
        imageAlt="Stainless Steel Door"
      >
        <p className="mb-4">
          Stainless steel (SS) doors are high-durability, heavy-duty barrier systems engineered for
          environments that require extreme structural strength, hygiene, and corrosion resistance. Unlike
          standard hollow metal or wooden doors, they are built to withstand harsh chemical washdowns,
          severe weather, and high-impact physical force without rusting, warping or degrading over time.
        </p>
        <p>
          Stainless steel doors are the industry standard across sectors with strict sanitary mandates or
          high-security vulnerabilities: Pharmaceutical & Chemical Plants, Hospitals & Laboratories, Food &
          Beverage Processing Facilities, Marine & Coastal Infrastructure and High-Security Environments.
        </p>
      </ProductSection>

      <ProductSection
        id="fire-rated-door"
        title="Fire Rated Door"
        image="/assets/images/metal-doors/fire-rated-door.jpg"
        imageAlt="Fire Rated Door"
      >
        <p className="mb-4">
          Fire-rated doors serve as a critical defense line in a building&apos;s passive fire protection
          strategy, specifically engineered to contain fire, smoke, and toxic gases within a localized
          compartment.
        </p>
        <p>
          Steel fire-rated doors play a critical role by serving as fire and smoke barriers. Their primary
          applications span residential buildings, commercial buildings, shopping malls, industrial,
          warehouses and institutional buildings — safely securing evacuation pathways, delaying structural
          collapse, restricting spread and saving lives.
        </p>
      </ProductSection>

      <ProductSection
        id="shaft-door"
        title="Shaft Door"
        image="/assets/images/metal-doors/shaft-door.jpg"
        imageAlt="Shaft Door"
      >
        <p className="mb-4">
          Shaft doors (also called shaft access doors or riser doors) are specialized, highly secure steel
          panels designed to seal off vertical or horizontal building voids. These service voids house
          critical infrastructure, including high-voltage cables, fire water pipe lines, plumbing lines,
          ventilation systems and mechanical risers.
        </p>
        <p className="mb-2">
          Because continuous vertical shafts naturally create a dangerous &quot;chimney effect&quot; that
          accelerates fire, smoke, and heat upwards through a building, shaft doors serve as vital
          containment barriers. Primary uses and functional benefits are:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Mitigating Fire Propagation</li>
          <li>Isolating Smoke and Harmful Gases</li>
          <li>Facilitating Building Maintenance</li>
          <li>Restricting Unauthorized Access</li>
        </ul>
      </ProductSection>

      {/* ---------- General Door & Louver Door ---------- */}
      <section id="general-door" className="max-w-6xl mx-auto px-6 py-8 scroll-mt-28 border-t border-gray-100">
        <h3 className="text-2xl font-semibold text-blue-800 mb-1">General Door</h3>
        <p className="text-lg text-red-700 font-semibold mb-3">& Louver Door</p>
        <p className="mb-4">
          General doors — commonly referred to as general-purpose commercial doors or utility doors — are
          standard architectural swing doors designed for areas that do not require specialized cleanroom
          engineering or high-security reinforcement. They provide reliable room partition, privacy, and
          climate control across normal traffic zones. General doors are the most frequently used doors in
          any standard building layout, typically installed in low-to-medium risk spaces.
        </p>
        <p className="mb-6">
          <strong>Used for:</strong> Offices, Conference Rooms, Educational Institutions, Shopping Malls,
          Commercial Retail Buildings, Residential & Hospital Buildings.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="relative w-full h-[280px] sm:h-[320px]">
            <Image
              src="/assets/images/metal-doors/general-door.jpg"
              alt="General Door"
              fill
              className="object-contain rounded-lg shadow-md"
            />
          </div>
          <div id="louver-door" className="relative w-full h-[280px] sm:h-[320px] scroll-mt-28">
            <Image
              src="/assets/images/metal-doors/louver-door.jpg"
              alt="Louver Door"
              fill
              className="object-contain rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <ProductSection
        id="metal-louvers"
        title="Commercial Building Metal Louvers"
        image="/assets/images/metal-doors/metal-louvers.jpg"
        imageAlt="Commercial Building Metal Louvers"
      >
        <p>
          Metal louvers are functional architectural elements designed with a series of angled horizontal
          blades. Their core purpose is to facilitate optimal airflow and natural ventilation while blocking
          out unwanted external elements like rainwater, direct sunlight and debris. They are heavily relied
          upon across Commercial Buildings & Institutional Buildings like office & retail facades,
          multi-storey car parks; Industrial & Utility Plants like generator & boiler rooms, electrical
          substations & data centers; and warehouses — offering an ideal balance between engineering
          performance, modern high-tech aesthetics, and visual privacy & security. Commonly used materials
          are Galvanized Steel / CRCA Steel. Fixed louver blades are permanently locked at a set angle of 45°
          and powder coated with multi colors as per requirement.
        </p>
      </ProductSection>

      {/* ---------- Color Codes ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Color Codes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {COLOR_CODES.map((c) => (
            <div key={c.name} className="text-center">
              <div
                className={`h-16 rounded-md shadow-sm ${c.border ? 'border border-gray-300' : ''}`}
                style={{ backgroundColor: c.hex }}
              />
              <p className="mt-2 text-xs font-semibold text-gray-700">{c.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Specification Comparison Table ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">
          <span className="text-blue-800">Metal Doors</span>{' '}
          <span className="text-red-700">Specifications and Applications</span>
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full min-w-160 text-sm text-left border-collapse">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Specification</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Cleanroom Decor</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Commercial Door</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">General Purpose</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Fire Door</th>
              </tr>
            </thead>
            <tbody>
              {SPEC_ROWS.map((row, i) => (
                <tr key={row.label} className={`border-t border-gray-200 ${i % 2 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-4 py-3 font-medium text-gray-700 align-top">{row.label}</td>
                  <td className="px-4 py-3 align-top">
                    {row.cleanroom.map((v) => (
                      <div key={v}>{v}</div>
                    ))}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {row.commercial.map((v) => (
                      <div key={v}>{v}</div>
                    ))}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {row.general.map((v) => (
                      <div key={v}>{v}</div>
                    ))}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {row.fire.map((v) => (
                      <div key={v}>{v}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------- Door Size Range ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Door Size Range</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full min-w-160 text-sm text-left border-collapse">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Door Type</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Dimension</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Cleanroom</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Commercial Door</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">General Purpose</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Fire Door</th>
              </tr>
            </thead>
            <tbody>
              {DOOR_SIZE_RANGE.map((row, i) => (
                <tr key={`${row.type}-${row.dim}`} className={`border-t border-gray-200 ${i > 1 ? 'bg-gray-50' : 'bg-white'}`}>
                  {i % 2 === 0 && (
                    <td className="px-4 py-3 font-medium text-gray-700 align-top" rowSpan={2}>
                      {row.type}
                    </td>
                  )}
                  <td className="px-4 py-3 align-top">{row.dim}</td>
                  {row.values.map((v, idx) => (
                    <td key={idx} className="px-4 py-3 align-top">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------- Shutter Infill Materials ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Shutter Infill Materials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {INFILL_MATERIALS.map((m) => (
            <div key={m.name} className="rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="relative w-full h-[150px]">
                <Image src={m.image} alt={m.name} fill className="object-cover" />
              </div>
              <div className={`${m.color} text-white text-center font-bold py-2`}>{m.name}</div>
              <ul className="list-disc pl-6 py-4 pr-4 space-y-2 text-sm flex-1">
                {m.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Technical Data ---------- */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start px-6 py-8">
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm h-fit">
          <h2 className="sr-only">Specification / Technical Data</h2>
          <table className="w-full text-sm text-left border-collapse">
            <tbody>
              {[
                ['Standard Size', '1000×2100 mm / 1190×2100 mm / 1500×2100 mm and customized sizes also available'],
                ['Type', 'Single Leaf & Double Leaf with Vision Glass'],
                ['Rebate Size', 'Single Rebate 50×58 mm / 80×58 mm / 100×58 mm'],
                ['Standards', 'IS 3614 / BS 476'],
                ['Infill Materials', 'Honeycomb / Rockwool / PUF Fill Insulation'],
                ['Raw Material', 'Galvanized Plain Skin Pass Steel / Stainless Steel'],
                ['Finish', 'Pure Polyester Powder Coated Surface'],
                ['Leaf Thickness', '44 mm'],
                ['Frame Thickness', '50 / 80 / 100 mm'],
                ['Sheet Thickness', '0.8 mm for Leaf & 1.2 mm for Frame'],
                ['Fire Rated Doors', '1.2 mm Thickness for Leaf & 1.2 mm for Frame'],
                ['Fixing', 'Fixing through frame by screws'],
              ].map(([label, value], i) => (
                <tr key={label} className={`border-t border-gray-200 ${i % 2 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-4 py-3 font-medium text-gray-700 align-top whitespace-nowrap">{label}</td>
                  <td className="px-4 py-3 align-top">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px]">
          <Image
            src="/assets/images/metal-doors/tech-data-door.jpg"
            alt="Metal Door Specification"
            fill
            className="object-contain rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* ---------- Features / Why Choose Us / Application Areas ---------- */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 py-8">
        <div>
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Features</h2>
          <ul className="list-disc pl-6 space-y-1">
            {FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-red-700 mb-3">Why Choose Us</h2>
          <ul className="list-disc pl-6 space-y-1">
            {WHY_CHOOSE_US.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Application Areas</h2>
          <ul className="list-disc pl-6 space-y-1">
            {APPLICATION_AREAS.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Need a Metal Door Solution?</h2>
            <p className="text-white/80">
              Reach our doors team directly at{' '}
              <a href="mailto:doorsales@globalenviro.in" className="underline">doorsales@globalenviro.in</a>{' '}
              or{' '}
              <a href="mailto:doorsupport@globalenviro.in" className="underline">doorsupport@globalenviro.in</a>
            </p>
          </div>
          <Link
            href="/RequestQuote"
            className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition whitespace-nowrap"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
