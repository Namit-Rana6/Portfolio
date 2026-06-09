import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

interface Achievement {
  number: string;
  year: string;
  title: string;
  category: string;
  description: string;
}

interface OtherRecognition {
  position: string;
  event: string;
  organiser: string;
  year: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    number: '01',
    year: '2026',
    title: 'Google & Kaggle Tunix Hackathon - Honorable Mention',
    category: 'AI Research · LLM',
    description: 'Built Glassbox - a three-tier post-training pipeline that teaches Gemma 2B to reason transparently using structured XML output. Trained entirely on a free Kaggle TPU. Selected for Honorable Mention from 11,173 entrants and 321 competing teams in a $100,000 prize competition run by Google and Kaggle.',
  },
  {
    number: '02',
    year: '2026',
    title: 'Best Paper Award - ICIDSSD \'26, Jamia Hamdard',
    category: 'Published Research · Conference',
    description: 'First-authored and presented research on CNN depth and dropout effects on skin cancer classification at the 6th International Conference on ICT for Digital, Smart, and Sustainable Development (ICIDSSD \'26), Jamia Hamdard, New Delhi. Paper awarded Best Paper for research contribution, methodology rigour, and clarity of results.',
  },
  {
    number: '03',
    year: '2025',
    title: 'Vihaan 8.0 - 1st Place',
    category: 'Hackathon · IEEE DTU',
    description: 'Won 1st Place at IEEE Delhi Technological University\'s national hackathon Vihaan 8.0 with EduAble - an accessibility-first education platform for learners with visual, cognitive, and communication disabilities. Built in 24 hours, selected from 400+ competing teams.',
  },
  {
    number: '04',
    year: '2025',
    title: 'Hack with Gujarat - 3rd Position',
    category: 'Hackathon · Accessibility',
    description: 'Secured 3rd Position with MindBoard - a hands-free communication system for people with ALS, Cerebral Palsy, or spinal injuries. Users communicate using only nose movements tracked by a standard webcam. No hardware, no eye trackers.',
  },
  {
    number: '05',
    year: '2025',
    title: 'Hacktoberfest - Super Contributor',
    category: 'Open Source',
    description: 'Earned Super Contributor recognition by merging 7 pull requests across 7 open-source projects - ML frameworks, accessibility tools, and developer tooling. Mentored contributors on code quality and testing practices.',
  },
  {
    number: '06',
    year: '2025',
    title: 'Open Source Connect India - Core Organiser',
    category: 'Community Leadership',
    description: 'Core organiser at Open Source Connect India, a nationwide event for India\'s open-source ecosystem. Designed and led technical sessions on LLM deployment, ML explainability, and accessibility-first development.',
  },
];

const OTHER_RECOGNITIONS: OtherRecognition[] = [
  { position: 'Top 10 Finalist', event: 'GeekVerse Hackathon', organiser: 'GGSIPU', year: '2025' },
  { position: 'Top 30 Finalist', event: 'Industrial Ideathon', organiser: 'Delhi Government', year: '2025' },
  { position: 'Top 15 Finalist', event: 'Hack Genesis 25', organiser: 'Christ University', year: '2025' },
  { position: 'Top 20 Finalist', event: 'CodeSynthesis', organiser: 'GTB 4th Centenary Engineering College, Delhi', year: '2025' },
  { position: 'Top 10 Finalist', event: 'Techgenesis 2.0', organiser: 'Bharati Vidyapeeth', year: '2025' },
  { position: 'Top 20 Finalist', event: '24-Hour Hackathon', organiser: 'IIIT Delhi', year: '2025' },
  { position: 'Grand Finalist', event: 'Hackground India 2K25', organiser: 'TechVerse Nexus · ThoughtWorks, Gurugram', year: '2025' },
  { position: 'Top 40 Finalist', event: 'HackWithIndia Hackathon', organiser: 'HackWithIndia', year: '2025' },
];

const AchievementCard = ({ achievement, index }: { achievement: Achievement; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y }}
      className="relative flex gap-6 sm:gap-8 md:gap-12 pb-12 sm:pb-16 md:pb-20"
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-[#D7E2EA] border-2 border-[#D7E2EA] mb-4 sm:mb-6 relative z-10" />
        {index !== ACHIEVEMENTS.length - 1 && (
          <div className="w-1 flex-1 bg-gradient-to-b from-[#D7E2EA] to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3 sm:mb-4">
          <h3
            className="font-black text-[#D7E2EA] leading-tight"
            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}
          >
            {achievement.title}
          </h3>
          <span className="inline-block px-3 py-1 rounded-full bg-[#D7E2EA] text-[#0C0C0C] text-xs sm:text-sm font-medium uppercase tracking-wider w-fit shrink-0">
            {achievement.year}
          </span>
        </div>

        <span className="inline-block text-xs sm:text-sm font-light uppercase tracking-widest text-[#D7E2EA]/50 mb-2 sm:mb-3">
          {achievement.category}
        </span>

        <p
          className="font-light leading-relaxed text-[#D7E2EA]/80 max-w-2xl"
          style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)' }}
        >
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
};

const AchievementsSection = () => {
  return (
    <section
      id="achievements"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="text-center font-black uppercase text-[#D7E2EA] mb-16 sm:mb-20 md:mb-28 leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Achievements
        </h2>
      </FadeIn>

      {/* Main timeline */}
      <div className="mx-auto max-w-3xl mb-20 sm:mb-24 md:mb-28">
        {ACHIEVEMENTS.map((achievement, i) => (
          <FadeIn key={achievement.number} delay={i * 0.08} y={30}>
            <AchievementCard achievement={achievement} index={i} />
          </FadeIn>
        ))}
      </div>

      {/* Other recognitions table */}
      <FadeIn y={30} delay={0.1}>
        <div className="mx-auto max-w-3xl">
          <p className="font-black uppercase tracking-tight text-[#D7E2EA]/50 mb-6"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            Other Finalist Recognitions
          </p>
          <div className="flex flex-col divide-y divide-[#D7E2EA]/8">
            {OTHER_RECOGNITIONS.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 py-4 group"
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <span className="shrink-0 text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-medium w-28 sm:w-36">
                    {item.position}
                  </span>
                  <span className="font-medium text-[#D7E2EA]/70 text-sm sm:text-base truncate group-hover:text-[#D7E2EA] transition-colors">
                    {item.event}
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                  <span className="hidden sm:block text-xs uppercase tracking-widest text-[#D7E2EA]/30">
                    {item.organiser}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/30">
                    {item.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default AchievementsSection;
