export type AcademicScheme = 'autonomous' | 'vtu';

export type AcademicSemester = 
  | 'c-cycle'
  | 'p-cycle'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8';

export type ResourceCategory = 
  | 'study_materials'
  | 'syllabus'
  | 'previous_papers'
  | 'calculator';

export type ResourceType = 'google_drive_folder' | 'external_website';

export interface AcademicResource {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ResourceCategory;
  scheme: AcademicScheme | null;
  semester: AcademicSemester | null;
  semesterLabel?: string;
  schemeLabel?: string;
  resourceType: ResourceType;
  url: string;
  isOfficialClubDrive: boolean;
  isActive: boolean;
  sortOrder: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastVerifiedAt: string;
}

export interface ResourceCategoryMeta {
  id: ResourceCategory;
  label: string;
  description: string;
  icon: string;
}

export interface AcademicSchemeMeta {
  id: AcademicScheme;
  label: string;
  description: string;
  availableSemesters: {
    id: AcademicSemester;
    label: string;
  }[];
}

export interface AcademicStructureResponse {
  schemes: AcademicSchemeMeta[];
  categories: ResourceCategoryMeta[];
  counts: {
    total: number;
    autonomousDrive: number;
    vtuDrive: number;
    totalDrive: number;
    externalAcademic: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    filtersApplied?: Record<string, unknown>;
  };
  error?: {
    message: string;
    code: string;
  };
}
