import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const regretStories = [
  {
    title: 'Took wrong branch due to pressure',
    description:
      'Parents pushed me into ECE at a tier 2 college. After 2 years, I realized I love coding.',
    color: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-300',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
  },
  {
    title: 'Choose college blindly after rank',
    description:
      'Got rank 45k, chose XYZ college just because it was in the merit list.',
    color: 'from-amber-500/20 to-red-500/20',
    borderColor: 'border-amber-300',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
  },
  {
    title: 'Followed friends instead of data',
    description:
      'All my friends picked Delhi colleges, so I did too instead of choosing wisely.',
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-300',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    title: 'Skipped senior advice & wasted time',
    description:
      'Ignored seniors who warned me about the branch and college combo.',
    color: 'from-rose-500/20 to-pink-500/20',
    borderColor: 'border-rose-300',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },

  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

export default function RegretSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8"
    >

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="flex items-center justify-center gap-2">

            <AlertCircle className="h-5 w-5 text-[#FF6B2B]" />

            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FF6B2B] sm:text-sm">
              Real Stories
            </span>

          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0B0F2E] sm:text-4xl lg:text-5xl">
            Students Like You
            <br />
            Made These Mistakes
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#0B0F2E]/70 sm:text-base">
            But they don&apos;t have to be your mistakes.
            Learn from students who&apos;ve already gone through this confusion.
          </p>

        </div>

        {/* STORY CARDS */}
        <motion.div
          variants={containerVariants}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >

          {regretStories.map((story, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{
                y: -6,
                scale: 1.015,
              }}
              className={`
                group
                relative
                overflow-hidden
                rounded-[1.7rem]
                border
                ${story.borderColor}
                bg-gradient-to-br
                ${story.color}
                p-7
                shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                transition-all
                duration-300
              `}
            >

              {/* Soft Glow */}
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-white/20 blur-3xl" />

              {/* Big Number */}
              <div className="absolute -right-4 -top-5 text-[90px] font-black text-[#0B0F2E]/5">
                0{idx + 1}
              </div>

              {/* ICON */}
              <div
                className={`
                  relative
                  z-10
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  ${story.iconBg}
                  ${story.iconColor}
                `}
              >
                <AlertCircle className="h-7 w-7" />
              </div>

              {/* TITLE */}
              <h3 className="relative z-10 mt-6 text-2xl font-black leading-tight text-[#0B0F2E]">
                {story.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="relative z-10 mt-4 text-base leading-7 text-[#0B0F2E]/75">
                “{story.description}”
              </p>

              {/* FOOTER */}
              <div className="relative z-10 mt-6 flex items-center gap-2 text-sm text-[#0B0F2E]/55">

                <div className="h-1.5 w-1.5 rounded-full bg-[#0B0F2E]/30" />

                <span>
                  See how Atyant students avoid this
                </span>

              </div>

            </motion.div>
          ))}

        </motion.div>

        {/* BOTTOM CTA */}
        <motion.div
          variants={itemVariants}
          className="
            mt-12
            rounded-[1.8rem]
            border
            border-black/5
            bg-white
            p-6
            text-center
            shadow-[0_8px_30px_rgba(0,0,0,0.05)]
          "
        >

          <p className="text-sm text-[#0B0F2E]/80 sm:text-base">

            The difference?

            <span className="font-bold text-[#0B0F2E]">
              {' '}
              Real senior Q&A + Data-driven insights
            </span>

          </p>

          <p className="mt-2 text-xs text-[#0B0F2E]/55 sm:text-sm">
            12,000+ students already trusted Atyant
          </p>

        </motion.div>

      </div>
    </motion.section>
  );
}
