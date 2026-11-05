"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, RotateCcw } from "lucide-react"
import { useState } from "react"

type Branch = {
  name: string
  company: string
  address: string[]
  phone?: string
  email?: string
}

const branches: Branch[] = [
  {
    name: "OMAN",
    company: "PARKER EXPRESS SHIPPING AND DEVELOPMENT SPC",
    address: [
      "Al Khuwairiyah 4, Plot No. 98, Shop No. 1",
      "Sohar, Oman",
    ],
    phone: "+96877823999",
    email: "om.pricing@parkershipping.com",
  },
  {
    name: "INDIA",
    company: "PAREX SHIPPING INDIA PVT",
    address: ["Thokottu, Mangalore, India"],
    phone: "+917019522524",
    email: "fazal.ahammad@parkershipping.com",
  },
  {
    name: "INDIA – GANDHIDHAM",
    company: "PAREX INDIA PVT BR.",
    address: [
      "Office No. S-09 (Nine), Ward – 12B, 2nd Floor,",
      "Plot No. 228-229 (Sahyog Arcade),",
      "Gandhidham, Kutch",
    ],
    phone: "+918861529997",
    email: "in.parex@parkershipping.com",
  },
  {
    name: "UAE – RAS AL KHAIMAH",
    company: "",
    address: [
      "Office No: 8F-11, 8th Floor, Tower 2,",
      "Rakez Amenity Center Building,",
      "Al Jazeerah Al Hamra, Ras Al Khaimah, UAE",
    ],
    phone: "+971545566727",
    email: "Info@parkershipping.com",
  },
  {
    name: "UAE – HEAD OFFICE",
    company: "",
    address: [
      "Julphar Towers, Avenue Tower,",
      "Office No: 2208, Floor: 22,",
      "Ras Al Khaimah, United Arab Emirates",
    ],
    phone: "+971523528777",
    email: "Info@parkershipping.com",
  },
  {
    name: "UAE – SHARJAH",
    company: "Hamriyah Free Zone Authority (HFZE)",
    address: [
      "P1-ELOB Office No. E-23F-37",
      "Hamriyah Free Zone, Sharjah,",
      "United Arab Emirates",
    ],
    phone: "+971502768283",
    email: "Info@parkershipping.com",
  },
  {
    name: "UAE – AL HAMRA FREE ZONE",
    company: "Al Hamra - Free Zone Customs Building",
    address: [
      "Office No. CT01-17, Customs Building 01",
      "Al Hamra Industrial Free Zone,",
      "Ras Al Khaimah, United Arab Emirates",
    ],
    phone: "+971502769647",
    email: "Info@parkershipping.com",
  },
]

function BranchCard({ branch, index }: { branch: Branch; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      /* perspective must be on the outer wrapper */
      style={{ perspective: "1200px" }}
      className="w-full"
    >
      {/* Fixed height so absolute children have a reference — taller on mobile for content */}
      <div
        className="relative w-full"
        style={{
          height: "clamp(230px, 28vw, 280px)",
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${branch.name} – ${flipped ? "showing contact info, click to flip back" : "showing address, click to reveal contact"}`}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)}
      >
        {/* ── FRONT ── */}
        <article
          className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-white p-4 sm:p-5 shadow-[0_8px_24px_rgba(3,26,31,0.10)] overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <span className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
              <MapPin className="h-4 w-4" strokeWidth={2.5} />
            </span>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold leading-snug tracking-tight text-gray-900 sm:text-lg">
                {branch.name}
              </h3>

              {branch.company ? (
                <p className="mt-1.5 text-sm font-semibold leading-snug text-gray-700 sm:text-base">
                  {branch.company}
                </p>
              ) : null}

              <div className="mt-2 space-y-0.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                {branch.address.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          {(branch.phone || branch.email) && (
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] font-semibold text-cyan-600 select-none">
              <RotateCcw className="h-3 w-3" />
              <span>Tap for contact</span>
            </div>
          )}
        </article>

        {/* ── BACK ── */}
        <article
          className="absolute inset-0 flex flex-col justify-center gap-4 rounded-2xl bg-[#0a2a4a] p-4 sm:p-5 shadow-[0_8px_24px_rgba(3,26,31,0.22)] overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="text-sm font-bold leading-snug text-white sm:text-base">
            {branch.name}
          </h3>

          {branch.phone && (
            <a
              href={`tel:${branch.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-3 group/phone"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 group-hover/phone:bg-cyan-500/40 transition-colors">
                <Phone className="h-4 w-4 text-cyan-300" />
              </span>
              <span className="text-sm font-semibold text-cyan-300 group-hover/phone:text-white transition-colors sm:text-base">
                {branch.phone}
              </span>
            </a>
          )}

          {branch.email && (
            <a
              href={`mailto:${branch.email}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-3 group/mail min-w-0"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 group-hover/mail:bg-cyan-500/40 transition-colors">
                <Mail className="h-4 w-4 text-cyan-300" />
              </span>
              <span className="text-xs text-cyan-200 group-hover/mail:text-white transition-colors truncate sm:text-sm">
                {branch.email}
              </span>
            </a>
          )}

          <p className="flex items-center gap-1 text-[10px] text-cyan-500/60 font-medium select-none">
            <RotateCcw className="h-2.5 w-2.5" />
            Tap to flip back
          </p>
        </article>
      </div>
    </motion.div>
  )
}

export function LocationsSection() {
  return (
    <section
      id="locations"
      className="relative w-full overflow-hidden bg-[#0798B5] py-10 sm:py-14 lg:py-20"
    >
      {/* top accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-[#9BD6E5]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Our Branches
          </h2>
          <p className="mt-2 text-sm text-cyan-100 sm:text-base">
            Tap any card to reveal contact details
          </p>
        </div>

        {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {branches.map((branch, index) => (
            <BranchCard key={branch.name} branch={branch} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
