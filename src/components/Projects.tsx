import SectionHeading from './SectionHeading';
import ProjectCarousel from './ProjectCarousel';
import Reveal from './Reveal';
import type { Project } from '../data/projects';

export default function Projects({
  onSelectProject,
}: {
  onSelectProject: (project: Project) => void;
}) {
  return (
    <section className="section projects" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          id="projects"
          title={
            <>
              Things I&apos;ve <em>Built</em>
            </>
          }
          intro="Experiments, ideas, and intelligent solutions brought to life through code."
        />
      </div>

      <div className="projects__stage-wrap">
        <ProjectCarousel onSelectProject={onSelectProject} />
      </div>

      <div className="container">
        <Reveal className="projects__footnote">
          <span className="projects__footnote-mark" aria-hidden="true">✦</span>
          <p>
            Three projects, each built end-to-end. Open a card for the problem,
            the build, and the verified live links.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
