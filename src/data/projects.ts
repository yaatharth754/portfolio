export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  problem: string;
  features: string[];
  stack: string[];
  contribution: string;
  links: ProjectLink[];
  art: 'face' | 'pose' | 'docs';
};

/**
 * Only verified destinations are listed here.
 * GitHub repositories are intentionally omitted: no public repository URLs
 * could be verified from the resume or supplied project references.
 */
export const projects: Project[] = [
  {
    id: 'snapclass',
    index: '01',
    title: 'SnapClass',
    category: 'Computer Vision · Biometrics',
    year: 'AI Attendance',
    summary:
      'Attendance that verifies a person, not just a roll number — using face and voice together.',
    description:
      'An AI-powered classroom attendance system that combines facial recognition with voice biometrics. SnapClass turns a manual, easily-gamed routine into a secure, automated record that stays in sync in the cloud.',
    problem:
      'Roll-call is slow, interrupts teaching time, and still cannot prove that the person answering is the person enrolled. SnapClass verifies identity through two independent biometric signals and records it automatically.',
    features: [
      'Dual identity verification using face and voice',
      'Secure authentication with hashed credentials',
      'Automated attendance pipelines synced to the cloud',
      'Class management interface built for daily use',
    ],
    stack: [
      'Python',
      'Streamlit',
      'OpenCV',
      'dlib',
      'Resemblyzer',
      'Librosa',
      'Scikit-learn',
      'Supabase',
    ],
    contribution:
      'I designed and built the system end-to-end: the biometric pipeline, an SVM-based classifier, secure authentication, the Supabase data layer, and the Streamlit application. The system reached 98% accuracy and cut manual attendance tracking time by 80%.',
    links: [
      { label: 'Live application', href: 'https://snapclass-yb.streamlit.app/' },
      {
        label: 'Landing page',
        href: 'https://snapclass-yb-landingpage.vercel.app/',
      },
    ],
    art: 'face',
  },
  {
    id: 'ai-gym-coach',
    index: '02',
    title: 'AI Gym Coach',
    category: 'Real-time Vision · Voice AI',
    year: 'Movement',
    summary:
      'A workout assistant that watches your form through the webcam and talks you through the set.',
    description:
      'An AI fitness coach that uses computer vision to understand movement in real time, then guides the workout with spoken feedback. Progress is tracked over time so training becomes something you can measure.',
    problem:
      'Without a trainer, it is hard to know whether a movement is being performed correctly or whether progress is real. AI Gym Coach brings live pose feedback and voice guidance to an ordinary webcam session.',
    features: [
      'Real-time pose estimation at 30+ frames per second',
      'Exercise tracking and repetition guidance',
      'Text-to-speech coaching through the session',
      'Progress metrics stored and reviewed over time',
    ],
    stack: [
      'Python',
      'Streamlit',
      'OpenCV',
      'MediaPipe',
      'Text-to-Speech (TTS)',
      'Supabase',
      'Streamlit Cloud',
    ],
    contribution:
      'I built the real-time vision pipeline, integrated text-to-speech guidance, added Supabase-backed progress tracking, and optimised model inference latency by 25% so feedback could keep pace with the user.',
    links: [
      {
        label: 'Live application',
        href: 'https://yb-ai-gym-coach.streamlit.app/',
      },
      {
        label: 'Landing page',
        href: 'https://yb-ai-gym-coach-landingpage.netlify.app/',
      },
    ],
    art: 'pose',
  },
  {
    id: 'rag-studio',
    index: '03',
    title: 'RAG Studio',
    category: 'Generative AI · Retrieval',
    year: 'Documents',
    summary:
      'Ask a document a real question. Retrieve the evidence first, then let the model answer.',
    description:
      'A retrieval-augmented generation application for reading and questioning documents. RAG Studio turns long files into a searchable, conversational knowledge base using semantic retrieval and grounded generation.',
    problem:
      'Large documents are difficult to search, and general-purpose language models are prone to inventing answers. RAG Studio retrieves relevant passages first so the generated response is anchored in the source material.',
    features: [
      'Upload and query documents in natural language',
      'Semantic embeddings with vector similarity search',
      'Context-aware retrieval before generation',
      'Grounded answers powered by a Groq-hosted LLM',
    ],
    stack: [
      'Python',
      'Streamlit',
      'LangChain',
      'Hugging Face Embeddings',
      'ChromaDB',
      'Groq',
    ],
    contribution:
      'I developed the complete retrieval pipeline — document loading, text chunking, semantic embeddings, vector search — and connected it to a Groq-powered LLM inside a Streamlit interface, with a focus on answers grounded in retrieved context.',
    links: [
      { label: 'Live application', href: 'https://rag-yb.streamlit.app/' },
    ],
    art: 'docs',
  },
];
