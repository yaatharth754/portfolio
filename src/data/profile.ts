/**
 * Single source of truth for all personal content.
 * Every professional fact below is taken from Yaatharth's resume.
 * Update this file when the resume changes.
 */

export const profile = {
  name: 'Yaatharth Bawankar',
  firstName: 'Yaatharth',
  lastName: 'Bawankar',
  initials: 'YB',
  role: 'Computer Science Engineer',
  focus: 'Artificial Intelligence · Machine Learning · Data Science',
  location: 'Ahmedabad, India',
  email: 'yaatharth754@gmail.com',
  phoneDisplay: '+91 93135 94484',
  phoneHref: 'tel:+919313594484',
  whatsappDisplay: '+91 94995 50051',
  whatsappHref: 'https://wa.me/919499550051',
  linkedin: 'https://www.linkedin.com/in/yaatharth754',
  github: 'https://github.com/yaatharth754',
  resume: '/Yaatharth_Bawankar_Resume.pdf',
  resumeName: 'Yaatharth_Bawankar_Resume.pdf',
  availability: 'Open to AI/ML & Data Science internships',
  tagline: 'Building Intelligent Experiences Through Code.',
  support:
    'Computer Science Engineering student passionate about Artificial Intelligence, Machine Learning, Data Science, and building meaningful software solutions.',
  intro: [
    'I am a B.Tech Computer Science student at Smt. Kashibai Navale College of Engineering, expected to graduate in June 2027, currently based in Ahmedabad, India.',
    'I learn by building. My work so far lives at the intersection of artificial intelligence and practical software — an attendance system that recognises faces and voices, a real-time fitness coach that reads movement and speaks back, and a retrieval system that turns documents into conversations. Each one began with a real friction point and ended as something people can actually use.',
    'I am looking for AI/ML and Data Science internships where I can keep asking better questions, work with people who care about the details, and turn what I learn into software that earns its place.',
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  id: string;
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export type SkillGroup = {
  index: string;
  title: string;
  caption: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    index: '01',
    title: 'Programming',
    caption: 'The languages I think in.',
    skills: ['Python', 'C++ (DSA)', 'SQL'],
  },
  {
    index: '02',
    title: 'AI & Machine Learning',
    caption: 'Where the interesting problems live.',
    skills: [
      'Scikit-learn',
      'OpenCV',
      'Computer Vision',
      'Face Recognition',
      'Classification',
      'Clustering',
      'Feature Engineering',
      'Model Evaluation',
    ],
  },
  {
    index: '03',
    title: 'Data Science',
    caption: 'Finding the signal in the noise.',
    skills: [
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Exploratory Data Analysis',
      'Data Cleaning',
    ],
  },
  {
    index: '04',
    title: 'Development & Data',
    caption: 'From notebook to something usable.',
    skills: ['Streamlit', 'PostgreSQL', 'Supabase'],
  },
  {
    index: '05',
    title: 'Tools & Workflow',
    caption: 'A quiet, reliable toolchain.',
    skills: ['Git', 'GitHub', 'Jupyter Notebook', 'VS Code'],
  },
];

export const appliedSkills = [
  'LangChain',
  'Hugging Face Embeddings',
  'ChromaDB',
  'Groq',
  'MediaPipe',
  'dlib',
  'Librosa',
  'Resemblyzer',
  'face-recognition-models',
  'bcrypt',
];

export type EducationItem = {
  institution: string;
  credential: string;
  date: string;
  detail: string;
  current?: boolean;
};

export const education: EducationItem[] = [
  {
    institution: 'Smt. Kashibai Navale College of Engineering',
    credential: 'B.Tech in Computer Science Engineering',
    date: 'Expected June 2027',
    detail: 'CGPA 8.85 / 10',
    current: true,
  },
  {
    institution: "St. Ann's School",
    credential: 'Higher Secondary (12th)',
    date: 'July 2022',
    detail: '76%',
  },
  {
    institution: 'The New Tulip International School',
    credential: 'Secondary School (10th)',
    date: 'July 2020',
    detail: '92%',
  },
];

export type Certification = {
  title: string;
  issuer: string;
  date: string;
};

export const certifications: Certification[] = [
  {
    title: '100 Days of Code — Python',
    issuer: 'Self-directed programme',
    date: 'September 2025',
  },
  {
    title: 'Apna College Prime — AI & Machine Learning',
    issuer: 'Apna College',
    date: 'June 2026',
  },
];

export const practicalExperience = [
  {
    period: 'Project practice',
    role: 'Computer Vision & Biometrics',
    project: 'SnapClass',
    description:
      'Designed and engineered an AI attendance platform combining facial recognition with voice biometrics, cloud data storage, and secure authentication.',
    highlights: [
      'Engineered face and voice verification, reaching 98% accuracy',
      'Reduced manual attendance tracking time by 80%',
      'Built secure authentication and automated data pipelines',
    ],
  },
  {
    period: 'Project practice',
    role: 'Real-time Vision & Voice',
    project: 'AI Gym Coach',
    description:
      'Built a real-time fitness assistant that tracks movement through a webcam and guides the user with generated voice coaching.',
    highlights: [
      'Processed 30+ frames per second for pose estimation',
      'Integrated text-to-speech guidance and progress tracking',
      'Optimised model inference latency by 25%',
    ],
  },
  {
    period: 'Project practice',
    role: 'Retrieval-Augmented Generation',
    project: 'RAG Studio',
    description:
      'Developed a document question-answering system that retrieves the right context before an LLM writes an answer.',
    highlights: [
      'Implemented chunking, semantic embeddings, and vector search',
      'Integrated a Groq-powered LLM for grounded answers',
      'Built an end-to-end interface with Streamlit',
    ],
  },
];
