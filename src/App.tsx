import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import ProjectDetail from './components/ProjectDetail';
import ResumeViewer from './components/ResumeViewer';
import StickyNav from './components/StickyNav';
import BackToTop from './components/BackToTop';

const HomePage = () => {
  return (
    <>
      <StickyNav />
      <BackToTop />
      <main
        className="relative w-full"
        style={{ overflowX: 'clip', background: '#0C0C0C' }}
      >
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <AchievementsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="/resume/:type" element={<ResumeViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
