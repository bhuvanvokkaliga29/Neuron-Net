export interface BrandAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface BrandConfig {
  institution: {
    name: string;
    autonomousStatus: string;
    accreditation: string;
    city: string;
    logo: BrandAsset;
  };
  department: {
    name: string;
    shortName: string;
    specialization: string;
    logo: BrandAsset;
  };
  club: {
    name: string;
    type: string;
    tagline: string;
    description: string;
    logo: BrandAsset;
  };
}

export const BRAND_CONFIG: BrandConfig = {
  institution: {
    name: 'AMC Engineering College',
    autonomousStatus: 'Autonomous Institution',
    accreditation: 'NAAC A+ | NBA Accredited',
    city: 'Bengaluru',
    logo: {
      src: '/assets/logos/amc-college-logo.jpg',
      alt: 'AMC Engineering College (Autonomous) - NAAC A+ | NBA Accredited Official Logo',
    },
  },
  department: {
    name: 'Department of Computer Science and Engineering',
    shortName: 'Dept. of CSE (AI & ML)',
    specialization: 'Artificial Intelligence & Machine Learning',
    logo: {
      src: '/assets/logos/cse-aiml-dept-logo.jpg',
      alt: 'Department of Computer Science and Engineering (Artificial Intelligence & Machine Learning) Official Crest',
    },
  },
  club: {
    name: 'NEURON NET',
    type: 'Academic Club',
    tagline: 'Empowering Academic Excellence & Intelligent Learning',
    description: 'Centralized academic portal maintained by NEURON NET Academic Club for semester-wise study materials, syllabus copies, previous question papers, and academic utilities.',
    logo: {
      src: '/assets/logos/neuron-net-club-logo.jpg',
      alt: 'NEURON NET Academic Club Official Emblem',
    },
  },
};
