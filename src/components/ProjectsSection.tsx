import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';
import { PROJECTS, ProjectData } from '../data/projects';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ProjectCard = ({ project, index, total, containerRef }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll progress for THIS card relative to the whole projects scroll range.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  // Cards further down the stack stay full-size; earlier cards scale DOWN
  // as later cards stack on top of them.
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full"
      style={{ top: `${60 + index * 16}px`, height: 'clamp(380px, 75vh, 85vh)' }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-2 sm:gap-4 md:gap-8 rounded-[20px] sm:rounded-[40px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-2.5 sm:p-5 md:p-8 cursor-pointer group hover:border-[#D7E2EA]/80 transition-colors"
        onClick={() => navigate(`/project/${project.id}`)}
      >
          {/* Top row: number + meta + button */}
                  <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-2 sm:gap-4">
                    <div className="flex flex-row items-start gap-2 sm:gap-5 md:gap-10 min-w-0 w-full">
                      <div
                        className="shrink-0 font-black text-[#D7E2EA] leading-none"
                        style={{ fontSize: 'clamp(1.6rem, 7vw, 140px)' }}
                      >
                        {project.number}
                      </div>

                      <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 pt-1 sm:pt-2 md:pt-4 min-w-0 flex-1">
                        <span
                          className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
                          style={{ fontSize: 'clamp(0.6rem, 1.2vw, 1rem)' }}
                        >
                          {project.category}
                        </span>
                        <h3
                          className="font-medium uppercase text-[#D7E2EA] leading-tight"
                          style={{ fontSize: 'clamp(0.9rem, 2.2vw, 2.1rem)' }}
                        >
                          {project.name}
                        </h3>
                        {project.status === 'Honorable Mention' && (
                          <span className="inline-block mt-1 px-2 sm:px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider border border-amber-500/40 w-fit">
                            🏆 Honorable Mention - Google &amp; Kaggle Tunix Hackathon
                          </span>
                        )}
                        {project.status === '1st Place - Vihaan 8.0 Hackathon (IEEE DTU)' && (
                          <span className="inline-block mt-1 px-2 sm:px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider border border-yellow-500/40 w-fit">
                            🥇 1st Place - Vihaan 8.0 Hackathon (IEEE DTU)
                          </span>
                        )}
                        {project.status?.includes('Best Paper Award') && (
                          <span className="inline-block mt-1 px-2 sm:px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider border border-yellow-500/40 w-fit">
                            🏆 Best Paper Award - ICIDSSD '26 · Jamia Hamdard
                          </span>
                        )}
                        {project.status?.includes('3rd Position') && (
                          <span className="inline-block mt-1 px-2 sm:px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider border border-yellow-500/40 w-fit">
                            🏆 3rd Position - Gujarat Hackathon
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 self-start pt-1 sm:pt-2 md:pt-3 w-full sm:w-auto flex gap-2 sm:gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/project/${project.id}`);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-lg bg-[#D7E2EA]/10 text-[#D7E2EA] hover:bg-[#D7E2EA]/20 border border-[#D7E2EA]/20 transition-all text-[10px] sm:text-sm font-medium uppercase tracking-wider group/btn"
                      >
                        <span>More Info</span>
                        <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                      <LiveProjectButton href={project.liveUrl} className="shrink-0 !px-3 sm:!px-8 !py-2 sm:!py-3 !text-[10px] sm:!text-sm" />
                    </div>
                  </div>

        {/* Bottom row: cover image */}
        <div className="flex-1 min-h-0 overflow-hidden rounded-[14px] sm:rounded-[30px] md:rounded-[50px]">
          <img
            src={project.col1Image1}
            alt={`${project.name} cover`}
            className="h-full w-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
      </motion.article>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
