import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';

const SKILLS = [
  { label: 'ML / AI', items: ['PyTorch', 'JAX', 'CNNs', 'Transformers', 'LLM Fine-Tuning', 'LoRA', 'PEFT', 'GRPO', 'PPO', 'XGBoost', 'RAG', 'crewAI'] },
  { label: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Socket.io'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'Flask', 'MongoDB', 'Redis', 'REST APIs', 'JWT'] },
  { label: 'Data & ML Infra', items: ['NumPy', 'Pandas', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Feature Engineering', 'W&B', 'MLflow', 'Model Evaluation'] },
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col gap-1">
    <span
      className="font-black text-[#D7E2EA] leading-none"
      style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
    >
      {value}
    </span>
    <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40">
      {label}
    </span>
  </div>
);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-16 lg:px-24 py-24 sm:py-32 md:py-40 overflow-hidden"
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#D7E2EA 1px, transparent 1px), linear-gradient(90deg, #D7E2EA 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Heading row */}
      <FadeIn y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight mb-16 sm:mb-20 md:mb-24"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About me
        </h2>
      </FadeIn>

      {/* Bio + Photo row */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 lg:gap-28 items-center mb-16 sm:mb-20">

        {/* Left - bio + stats */}
        <div className="flex flex-col gap-12 sm:gap-14">

          {/* Animated divider line */}
          <div className="h-px w-full bg-[#D7E2EA]/10 overflow-hidden">
            <motion.div
              className="h-full bg-[#D7E2EA]/40"
              style={{ scaleX: lineScale, transformOrigin: 'left' }}
            />
          </div>

          <FadeIn delay={0.1} y={30}>
            <p
              className="font-light leading-relaxed text-[#D7E2EA]/80"
              style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)' }}
            >
              I build things that sit at the edge of{' '}
              <span className="text-[#D7E2EA] font-medium">AI research</span> and{' '}
              <span className="text-[#D7E2EA] font-medium">production engineering</span>.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} y={30}>
            <p
              className="font-light leading-relaxed text-[#D7E2EA]/60"
              style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}
            >
              Full-stack engineer and ML researcher based in Delhi. I've shipped
              award-winning systems across healthcare, accessibility, and fintech -
              a skin cancer CNN - authored and published as a{' '}
              <span className="text-[#D7E2EA] font-medium">Best Paper at ICIDSSD '26</span>,
              an accessibility platform that won{' '}
              <span className="text-[#D7E2EA] font-medium">1st place at a national hackathon at DTU</span> in 24 hours,
              and a post-training reasoning pipeline that earned an{' '}
              <span className="text-[#D7E2EA] font-medium">Honorable Mention at Google &amp; Kaggle's Tunix Hackathon</span>.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} y={30}>
            <p
              className="font-light leading-relaxed text-[#D7E2EA]/60"
              style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}
            >
              I care about the whole stack - the math behind the model, the API that serves
              it, and the UI that makes it useful for real people. 
            </p>
          </FadeIn>

          {/* Stats row */}
          <FadeIn delay={0.4} y={20}>
            <div className="grid grid-cols-3 gap-6 pt-2 border-t border-[#D7E2EA]/10">
              <StatItem value="3×" label="Hackathon podiums" />
              <StatItem value="10+" label="Projects shipped" />
              <StatItem value="1st" label="Best Paper · ICIDSSD '26" />
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <ContactButton />
          </FadeIn>
        </div>

        {/* Right - photo with orbital rings */}
        <FadeIn delay={0.2} y={30}>
          <div className="relative flex items-center justify-center" style={{ height: 'clamp(280px, 55vw, 420px)' }}>
            {/* Outer ring - dashed, slow rotate */}
            <div
              className="absolute rounded-full border border-dashed border-[#D7E2EA]/15"
              style={{ width: 'clamp(240px, 55vw, 400px)', height: 'clamp(240px, 55vw, 400px)', animation: 'spinSlow 18s linear infinite' }}
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D7E2EA]/40" />
            </div>
            {/* Middle ring */}
            <div
              className="absolute rounded-full border border-[#D7E2EA]/10"
              style={{ width: 'clamp(200px, 45vw, 330px)', height: 'clamp(200px, 45vw, 330px)', animation: 'spinSlow 12s linear infinite reverse' }}
            >
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D7E2EA]/30" />
              <span className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#D7E2EA]/20" />
            </div>
            {/* Inner glow */}
            <div
              className="absolute rounded-full"
              style={{ width: 'clamp(160px, 35vw, 260px)', height: 'clamp(160px, 35vw, 260px)', background: 'radial-gradient(circle, rgba(215,226,234,0.06) 0%, transparent 70%)' }}
            />
            {/* Photo */}
            <div className="relative rounded-full overflow-hidden border-2 border-[#D7E2EA]/20 shrink-0" style={{ width: 'clamp(140px, 32vw, 240px)', height: 'clamp(140px, 32vw, 240px)' }}>
              <img
                src="/Namit-AboutME.jpeg"
                alt="Namit Rana"
                className="w-full h-full object-cover object-top grayscale"
                draggable={false}
              />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.4)]" />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Skills + Currently - full width below */}
      <FadeIn delay={0.3} y={30}>
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">
          {SKILLS.map((group) => (
            <div key={group.label} className="flex flex-col gap-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D7E2EA]/35">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#D7E2EA]/12 bg-[#D7E2EA]/[0.04] px-3.5 py-1.5 text-sm text-[#D7E2EA]/70 hover:border-[#D7E2EA]/35 hover:text-[#D7E2EA] transition-all duration-200 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Currently */}
        <div className="mx-auto max-w-7xl rounded-2xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.03] p-6 flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D7E2EA]/35">
            Currently
          </span>
          <ul className="flex flex-col sm:flex-row sm:gap-10 gap-2">
            {[
              'Research Assistant at GGSIPU - authoring journal paper on CNN depth & dropout effects in high-accuracy skin lesion classification',
              'Actively seeking ML/AI roles and freelance engagements across machine learning and full-stack web development',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#D7E2EA]/60 leading-relaxed">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#D7E2EA]/30" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </section>
  );
};

export default AboutSection;
