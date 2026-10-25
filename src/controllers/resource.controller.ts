import { Request, Response } from 'express';
import { RESOURCE_CATEGORIES } from '../data/categories.data.js';
import { getAcademicStructure } from '../data/academicStructure.data.js';
import { ResourceService } from '../services/resource.service.js';
import { ApiResponse } from '../types/resource.types.js';

export class ResourceController {
  public static async getResources(req: Request, res: Response): Promise<void> {
    try {
      const { scheme, semester, category, search, isDriveOnly, page, limit } = req.query;

      const result = ResourceService.getResources({
        scheme: typeof scheme === 'string' ? scheme : undefined,
        semester: typeof semester === 'string' ? semester : undefined,
        category: typeof category === 'string' ? category : undefined,
        search: typeof search === 'string' ? search : undefined,
        isDriveOnly: typeof isDriveOnly === 'string' ? isDriveOnly : undefined,
        page: typeof page === 'string' ? Number(page) : undefined,
        limit: typeof limit === 'string' ? Number(limit) : undefined,
      });

      const response: ApiResponse<typeof result.resources> = {
        success: true,
        data: result.resources,
        meta: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          filtersApplied: result.filtersApplied,
        },
      };

      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400');
      res.setHeader('Vary', 'Accept-Encoding');
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        data: [],
        error: {
          message: 'An error occurred while fetching academic resources.',
          code: 'FETCH_RESOURCES_ERROR',
        },
      });
    }
  }

  public static async getResourceById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        res.status(400).json({
          success: false,
          data: null,
          error: {
            message: 'A valid resource ID or slug is required.',
            code: 'INVALID_ID_PARAMETER',
          },
        });
        return;
      }

      const resource = ResourceService.getResourceById(id);
      if (!resource) {
        res.status(404).json({
          success: false,
          data: null,
          error: {
            message: `Resource "${id}" was not found or is currently unavailable.`,
            code: 'RESOURCE_NOT_FOUND',
          },
        });
        return;
      }

      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400');
      res.setHeader('Vary', 'Accept-Encoding');
      res.status(200).json({
        success: true,
        data: resource,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        error: {
          message: 'Failed to retrieve the requested resource.',
          code: 'GET_RESOURCE_ERROR',
        },
      });
    }
  }

  public static async getCategories(_req: Request, res: Response): Promise<void> {
    try {
      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400');
      res.setHeader('Vary', 'Accept-Encoding');
      res.status(200).json({
        success: true,
        data: RESOURCE_CATEGORIES,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: [],
        error: {
          message: 'Failed to retrieve academic categories.',
          code: 'GET_CATEGORIES_ERROR',
        },
      });
    }
  }

  public static async getStructure(_req: Request, res: Response): Promise<void> {
    try {
      const structure = getAcademicStructure();
      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400');
      res.setHeader('Vary', 'Accept-Encoding');
      res.status(200).json({
        success: true,
        data: structure,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        error: {
          message: 'Failed to load academic structure.',
          code: 'GET_STRUCTURE_ERROR',
        },
      });
    }
  }
}
