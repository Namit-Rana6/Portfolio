import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink, FileText, Printer, Link2, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { label: 'Machine Learning', file: '/Namit_Resume_ML.pdf' },
  { label: 'Web Development', file: '/Namit_Web.pdf' },
];

const ResumeViewer = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const [active, setActive] = useState(type === 'web' ? 1 : 0);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const iframe = document.querySelector('iframe') as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.print();
    } else {
      window.open(TABS[active].file, '_blank');
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025] z-0"
        style={{
          backgroundImage:
            'linear-gradient(#D7E2EA 1px, transparent 1px), linear-gradient(90deg, #D7E2EA 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-8 md:px-12 pt-5 pb-4 border-b border-[#D7E2EA]/8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-medium uppercase tracking-[0.2em]">Back</span>
        </button>

        <p className="hidden sm:block text-xs font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/40">
          Resume · Namit Rana
        </p>

        {/* Tab switcher in header */}
        <div className="flex items-center gap-1">
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              className={`relative px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all duration-200 ${
                active === i ? 'text-[#0C0C0C]' : 'text-[#D7E2EA]/50 hover:text-[#D7E2EA]'
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="resume-tab-pill"
                  className="absolute inset-0 rounded-full bg-[#D7E2EA]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main content - PDF left, sidebar right on desktop / bottom on mobile */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-4 px-5 sm:px-8 md:px-12 pt-5 pb-6 lg:pb-12" style={{ minHeight: 'calc(100vh - 88px)' }}>

        {/* PDF */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex-1 rounded-[20px] overflow-hidden border border-[#D7E2EA]/10 bg-[#141418]"
            style={{ minHeight: 400, height: 'calc(100svh - 200px)' }}
          >
            <iframe
              src={`${TABS[active].file}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full"
              title={TABS[active].label}
            />
          </motion.div>
        </AnimatePresence>

        {/* Sidebar - vertical on desktop, horizontal scrollable row on mobile */}
        <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 lg:w-48 shrink-0 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">

          {/* Currently viewing - desktop only */}
          <div className="hidden lg:flex items-start gap-3 px-4 py-3.5 rounded-xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.02]">
            <FileText size={14} className="shrink-0 text-[#D7E2EA]/40 mt-0.5" />
            <span className="text-xs text-[#D7E2EA]/50 leading-relaxed">{TABS[active].label}</span>
          </div>

          <div className="hidden lg:block h-px bg-[#D7E2EA]/8" />

          {/* Download */}
          <a
            href={TABS[active].file}
            download
            className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3.5 rounded-xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.04] text-[#D7E2EA]/70 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/35 hover:bg-[#D7E2EA]/[0.08] transition-all whitespace-nowrap shrink-0"
          >
            <Download size={14} className="shrink-0" />
            <span className="text-xs font-medium uppercase tracking-[0.15em]">Download</span>
          </a>

          {/* Open PDF */}
          <a
            href={TABS[active].file}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3.5 rounded-xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.04] text-[#D7E2EA]/70 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/35 hover:bg-[#D7E2EA]/[0.08] transition-all whitespace-nowrap shrink-0"
          >
            <ExternalLink size={14} className="shrink-0" />
            <span className="text-xs font-medium uppercase tracking-[0.15em]">Open PDF</span>
          </a>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3.5 rounded-xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.04] text-[#D7E2EA]/70 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/35 hover:bg-[#D7E2EA]/[0.08] transition-all whitespace-nowrap shrink-0"
          >
            <Printer size={14} className="shrink-0" />
            <span className="text-xs font-medium uppercase tracking-[0.15em]">Print</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3.5 rounded-xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.04] text-[#D7E2EA]/70 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/35 hover:bg-[#D7E2EA]/[0.08] transition-all whitespace-nowrap shrink-0"
          >
            <Link2 size={14} className="shrink-0" />
            <span className="text-xs font-medium uppercase tracking-[0.15em]">
              {copied ? 'Copied!' : 'Copy Link'}
            </span>
          </button>

          <div className="hidden lg:block h-px bg-[#D7E2EA]/8" />

          {/* Back to portfolio */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3.5 rounded-xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.04] text-[#D7E2EA]/70 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/35 hover:bg-[#D7E2EA]/[0.08] transition-all whitespace-nowrap shrink-0"
          >
            <Home size={14} className="shrink-0" />
            <span className="text-xs font-medium uppercase tracking-[0.15em]">Portfolio</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default ResumeViewer;
