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

const LOADER_KEY = 'yb-portfolio-loaded';

export default function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !window.sessionStorage.getItem(LOADER_KEY);
    } catch {
      return true;
    }
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useLockBodyScroll(loading);

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
