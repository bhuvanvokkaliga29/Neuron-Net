import { ACADEMIC_RESOURCES } from '../data/resources.data.js';
import {
  AcademicResource,
  AcademicScheme,
  AcademicSemester,
  ResourceCategory,
} from '../types/resource.types.js';

export interface ResourceQueryParams {
  scheme?: string;
  semester?: string;
  category?: string;
  search?: string;
  isDriveOnly?: string | boolean;
  page?: string | number;
  limit?: string | number;
}

export interface ResourceListResult {
  resources: AcademicResource[];
  total: number;
  page: number;
  limit: number;
  filtersApplied: Record<string, unknown>;
}

export class ResourceService {
  /**
   * Retrieves resources matching optional query, category, scheme, and semester filters.
   */
  public static getResources(params: ResourceQueryParams = {}): ResourceListResult {
    let filtered = ACADEMIC_RESOURCES.filter((r) => r.isActive);

    const filtersApplied: Record<string, unknown> = {};

    // Filter by scheme
    if (params.scheme && params.scheme !== 'all') {
      const scheme = params.scheme.toLowerCase().trim() as AcademicScheme;
      filtered = filtered.filter((r) => r.scheme === scheme);
      filtersApplied.scheme = scheme;
    }

    // Filter by semester
    if (params.semester && params.semester !== 'all') {
      const semester = params.semester.toLowerCase().trim() as AcademicSemester;
      filtered = filtered.filter((r) => r.semester === semester);
      filtersApplied.semester = semester;
    }

    // Filter by category
    if (params.category && params.category !== 'all') {
      const category = params.category.toLowerCase().trim() as ResourceCategory;
      filtered = filtered.filter((r) => r.category === category);
      filtersApplied.category = category;
    }

    // Filter by Google Drive only
    if (params.isDriveOnly !== undefined) {
      const isDrive = String(params.isDriveOnly).toLowerCase() === 'true';
      filtered = filtered.filter((r) => r.isOfficialClubDrive === isDrive);
      filtersApplied.isOfficialClubDrive = isDrive;
    }

    // Search query matching
    if (params.search && params.search.trim().length > 0) {
      const query = params.search.toLowerCase().trim();
      const terms = query.split(/\s+/).filter(Boolean);

      filtered = filtered.filter((r) => {
        const titleMatch = r.title.toLowerCase().includes(query);
        const descMatch = r.description.toLowerCase().includes(query);
        const tagMatch = r.tags.some((tag) => tag.toLowerCase().includes(query));
        const schemeMatch = r.schemeLabel?.toLowerCase().includes(query);
        const semMatch = r.semesterLabel?.toLowerCase().includes(query);

        if (titleMatch || descMatch || tagMatch || schemeMatch || semMatch) {
          return true;
        }

        // Check if all multi-word tokens are contained somewhere in record
        const allText = `${r.title} ${r.description} ${r.tags.join(' ')} ${r.schemeLabel || ''} ${r.semesterLabel || ''}`.toLowerCase();
        return terms.every((t) => allText.includes(t));
      });

      filtersApplied.search = query;
    }

    // Ensure sorted by sortOrder
    filtered.sort((a, b) => a.sortOrder - b.sortOrder);

    const total = filtered.length;
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(params.limit) || 50));

    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      resources: paginated,
      total,
      page,
      limit,
      filtersApplied,
    };
  }

  /**
   * Find a specific resource by ID or slug.
   */
  public static getResourceById(idOrSlug: string): AcademicResource | null {
    const trimmed = idOrSlug.trim().toLowerCase();
    const found = ACADEMIC_RESOURCES.find(
      (r) => r.isActive && (r.id.toLowerCase() === trimmed || r.slug.toLowerCase() === trimmed)
    );
    return found || null;
  }
}
