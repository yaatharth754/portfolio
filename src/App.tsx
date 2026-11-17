import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetailModal from './components/ProjectDetailModal';
import type { Project } from './data/projects';
import { useLockBodyScroll } from './hooks/useLockBodyScroll';
import { useClickFX } from './hooks/useClickFX';
import { useScrollDepth } from './hooks/useScrollDepth';
import CustomCursor from './components/CustomCursor';
import QuoteCard from './components/QuoteCard';

const LOADER_KEY = 'yb-portfolio-loaded';

/* Dev-only escape hatch (?noloader) so headless screenshots / visual checks can
   skip the loading animation. Never active in production builds. */
const SKIP_LOADER_QUERY = 'noloader';

const shouldSkipLoader = () => {
  if (!import.meta.env.DEV) return false;
  try {
    return new URLSearchParams(window.location.search).has(SKIP_LOADER_QUERY);
  } catch {
    return false;
  }
};

export default function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (shouldSkipLoader()) return false;
    try {
      return !window.sessionStorage.getItem(LOADER_KEY);
    } catch {
      return true;
    }
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useLockBodyScroll(loading);
  useClickFX();
  useScrollDepth();

  const finishLoading = () => {
    try {
      window.sessionStorage.setItem(LOADER_KEY, '1');
    } catch {
      // Storage can be unavailable in private modes; loading still completes.
    }
    setLoading(false);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects onSelectProject={setSelectedProject} />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />

      <QuoteCard />

      <AnimatePresence>
        {selectedProject ? (
          <ProjectDetailModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {loading ? <LoadingScreen key="loader" onComplete={finishLoading} /> : null}
      </AnimatePresence>
    </>
  );
}
