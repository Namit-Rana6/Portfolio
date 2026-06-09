import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

// Mobile shows fewer links
const MOBILE_NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const StickyNav = () => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const links = isMobile ? MOBILE_NAV_LINKS : NAV_LINKS;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)]"
        >
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#0C0C0C]/80 backdrop-blur-xl px-2 py-2">
            {links.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.18em] transition-all duration-200 whitespace-nowrap ${
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

            {/* Resume */}
            <Link
              to="/resume/ml"
              className="relative px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.18em] transition-all duration-200 text-[#0C0C0C] bg-[#D7E2EA] hover:bg-white ml-1 whitespace-nowrap"
            >
              Resume
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default StickyNav;
