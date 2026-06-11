import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import FadeIn from './FadeIn';
import { PROJECTS } from '../data/projects';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();2
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === projectId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project
    ? [...new Set([project.col1Image1, project.col1Image2, project.col2Image, ...(project.col3Image ? [project.col3Image] : [])])]
    : [];

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-[#0C0C0C] flex items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-[#D7E2EA] text-2xl sm:text-4xl font-black mb-4">
            Project not found
          </h1>
          <button
            onClick={() => navigate('/#projects')}
            className="px-6 py-3 rounded-lg bg-[#D7E2EA] text-[#0C0C0C] font-medium hover:bg-[#D7E2EA]/90 transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="relative w-full bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      {/* Header */}
      <motion.div
        className="relative w-full min-h-[60vh] flex items-center justify-center px-5 sm:px-8 md:px-10 pt-20 pb-12"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        style={{ opacity: 1, transform: 'none' }}
      >
        <button
          onClick={() => navigate('/#projects')}
          className="absolute top-8 left-5 sm:left-8 md:left-10 flex items-center gap-2 text-[#D7E2EA] hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-light uppercase tracking-wider">Back</span>
        </button>

        <motion.div
          key={project.id}
          className="max-w-5xl w-full mt-8 sm:mt-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3 items-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[#D7E2EA]/10 text-[#D7E2EA] text-xs sm:text-sm font-light uppercase tracking-widest border border-[#D7E2EA]/20">
              {project.category}
            </span>
          </div>

          {project.status?.includes('Best Paper Award') ? (
            <h1
              className="text-[#D7E2EA] font-black uppercase leading-tight mb-4 sm:mb-6"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.5rem)' }}
            >
              Research Paper - First Author
            </h1>
          ) : (
            <h1
              className="text-[#D7E2EA] font-black uppercase leading-tight mb-4 sm:mb-6"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 80px)' }}
            >
              {project.name}
            </h1>
          )}

          <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
              <span className="text-[#D7E2EA]/60 font-light text-sm uppercase tracking-wider">
                {project.year}
              </span>
              {project.status === 'Honorable Mention' && (
                <span className="inline-block px-2.5 sm:px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] sm:text-xs font-semibold tracking-wide border border-amber-500/40">
                  🏆 Honorable Mention - Google &amp; Kaggle Tunix Hackathon
                </span>
              )}
              {project.status === '1st Place - Vihaan 8.0 Hackathon (IEEE DTU)' && (
                <span className="inline-block px-2.5 sm:px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-300 text-[10px] sm:text-xs font-semibold tracking-wide border border-yellow-500/40">
                  🥇 1st Place - Vihaan 8.0 Hackathon (IEEE DTU)
                </span>
              )}
              {project.status?.includes('Best Paper Award') && (
                <span className="inline-block px-2.5 sm:px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-300 text-[10px] sm:text-xs font-semibold tracking-wide border border-yellow-500/40">
                  🏆 Best Paper Award - ICIDSSD '26 · Jamia Hamdard
                </span>
              )}
              {project.status?.includes('3rd Position') && (
                <span className="inline-block px-2.5 sm:px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-300 text-[10px] sm:text-xs font-semibold tracking-wide border border-yellow-500/40">
                  🏆 3rd Position - Gujarat Hackathon
                </span>
              )}
              {project.status !== 'Honorable Mention' && project.status !== '1st Place - Vihaan 8.0 Hackathon (IEEE DTU)' && !project.status?.includes('Best Paper Award') && !project.status?.includes('3rd Position') && (
                <span className="inline-block px-2.5 sm:px-3 py-1 rounded-lg bg-[#D7E2EA]/10 text-[#D7E2EA] text-[10px] sm:text-xs font-medium uppercase tracking-wider border border-[#D7E2EA]/20">
                  {project.status}
                </span>
              )}
            </div>
        </motion.div>
      </motion.div>

      {/* Gallery Images - Auto Carousel */}
      <motion.div
        className="relative mx-auto max-w-6xl px-5 sm:px-8 md:px-10 pb-20 sm:pb-24"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ opacity: 1, transform: 'none' }}
      >
        <div className="relative group">
          <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] border border-[#D7E2EA]/10 bg-[#141418]" style={{ aspectRatio: '16/9' }}>
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`${project.name} image ${currentImageIndex + 1}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ opacity: 1, transform: 'none' }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 text-[#D7E2EA] opacity-0 group-hover:opacity-100 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 text-[#D7E2EA] opacity-0 group-hover:opacity-100 transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentImageIndex
                    ? 'bg-[#D7E2EA] w-6'
                    : 'bg-[#D7E2EA]/30 hover:bg-[#D7E2EA]/60'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* YouTube Video - Optional */}
      {project.videoUrl && (
        <motion.div
          className="relative mx-auto max-w-6xl px-5 sm:px-8 md:px-10 pb-20 sm:pb-24"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ opacity: 1, transform: 'none' }}
        >
          <div className="mb-6 sm:mb-8">
            <h3 className="text-[#D7E2EA] font-semibold text-sm uppercase tracking-widest mb-4">Project Demo</h3>
          </div>
          <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] border border-[#D7E2EA]/10 bg-[#141418]" style={{ aspectRatio: '16/9' }}>
            <iframe
              width="100%"
              height="100%"
              src={project.videoUrl}
              title={`${project.name} Demo`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </motion.div>
      )}

      {/* Project Videos - Optional */}
      {project.driveUrl && (
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 md:px-10 pb-20 sm:pb-24">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-[#D7E2EA] font-semibold text-sm uppercase tracking-widest mb-4">Project Videos</h3>
          </div>
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ opacity: 1, transform: 'none' }}
          >
            <a
              href={project.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D7E2EA]/10 border border-[#D7E2EA]/30 hover:border-[#D7E2EA]/60 text-[#D7E2EA] font-medium hover:bg-[#D7E2EA]/20 transition-all group"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Drive Link
              <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      )}

      {/* Content Sections */}
      <motion.div
        className="relative mx-auto max-w-5xl px-5 sm:px-8 md:px-10 pb-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Overview */}
        <motion.section variants={itemVariants} className="mb-20 sm:mb-28">
          <h2
            className="text-[#D7E2EA] font-black uppercase leading-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2rem, 6vw, 48px)' }}
          >
            Overview
          </h2>
          <p
            className="font-light leading-relaxed text-[#D7E2EA] max-w-3xl"
            style={{ fontSize: 'clamp(1rem, 1.1vw, 1.2rem)' }}
          >
            {project.overview}
          </p>
        </motion.section>

        {/* Challenge */}
        <motion.section variants={itemVariants} className="mb-20 sm:mb-28">
          <h2
            className="text-[#D7E2EA] font-black uppercase leading-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2rem, 6vw, 48px)' }}
          >
            Challenge
          </h2>
          <p
            className="font-light leading-relaxed text-[#D7E2EA]/90 max-w-3xl mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(1rem, 1.1vw, 1.2rem)' }}
          >
            {project.challenge}
          </p>
          {project.challengeDetails && project.challengeDetails.length > 0 && (
            <div className="space-y-4 sm:space-y-5">
              {project.challengeDetails.map((detail, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="pl-4 sm:pl-6 border-l-2 border-[#D7E2EA]/30 hover:border-[#D7E2EA]/60 transition-colors"
                >
                  <p
                    className="font-light leading-relaxed text-[#D7E2EA]/80"
                    style={{ fontSize: 'clamp(0.95rem, 1vw, 1.1rem)' }}
                  >
                    {detail}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Solution */}
        <motion.section variants={itemVariants} className="mb-20 sm:mb-28">
          <h2
            className="text-[#D7E2EA] font-black uppercase leading-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2rem, 6vw, 48px)' }}
          >
            Solution
          </h2>
          <p
            className="font-light leading-relaxed text-[#D7E2EA]/90 max-w-3xl mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(1rem, 1.1vw, 1.2rem)' }}
          >
            {project.solution}
          </p>
          {project.solutionDetails && project.solutionDetails.length > 0 && (
            <div className="space-y-4 sm:space-y-5">
              {project.solutionDetails.map((detail, i) => {
                const tierMatch = detail.match(/^(.*?):\s(.*)$/);
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="p-4 sm:p-5 rounded-lg bg-[#D7E2EA]/5 border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 transition-all"
                  >
                    {tierMatch ? (
                      <>
                        <p className="font-semibold text-[#D7E2EA] mb-2 text-sm uppercase tracking-wider">
                          {tierMatch[1]}
                        </p>
                        <p
                          className="font-light leading-relaxed text-[#D7E2EA]/80"
                          style={{ fontSize: 'clamp(0.95rem, 1vw, 1.1rem)' }}
                        >
                          {tierMatch[2]}
                        </p>
                      </>
                    ) : (
                      <p
                        className="font-light leading-relaxed text-[#D7E2EA]/80"
                        style={{ fontSize: 'clamp(0.95rem, 1vw, 1.1rem)' }}
                      >
                        {detail}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* Impact & Results */}
        <motion.section variants={itemVariants} className="mb-20 sm:mb-28">
          <h2
            className="text-[#D7E2EA] font-black uppercase leading-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2rem, 6vw, 48px)' }}
          >
            Impact & Results
          </h2>
          <p
            className="font-light leading-relaxed text-[#D7E2EA]/90 max-w-3xl mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(1rem, 1.1vw, 1.2rem)' }}
          >
            {project.impact}
          </p>
          {project.impactDetails && project.impactDetails.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
              {project.impactDetails.map((detail, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-4 sm:p-5 rounded-lg bg-[#D7E2EA]/5 border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 transition-all"
                >
                  <p
                    className="font-light leading-relaxed text-[#D7E2EA]/80"
                    style={{ fontSize: 'clamp(0.95rem, 1vw, 1.1rem)' }}
                  >
                    {detail}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Methodology */}
        {project.methodology && (
          <motion.section variants={itemVariants} className="mb-20 sm:mb-28">
            <h2
              className="text-[#D7E2EA] font-black uppercase leading-tight mb-6 sm:mb-8"
              style={{ fontSize: 'clamp(2rem, 6vw, 48px)' }}
            >
              Methodology
            </h2>
            <div className="space-y-6">
              {project.methodology.split('. ').map((section, i, arr) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-4 sm:p-6 rounded-lg bg-[#D7E2EA]/5 border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/30 transition-all"
                >
                  <p
                    className="font-light leading-relaxed text-[#D7E2EA]/80"
                    style={{ fontSize: 'clamp(0.95rem, 1vw, 1.1rem)' }}
                  >
                    {section}{i < arr.length - 1 ? '.' : ''}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Data Engineering */}
        {project.dataEngineering && (
          <motion.section variants={itemVariants} className="mb-20 sm:mb-28">
            <h2
              className="text-[#D7E2EA] font-black uppercase leading-tight mb-6 sm:mb-8"
              style={{ fontSize: 'clamp(2rem, 6vw, 48px)' }}
            >
              Data Engineering
            </h2>
            <p
              className="font-light leading-relaxed text-[#D7E2EA]/90 max-w-3xl"
              style={{ fontSize: 'clamp(1rem, 1.1vw, 1.2rem)' }}
            >
              {project.dataEngineering}
            </p>
          </motion.section>
        )}

        {/* Results */}
        {project.results && (
          <motion.section variants={itemVariants} className="mb-20 sm:mb-28">
            <h2
              className="text-[#D7E2EA] font-black uppercase leading-tight mb-6 sm:mb-8"
              style={{ fontSize: 'clamp(2rem, 6vw, 48px)' }}
            >
              Results
            </h2>
            <p
              className="font-light leading-relaxed text-[#D7E2EA]/90 max-w-3xl"
              style={{ fontSize: 'clamp(1rem, 1.1vw, 1.2rem)' }}
            >
              {project.results}
            </p>
          </motion.section>
        )}

        {/* Limitations */}
        {project.limitations && project.limitations.length > 0 && (
          <motion.section variants={itemVariants} className="mb-20 sm:mb-28">
            <h2
              className="text-[#D7E2EA] font-black uppercase leading-tight mb-6 sm:mb-8"
              style={{ fontSize: 'clamp(2rem, 6vw, 48px)' }}
            >
              Limitations & Trade-offs
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {project.limitations.map((limitation, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="pl-4 sm:pl-6 border-l-2 border-amber-500/30 hover:border-amber-500/60 transition-colors"
                >
                  <p
                    className="font-light leading-relaxed text-[#D7E2EA]/80"
                    style={{ fontSize: 'clamp(0.95rem, 1vw, 1.1rem)' }}
                  >
                    {limitation}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Technologies */}
        <motion.section variants={itemVariants} className="mb-20 sm:mb-28">
          <h2
            className="text-[#D7E2EA] font-black uppercase leading-tight mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2rem, 6vw, 48px)' }}
          >
            Technologies
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg bg-[#D7E2EA]/10 text-[#D7E2EA] text-sm font-medium uppercase tracking-wider border border-[#D7E2EA]/20 hover:border-[#D7E2EA]/50 hover:bg-[#D7E2EA]/20 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-12 border-t border-[#D7E2EA]/10">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-[#D7E2EA] text-[#0C0C0C] font-medium uppercase tracking-wider hover:bg-white transition-all group text-sm"
            >
              {project.buttonLabel || 'View Live'}
              <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-[#D7E2EA]/10 text-[#D7E2EA] font-medium uppercase tracking-wider border border-[#D7E2EA]/20 hover:bg-[#D7E2EA]/20 hover:border-[#D7E2EA]/50 transition-all group text-sm"
            >
              GitHub
              <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          )}
          <button
            onClick={() => navigate('/#projects')}
            className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-[#D7E2EA]/10 text-[#D7E2EA] font-medium uppercase tracking-wider border border-[#D7E2EA]/20 hover:bg-[#D7E2EA]/20 hover:border-[#D7E2EA]/50 transition-all text-sm"
          >
            Back to Projects
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default ProjectDetail;
