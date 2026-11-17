import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
import { useClickFX } from './hooks/useClickFX';
import { useScrollDepth } from './hooks/useScrollDepth';
import CustomCursor from './components/CustomCursor';
import QuoteCard from './components/QuoteCard';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useClickFX();
  useScrollDepth();

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
    </>
  );
}
