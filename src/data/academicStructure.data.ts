import { AcademicStructureResponse } from '../types/resource.types.js';
import { RESOURCE_CATEGORIES } from './categories.data.js';
import { ACADEMIC_RESOURCES } from './resources.data.js';

export function getAcademicStructure(): AcademicStructureResponse {
  const autonomousDrive = ACADEMIC_RESOURCES.filter(
    (r) => r.isActive && r.scheme === 'autonomous' && r.isOfficialClubDrive
  ).length;

  const vtuDrive = ACADEMIC_RESOURCES.filter(
    (r) => r.isActive && r.scheme === 'vtu' && r.isOfficialClubDrive
  ).length;

  const totalDrive = ACADEMIC_RESOURCES.filter(
    (r) => r.isActive && r.isOfficialClubDrive
  ).length;

  const externalAcademic = ACADEMIC_RESOURCES.filter(
    (r) => r.isActive && !r.isOfficialClubDrive
  ).length;

  return {
    schemes: [
      {
        id: 'autonomous',
        label: 'Autonomous Scheme',
        description: 'Autonomous curriculum for AMC Engineering College',
        availableSemesters: [
          { id: 'c-cycle', label: 'C Cycle' },
          { id: 'p-cycle', label: 'P Cycle' },
          { id: '3', label: '3rd Semester' },
        ],
      },
      {
        id: 'vtu',
        label: 'VTU Scheme',
        description: 'Visvesvaraya Technological University curriculum',
        availableSemesters: [
          { id: 'c-cycle', label: 'C Cycle' },
          { id: 'p-cycle', label: 'P Cycle' },
          { id: '3', label: '3rd Semester' },
          { id: '4', label: '4th Semester' },
          { id: '5', label: '5th Semester' },
          { id: '6', label: '6th Semester' },
          { id: '7', label: '7th Semester' },
        ],
      },
    ],
    categories: RESOURCE_CATEGORIES,
    counts: {
      total: ACADEMIC_RESOURCES.filter((r) => r.isActive).length,
      autonomousDrive,
      vtuDrive,
      totalDrive,
      externalAcademic,
    },
  };
}
