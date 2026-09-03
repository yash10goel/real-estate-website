import { team } from "../../static-data/team";
import { motion } from "framer-motion";
import {
  Linkedin,
  UserRound,
  Building2,
  CalendarDays,
  Award,
} from "lucide-react";

export default function TeamSection() {
  const getValue = (member, key, fallback = "—") =>
    member?.[key] || fallback;

  return (
    <section className="relative overflow-hidden bg-[#07101d] py-16 md:py-20">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
          }}
        />

        {/* Soft golden glow */}
        <div className="absolute left-1/2 top-[15%] h-[450px] w-[650px] -translate-x-1/2 rounded-full bg-[#d99b18]/[0.035] blur-[130px]" />

        {/* Side glow */}
        <div className="absolute -left-40 top-1/2 h-[350px] w-[350px] rounded-full bg-[#d99b18]/[0.025] blur-[100px]" />

        <div className="absolute -right-40 top-1/3 h-[350px] w-[350px] rounded-full bg-[#d99b18]/[0.025] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        {/* =========================================================
            SECTION HEADER
        ========================================================= */}
        <div className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex items-center justify-center gap-4"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#dca21a]" />

            <span className="text-[10px] font-semibold tracking-[0.28em] text-[#e6aa20] uppercase">
              Our Team
            </span>

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#dca21a]" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="
              font-heading
              text-4xl
              font-medium
              leading-[1.05]
              tracking-tight
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-[64px]
            "
          >
            Meet Our{" "}
            <span className="bg-gradient-to-r from-[#f8c447] via-[#e8a91d] to-[#c88710] bg-clip-text text-transparent">
              Experts
            </span>
          </motion.h2>

          {/* Gold divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 60, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 h-[2px] bg-[#dca21a]"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-sm
              leading-6
              text-white/55
              sm:text-base
              sm:leading-7
            "
          >
            A passionate team of professionals committed to delivering
            exceptional construction and real estate solutions with
            innovation, quality and trust.
          </motion.p>
        </div>

        {/* =========================================================
            TEAM GRID
        ========================================================= */}
        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            xl:grid-cols-3
            xl:gap-6
          "
        >
          {team.map((member, index) => {
            const position = getValue(
              member,
              "position",
              getValue(member, "role", "Team Member")
            );

            const company = getValue(member, "company", "RKGC Group");

            const experience = getValue(
              member,
              "experience",
              member?.yearsOfExperience
                ? `${member.yearsOfExperience}+ Years`
                : "—"
            );

            const focus = getValue(
              member,
              "focus",
              "Excellence • Innovation • Delivery"
            );

            const description = getValue(
              member,
              "description",
              "Dedicated to excellence, innovation and delivering outstanding project results through expertise, teamwork and commitment."
            );

            return (
              <motion.article
                key={member.id || `${member.name}-${index}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -7 }}
                className="group relative h-full"
              >
                {/* =====================================================
                    CARD
                ===================================================== */}
                <div
                  className="
                    relative
                    h-full
                    min-h-[520px]
                    overflow-hidden
                    rounded-[20px]
                    border
                    border-[#c88d17]/75
                    bg-[#09131f]
                    shadow-[0_20px_55px_rgba(0,0,0,0.30)]
                    transition-all
                    duration-500
                    group-hover:border-[#f0b52a]
                    group-hover:shadow-[0_25px_70px_rgba(217,154,22,0.13)]
                  "
                >
                  {/* =================================================
                      TOP LEFT GOLD CORNER
                  ================================================= */}
                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      z-10
                      h-[58px]
                      w-[58px]
                      bg-gradient-to-br
                      from-[#f0b52a]
                      via-[#bd8010]
                      to-transparent
                    "
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 0 100%)",
                    }}
                  />

                  {/* Corner inner line */}
                  <div className="absolute left-0 top-[57px] z-10 h-px w-14 bg-[#dca21a]/50" />

                  {/* =================================================
                      TOP RIGHT DOT PATTERN
                  ================================================= */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-5
                      top-5
                      h-[70px]
                      w-[100px]
                      opacity-50
                    "
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(220,162,26,0.75) 1.2px, transparent 1.2px)",
                      backgroundSize: "9px 9px",
                      maskImage:
                        "linear-gradient(to bottom left, black, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom left, black, transparent)",
                    }}
                  />

                  {/* Large background number */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-6
                      top-16
                      font-heading
                      text-[70px]
                      font-semibold
                      leading-none
                      text-white/[0.025]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================= */}
                  <div className="relative flex h-full flex-col px-5 pb-5 pt-7 sm:px-6">
                    {/* =================================================
                        PROFILE IMAGE
                    ================================================= */}
                    <div className="flex justify-center">
                      <div
                        className="
                          relative
                          h-[125px]
                          w-[125px]
                          rounded-full
                          p-[4px]
                          bg-gradient-to-br
                          from-[#fff0ad]
                          via-[#e5a51d]
                          to-[#8a5b0b]
                          shadow-[0_0_35px_rgba(229,165,29,0.18)]
                          transition-all
                          duration-500
                          group-hover:shadow-[0_0_50px_rgba(229,165,29,0.32)]
                        "
                      >
                        {/* Inner ring */}
                        <div className="h-full w-full rounded-full bg-[#07101d] p-[3px]">
                          <img
                            src={member.image}
                            alt={`${member.name} - ${position}`}
                            loading={index < 3 ? "eager" : "lazy"}
                            className="
                              h-full
                              w-full
                              rounded-full
                              object-cover
                              transition-transform
                              duration-700
                              group-hover:scale-[1.04]
                            "
                          />
                        </div>

                        {/* Golden glow */}
                        <div className="pointer-events-none absolute inset-[-7px] -z-10 rounded-full bg-[#e5a51d]/10 blur-xl" />
                      </div>
                    </div>

                    {/* =================================================
                        NAME + ROLE
                    ================================================= */}
                    <div className="mt-5 text-center">
                      <h3
                        className="
                          font-heading
                          text-[23px]
                          font-medium
                          leading-tight
                          tracking-tight
                          text-white
                        "
                      >
                        {member.name}
                      </h3>

                      <p
                        className="
                          mt-1.5
                          text-[10px]
                          font-semibold
                          tracking-[0.17em]
                          text-[#e6aa20]
                          uppercase
                        "
                      >
                        {member.role || position}
                      </p>

                      <div className="mx-auto mt-3 h-[2px] w-10 bg-[#dca21a] transition-all duration-500 group-hover:w-14" />
                    </div>

                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}
                    <p
                      className="
                        mx-auto
                        mt-4
                        max-w-[310px]
                        text-center
                        text-[12px]
                        leading-5
                        text-white/55
                      "
                    >
                      {description}
                    </p>

                    {/* =================================================
                        INFORMATION GRID
                    ================================================= */}
                    <div className="mt-5 border-y border-[#dca21a]/20">
                      <div className="grid grid-cols-2">
                        {/* Position */}
                        <InfoItem
                          icon={UserRound}
                          label="Position"
                          value={position}
                          borderRight
                        />

                        {/* Company */}
                        <InfoItem
                          icon={Building2}
                          label="Company"
                          value={company}
                        />

                        {/* Experience */}
                        <InfoItem
                          icon={CalendarDays}
                          label="Experience"
                          value={experience}
                          borderRight
                          borderTop
                        />

                        {/* Focus */}
                        <InfoItem
                          icon={Award}
                          label="Focus"
                          value={focus}
                          borderTop
                        />
                      </div>
                    </div>

                    {/* =================================================
                        LINKEDIN
                    ================================================= */}
                    <div className="mt-auto pt-5">
                      <div className="mb-4 h-px bg-[#dca21a]/20" />

                      <div className="flex items-center justify-center">
                        <a
                          href={member.linkedin || "#"}
                          target={
                            member.linkedin ? "_blank" : undefined
                          }
                          rel={
                            member.linkedin
                              ? "noopener noreferrer"
                              : undefined
                          }
                          aria-label={`${member.name} on LinkedIn`}
                          onClick={(e) => {
                            if (!member.linkedin) {
                              e.preventDefault();
                            }
                          }}
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#dca21a]
                            bg-[#0d1723]
                            text-[#e6aa20]
                            transition-all
                            duration-300
                            hover:bg-[#e6aa20]
                            hover:text-[#07101d]
                            hover:shadow-[0_0_25px_rgba(230,170,32,0.25)]
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[#e6aa20]
                          "
                        >
                          <Linkedin size={18} strokeWidth={1.8} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      BOTTOM RIGHT GOLD CORNER
                  ================================================= */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      bottom-0
                      right-0
                      h-[48px]
                      w-[48px]
                      bg-gradient-to-tl
                      from-[#e5a51d]
                      via-[#9c680d]
                      to-transparent
                      opacity-80
                    "
                    style={{
                      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                    }}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   INFO ITEM
============================================================= */

function InfoItem({
  icon: Icon,
  label,
  value,
  borderRight = false,
  borderTop = false,
}) {
  return (
    <div
      className={`
        flex
        min-h-[62px]
        items-center
        gap-2.5
        px-2.5
        py-3
        sm:px-3
        ${borderRight ? "border-r border-[#dca21a]/20" : ""}
        ${borderTop ? "border-t border-[#dca21a]/20" : ""}
      `}
    >
      {/* Icon */}
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[#dca21a]
          bg-[#0d1723]
          text-[#e5a51d]
        "
      >
        <Icon size={15} strokeWidth={1.6} />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p
          className="
            text-[8px]
            font-semibold
            tracking-[0.12em]
            text-[#e5a51d]
            uppercase
          "
        >
          {label}
        </p>

        <p
          title={value}
          className="
            mt-0.5
            truncate
            text-[10px]
            leading-4
            text-white/75
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}