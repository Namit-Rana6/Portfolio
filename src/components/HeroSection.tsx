import { useState, useEffect, useRef, memo } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const HeroNav = memo(() => {
  const [resumeDropdown, setResumeDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setResumeDropdown(false);
      setMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex items-center justify-between px-5 sm:px-6 md:px-10 pt-5 sm:pt-6 md:pt-8">
      {/* Desktop nav */}
      <ul className="hidden sm:flex items-center gap-5 sm:gap-6 md:gap-10">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}

        <li className="relative">
          <button
            onClick={() => setResumeDropdown((v) => !v)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
          >
            Resume
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${resumeDropdown ? 'rotate-180' : ''}`} />
          </button>

          {resumeDropdown && (
            <div className="absolute top-full mt-3 left-0 w-56 bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden z-50">
              <Link
                to="/resume/ml"
                onClick={() => setResumeDropdown(false)}
                className="block px-5 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white/70 hover:text-white transition duration-200 hover:bg-white/10 border-b border-white/10"
              >
                Machine Learning
              </Link>
              <Link
                to="/resume/web"
                onClick={() => setResumeDropdown(false)}
                className="block px-5 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white/70 hover:text-white transition duration-200 hover:bg-white/10"
              >
                Web Development
              </Link>
            </div>
          )}
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileMenuOpen((v) => !v)}
        aria-label="Toggle menu"
        className="sm:hidden flex flex-col gap-1.5 p-1"
      >
        <span className={`block h-0.5 w-6 bg-white/80 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block h-0.5 w-6 bg-white/80 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 w-6 bg-white/80 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      <a
        href="#contact"
        className="hidden sm:inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-[1.03]"
      >
        Email me
      </a>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 mx-4 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/15 z-50 overflow-hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white hover:bg-white/10 transition border-b border-white/10"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/resume/ml"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white hover:bg-white/10 transition border-b border-white/10"
          >
            Resume — ML
          </Link>
          <Link
            to="/resume/web"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            Resume — Web
          </Link>
        </div>
      )}
    </div>
  );
});

// Isolated mute button - state changes here don't re-render the hero content
const MuteToggle = memo(({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement> }) => {
  const [muted, setMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSoundHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setShowSoundHint(false);
  };

  return (
    <div className="flex items-center gap-3">
      {showSoundHint && (
        <span
          className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.25em] text-white/80"
          style={{ animation: 'pulseFade 2s ease-in-out infinite' }}
        >
          Tap for sound
        </span>
      )}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-110"
      >
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </div>
  );
});

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-mute video when scrolling past hero
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const v = videoRef.current;
          if (v && !v.muted) v.muted = true;
        }
      },
      { threshold: 0, rootMargin: '-50% 0px 0px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Snap-scroll
  const firedRef = useRef(false);
  useEffect(() => {
    const goToAbout = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      const about = document.getElementById('about');
      if (about) about.scrollIntoView({ behavior: 'auto', block: 'start' });
    };
    const onWheel = (e: WheelEvent) => {
      if (firedRef.current) return;
      if (e.deltaY <= 0) return;
      if (window.scrollY > 50) return;
      e.preventDefault();
      goToAbout();
    };
    const onKey = (e: KeyboardEvent) => {
      if (firedRef.current) return;
      if (window.scrollY > 50) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToAbout();
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '50% 30%' }}
      >
        <source src="/intro3.mp4" type="video/mp4" />
      </video>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* Content layer */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top bar */}
        <FadeIn delay={0} y={-20} className="relative">
          <HeroNav />
        </FadeIn>

        {/* Middle-left: PORTFOLIO + Name + Subtitle */}
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-7xl px-6 md:px-10">
            <FadeIn delay={0.3} y={20}>
              <p className="mb-4 text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-white/60">
                Portfolio · 2026
              </p>
            </FadeIn>

            <FadeIn delay={0.5} y={40}>
              <h1
                className="font-black uppercase leading-[0.88] tracking-tight text-white"
                style={{ fontSize: 'clamp(3rem, 12vw, 10.5rem)' }}
              >
                Namit<br />Rana
              </h1>
            </FadeIn>

            <FadeIn delay={0.85} y={20}>
              <p className="mt-5 md:mt-7 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-white/75">
                AI Engineer · ML Researcher · Full-Stack Builder
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-10 md:pb-12">
          {/* Scroll indicator */}
          <FadeIn delay={1.1} y={20}>
            <a href="#about" aria-label="Scroll to next section" className="group flex flex-col items-center gap-3">
              <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 transition group-hover:text-white">
                Scroll
              </span>
              <div className="relative h-12 w-px overflow-hidden bg-white/20">
                <span
                  className="absolute inset-x-0 top-0 h-1/2 w-full bg-white"
                  style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }}
                />
              </div>
            </a>
          </FadeIn>

          {/* Mute toggle + Sound hint */}
          <FadeIn delay={1.1} y={20}>
            <MuteToggle videoRef={videoRef} />
          </FadeIn>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
