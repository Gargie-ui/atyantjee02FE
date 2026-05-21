import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const regretStories = [
  {
    title: 'Took wrong branch due to pressure',
    description: 'Parents pushed me into ECE at a tier 2 college. After 2 years, I realized I love coding. Switched to self-learning, but lost confidence and 1 year.',
    color: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/30',
  },
  {
    title: 'Chose college blindly after rank',
    description: 'Got rank 45k, chose XYZ college just because it was in the merit list. Placement was poor, campus was bad, regretted every semester.',
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-amber-500/30',
  },
  {
    title: 'Followed friends instead of data',
    description: 'All my friends picked Delhi colleges, so I did too—even though Bangalore colleges matched my rank better. Wrong city = wrong network.',
    color: 'from-amber-500/20 to-red-500/20',
    borderColor: 'border-amber-500/30',
  },
  {
    title: 'Skipped senior advice & wasted time',
    description: 'Ignored seniors who warned me about the branch/college combo. Spent 4 years in a dead-end situation instead of 2 months making the right choice.',
    color: 'from-red-500/20 to-pink-500/20',
    borderColor: 'border-red-500/30',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function RegretSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="bg-[#0B0F2E] px-4 py-20 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center px-2">
          <div className="flex items-center justify-center gap-2">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF6B2B]" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#FF6B2B]">
              Real Stories
            </span>
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight lg:text-4xl">
            Students Like You Made These Mistakes
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-7 sm:leading-8 text-white/70">
            But they don't have to be your mistakes. Learn from thousands who've been through this.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {regretStories.map((story, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group rounded-[1.7rem] border ${story.borderColor} bg-gradient-to-br ${story.color} p-8 backdrop-blur-sm transition-all duration-300`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">{story.title}</h3>
              <p className="mt-4 text-base leading-7 text-white/80">"{story.description}"</p>
              <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
                <div className="h-1 w-1 rounded-full bg-white/40" />
                <span>See how Atyant students avoid this</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 rounded-[2rem] border border-white/10 bg-gradient-to-r from-white/5 to-white/10 p-4 sm:p-8 text-center backdrop-blur-xl"
        >
          <p className="text-xs sm:text-sm md:text-base text-white/80">
            The difference? <span className="font-bold text-white">Real senior Q&A + Data-driven insights</span>
          </p>
          <p className="mt-2 text-xs sm:text-sm text-white/60">
            12,000+ students already trusted Atyant to avoid these mistakes
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
