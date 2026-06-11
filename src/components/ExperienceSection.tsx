import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

interface Experience {
  number: string;
  period: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
}

const EXPERIENCES: Experience[] = [
  {
    number: '01',
    period: 'Aug 2025 - Present',
    role: 'Research Assistant',
    company: 'GGSIPU (Prof. Raj Kumar Sharma)',
    description: 'Leading empirical CNN architecture study on 5,600+ dermoscopic images for skin cancer classification. Achieving 83% accuracy and AUC 0.90 with optimal 3-layer CNN. First-authored paper won Best Paper Award at ICIDSSD \'26 (Jamia Hamdard). Currently writing journal paper on depth-regularization trade-offs in medical imaging.',
    highlights: ['5,600+ Images', '83% Accuracy', 'AUC 0.90', 'Best Paper Award 2026'],
  },
  {
    number: '02',
    period: 'May 2026',
    role: 'Freelance Tech Lead',
    company: 'Independent & WomenHub',
    description: 'Building production-grade full-stack applications and AI systems. Co-founder of WomenHub-premium laces, tailoring fabrics, threads, and designer buttons for boutiques, tailors, and home sewists. Tech lead for e-commerce platform development.',
    highlights: ['Full Stack MERN', 'E-Commerce Platform', 'AI Integration', 'Production Ready'],
  },
  {
    number: '03',
    period: 'Sep 2025 - Oct 2025',
    role: 'Data Analyst Intern',
    company: 'Vodafone Idea Foundation × AICTE',
    description: 'Analyzed 5-10 telecom and user behavior datasets using Python (Pandas, NumPy, Matplotlib). Applied EDA and data wrangling techniques on large-scale VOIS datasets identifying patterns in customer and network usage. Delivered structured analytical reports.',
    highlights: ['EDA & Wrangling', 'Telecom Analytics', 'Python Stack', 'Structured Reporting'],
  },
  {
    number: '04',
    period: 'Oct 2025',
    role: 'Open Source Contributor',
    company: 'Hacktoberfest',
    description: 'Contributed to 7 open-source projects with 7 merged pull requests during Hacktoberfest 2025. Focused on collaborative development, code review, and community-driven software engineering. Recognised as Super Contributor.',
    highlights: ['7 PRs Merged', '7 Projects', 'Super Contributor', 'Hacktoberfest 2025'],
  },
  {
    number: '05',
    period: 'Feb 2025 - Apr 2025',
    role: 'Technology Research Intern',
    company: 'To-Let Globe',
    description: 'Evaluated and benchmarked 10+ LLMs (GPT, Gemini, LLaMA, DeepSeek) across cost, performance, fine-tunability, and deployment feasibility. Conducted ML experiments on company datasets analyzing trade-offs between open-source and proprietary models for production chatbot recommendation.',
    highlights: ['10+ LLMs', 'Model Benchmarking', 'Deployment Analysis', 'Production Strategy'],
  },
  {
    number: '06',
    period: 'Jun 2024 - Dec 2024',
    role: 'Technology Intern',
    company: 'Sam Monitoring Solutions',
    description: 'Independently benchmarked multiple ML models (Decision Trees, CNNs, variants) identifying and resolving a critical data leakage issue that improved pipeline reliability. Proposed and validated optimization strategies across client projects.',
    highlights: ['Data Leakage Detection', 'Model Benchmarking', 'Pipeline Quality', 'Optimization'],
  },
];

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [-40, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x }}
      className="mb-12 sm:mb-16 md:mb-20"
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12">
        {/* Left side: Period & Number */}
        <div className="shrink-0 flex flex-row sm:flex-col gap-3 sm:gap-2 items-start">
          <div
            className="font-black text-[#0C0C0C] leading-none"
            style={{ fontSize: 'clamp(2rem, 6vw, 120px)' }}
          >
            {experience.number}
          </div>
          <div className="inline-block px-2.5 py-1 rounded-full bg-[#0C0C0C] text-white text-[10px] sm:text-sm font-medium uppercase tracking-wider whitespace-nowrap">
            {experience.period}
          </div>
        </div>

        {/* Right side: Content */}
        <div className="flex-1">
          <div className="mb-4 sm:mb-6">
            <h3
              className="font-black text-[#0C0C0C] leading-tight mb-1"
              style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}
            >
              {experience.role}
            </h3>
            <p
              className="font-light uppercase tracking-widest text-[#0C0C0C]/60"
              style={{ fontSize: 'clamp(0.75rem, 1vw, 0.95rem)' }}
            >
              {experience.company}
            </p>
          </div>

          <p
            className="font-light leading-relaxed text-[#0C0C0C] max-w-2xl mb-5 sm:mb-6"
            style={{ fontSize: 'clamp(0.9rem, 1.05vw, 1.1rem)' }}
          >
            {experience.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {experience.highlights.map((highlight, i) => (
              <span
                key={i}
                className="px-3 py-2 rounded-lg bg-[#0C0C0C]/5 text-[#0C0C0C] text-xs sm:text-sm font-medium uppercase tracking-wider border border-[#0C0C0C]/10 hover:border-[#0C0C0C]/30 transition-colors"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
      {index !== EXPERIENCES.length - 1 && (
        <div className="hidden sm:block h-px bg-gradient-to-r from-[#0C0C0C]/10 via-[#0C0C0C]/5 to-transparent mt-12 md:mt-16" />
      )}
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative w-full bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="text-center font-black uppercase text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28 leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-4xl">
        {EXPERIENCES.map((experience, i) => (
          <FadeIn key={experience.number} delay={i * 0.1} y={30}>
            <ExperienceCard experience={experience} index={i} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
