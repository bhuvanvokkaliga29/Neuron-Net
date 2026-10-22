import { Router } from 'express';
import { HealthController } from '../controllers/health.controller.js';
import { ResourceController } from '../controllers/resource.controller.js';
import { BRAND_CONFIG } from '../config/brand.config.js';

export const apiRouter = Router();

// Health check
apiRouter.get('/health', HealthController.getHealth);

// Academic Resources
apiRouter.get('/resources', ResourceController.getResources);
apiRouter.get('/resources/:id', ResourceController.getResourceById);

// Academic Categories & Structure
apiRouter.get('/resource-categories', ResourceController.getCategories);
apiRouter.get('/academic-structure', ResourceController.getStructure);

// Institutional and Brand Identity
apiRouter.get('/brand', (_req, res) => {
  res.status(200).json({
    success: true,
    data: BRAND_CONFIG,
  });
});
