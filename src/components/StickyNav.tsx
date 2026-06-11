import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

// White-background sections → hamburger lines go dark
const LIGHT_BG_SECTIONS = ['services', 'experience'];

const StickyNav = () => {
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeExpanded, setResumeExpanded] = useState(false);

  // Track whether we've scrolled past the hero
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close menu on scroll
  useEffect(() => {
    const onScroll = () => { setMenuOpen(false); setResumeExpanded(false); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On hero: always show (white lines, left side)
  // Post-hero: show after scrolling, adaptive color, right side
  const isHero = !pastHero;
  const isLight = LIGHT_BG_SECTIONS.includes(activeSection);

  const lineColor = isHero || !isLight ? 'bg-[#D7E2EA]' : 'bg-[#0C0C0C]';
  const menuBg    = isHero || !isLight
    ? 'bg-[#0C0C0C]/85 border-white/10'
    : 'bg-white/85 border-black/10';
  const itemText  = isHero || !isLight
    ? 'text-[#D7E2EA]/60 hover:text-[#D7E2EA]'
    : 'text-[#0C0C0C]/70 hover:text-[#0C0C0C]';
  const divider   = isHero || !isLight ? 'border-white/8'  : 'border-black/8';
  const hoverBg   = isHero || !isLight ? 'hover:bg-white/8' : 'hover:bg-black/5';
  const resumeLabel = isHero || !isLight ? 'text-[#D7E2EA]' : 'text-[#0C0C0C]';

  // Position: left on hero, right after hero
  const position = isHero ? 'left-5' : 'right-5';
  // Dropdown opens to the right on hero, to the left on right-side
  const dropdownAlign = isHero ? 'left-0' : 'right-0';

  return (
    <>
      {/* ── Desktop pill nav — hidden on mobile ── */}
      <AnimatePresence>
        {pastHero && (
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="hidden sm:flex fixed top-4 left-1/2 -translate-x-1/2 z-50"
            style={{ width: 'max-content', maxWidth: 'calc(100vw - 2rem)' }}
          >
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#0C0C0C]/80 backdrop-blur-xl px-2 py-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`relative px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-200 whitespace-nowrap ${
                      isActive ? 'text-[#0C0C0C]' : 'text-[#D7E2EA]/60 hover:text-[#D7E2EA]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-[#D7E2EA]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
              <Link
                to="/resume/ml"
                className="relative px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-[0.18em] text-[#0C0C0C] bg-[#D7E2EA] hover:bg-white ml-1 whitespace-nowrap transition-colors"
              >
                Resume
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Mobile floating hamburger — always visible on mobile ── */}
      <div className={`sm:hidden fixed top-5 z-50 ${position}`}>
        {/* Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`absolute top-12 ${dropdownAlign} w-52 rounded-2xl border backdrop-blur-2xl overflow-hidden ${menuBg}`}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => { setMenuOpen(false); setResumeExpanded(false); }}
                  className={`block px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors border-b ${divider} ${itemText} ${hoverBg}`}
                >
                  {link.label}
                </a>
              ))}

              {/* Resume — expands inline */}
              <button
                onClick={() => setResumeExpanded((v) => !v)}
                className={`w-full flex items-center justify-between px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors ${resumeLabel} ${hoverBg}`}
              >
                Resume
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${resumeExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {resumeExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden"
                  >
                    <Link
                      to="/resume/ml"
                      onClick={() => { setMenuOpen(false); setResumeExpanded(false); }}
                      className={`block pl-8 pr-5 py-3 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors border-t ${divider} ${itemText} ${hoverBg}`}
                    >
                      Machine Learning
                    </Link>
                    <Link
                      to="/resume/web"
                      onClick={() => { setMenuOpen(false); setResumeExpanded(false); }}
                      className={`block pl-8 pr-5 py-3 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors border-t ${divider} ${itemText} ${hoverBg}`}
                    >
                      Web Development
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
          className="flex flex-col justify-center gap-[5px] w-10 h-10 items-center"
        >
          <span className={`block h-[2px] rounded-full transition-all duration-300 ${lineColor} ${menuOpen ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`} />
          <span className={`block h-[2px] rounded-full transition-all duration-300 ${lineColor} ${menuOpen ? 'opacity-0 w-5' : 'w-4'}`} />
          <span className={`block h-[2px] rounded-full transition-all duration-300 ${lineColor} ${menuOpen ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
        </button>
      </div>
    </>
  );
};

export default StickyNav;
