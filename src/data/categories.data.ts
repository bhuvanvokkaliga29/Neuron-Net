import { ResourceCategoryMeta } from '../types/resource.types.js';

export const RESOURCE_CATEGORIES: ResourceCategoryMeta[] = [
  {
    id: 'study_materials',
    label: 'Study Materials & Notes',
    description: 'Course notes, lecture slides, question banks, lab records, and faculty materials.',
    icon: 'book-open',
  },
  {
    id: 'syllabus',
    label: 'Curriculum & Syllabus',
    description: 'Official academic schemes, course outcomes, credit structures, and course syllabus copies.',
    icon: 'file-text',
  },
  {
    id: 'previous_papers',
    label: 'Question Papers (PYQP)',
    description: 'Previous years university and autonomous internal assessment question papers.',
    icon: 'archive',
  },
  {
    id: 'calculator',
    label: 'Academic Calculators',
    description: 'Interactive utilities for calculating SGPA, CGPA, and grade distributions.',
    icon: 'calculator',
  },
];
