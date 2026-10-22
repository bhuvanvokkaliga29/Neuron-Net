import { Request, Response } from 'express';
import { ACADEMIC_RESOURCES } from '../data/resources.data.js';

export class HealthController {
  public static getHealth(_req: Request, res: Response): void {
    res.status(200).json({
      status: 'ok',
      service: 'NEURON NET Academic Platform API',
      department: 'CSE (AI & ML), AMC Engineering College, Bengaluru',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      resources: {
        totalConfigured: ACADEMIC_RESOURCES.length,
        officialDriveFolders: ACADEMIC_RESOURCES.filter((r) => r.isOfficialClubDrive).length,
        externalReferenceTools: ACADEMIC_RESOURCES.filter((r) => !r.isOfficialClubDrive).length,
      },
    });
  }
}
