import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ACADEMIC_RESOURCES } from '../data/resources.data.js';
import { RESOURCE_CATEGORIES } from '../data/categories.data.js';
import { getAcademicStructure } from '../data/academicStructure.data.js';
import { ResourceService } from '../services/resource.service.js';
import { validateDestinationUrl, isAllowedUrl } from '../validators/url.validator.js';
import { BRAND_CONFIG } from '../config/brand.config.js';

describe('NEURON NET Academic Platform Verification Suite', () => {
  describe('Resource Counts and Category Balance', () => {
    it('must have exactly 16 total active academic resources', () => {
      const active = ACADEMIC_RESOURCES.filter((r) => r.isActive);
      assert.strictEqual(active.length, 16, 'Total active resource count should be 16');
    });

    it('must have exactly 10 official Google Drive resources (Priority 1)', () => {
      const driveResources = ACADEMIC_RESOURCES.filter(
        (r) => r.isActive && r.isOfficialClubDrive && r.resourceType === 'google_drive_folder'
      );
      assert.strictEqual(driveResources.length, 10, 'There must be exactly 10 Google Drive resources');
    });

    it('must have exactly 3 Autonomous Scheme Google Drive resources', () => {
      const autoDrive = ACADEMIC_RESOURCES.filter(
        (r) => r.isActive && r.scheme === 'autonomous' && r.isOfficialClubDrive
      );
      assert.strictEqual(autoDrive.length, 3, 'Autonomous scheme must have 3 Google Drive resources');
    });

    it('must have exactly 7 VTU Scheme Google Drive resources', () => {
      const vtuDrive = ACADEMIC_RESOURCES.filter(
        (r) => r.isActive && r.scheme === 'vtu' && r.isOfficialClubDrive
      );
      assert.strictEqual(vtuDrive.length, 7, 'VTU scheme must have 7 Google Drive resources');
    });

    it('must have exactly 6 external academic resources (Priority 2)', () => {
      const externalResources = ACADEMIC_RESOURCES.filter(
        (r) => r.isActive && !r.isOfficialClubDrive && r.resourceType === 'external_website'
      );
      assert.strictEqual(externalResources.length, 6, 'There must be exactly 6 external resources');
    });
  });

  describe('Authoritative URL Verification', () => {
    const EXPECTED_URLS = {
      // Autonomous
      'res-auto-c-cycle': 'https://drive.google.com/drive/folders/1DKPh-WVLe8I7o_SbA2QeJ5pA3c0zOM7e?usp=sharing',
      'res-auto-p-cycle': 'https://drive.google.com/drive/folders/1JHo8uPNaLhsA0UkckpxyCUEqUyVHQNne?usp=sharing',
      'res-auto-3rd-sem': 'https://drive.google.com/drive/folders/12EzrbLaV5KSqzZLkaK_BDmwJI6oWx1ZT?usp=sharing',
      // VTU
      'res-vtu-c-cycle': 'https://drive.google.com/drive/folders/1S9d5e4j8_8FgRng6CspTZ05jNJoiXso7?usp=sharing',
      'res-vtu-p-cycle': 'https://drive.google.com/drive/folders/1FciRg9oqHptrkeNpJefZZ-nsmJLVn5nn?usp=sharing',
      'res-vtu-3rd-sem': 'https://drive.google.com/drive/folders/1ChizQVDfIYL6qVlBDLge45ClAM-GAQBx?usp=sharing',
      'res-vtu-4th-sem': 'https://drive.google.com/drive/folders/1trUoWQUW4XoX_oXt4X5pZ0q9loEPzVYF?usp=sharing',
      'res-vtu-5th-sem': 'https://drive.google.com/drive/folders/17ZZS_w1oVSm5Bz3yGDyYT_U6oegbHE05?usp=sharing',
      'res-vtu-6th-sem': 'https://drive.google.com/drive/folders/1bEB2JrfuDoH3YiUvZn7tx9zHgrNSi-ca?usp=sharing',
      'res-vtu-7th-sem': 'https://drive.google.com/drive/folders/1ODRE1J8RSteZxF1mzESfWDnFl6PoALTs?usp=sharing',
      // External
      'res-ext-5th-sem': 'https://vtucircle.com/5th-semester-2022-scheme-cse-ise/',
      'res-ext-7th-sem': 'https://vtucircle.com/7th-semester-2022-scheme-cse-ise/',
      'res-ext-syllabus': 'https://vtucircle.com/vtu-syllabus/',
      'res-ext-pyqp': 'https://vtucircle.com/vtu-question-paper/',
      'res-ext-sgpa-calc': 'https://vtucircle.com/vtu-sgpa-calculator/',
      'res-ext-cgpa-calc': 'https://vtucircle.com/vtu-cgpa-calculator/',
    };

    it('must match all authoritative Google Drive and VTU Circle URLs character-for-character', () => {
      for (const [id, expectedUrl] of Object.entries(EXPECTED_URLS)) {
        const resource = ACADEMIC_RESOURCES.find((r) => r.id === id);
        assert.ok(resource, `Resource ${id} must exist`);
        assert.strictEqual(
          resource.url,
          expectedUrl,
          `Resource ${id} URL must match authoritative destination`
        );
      }
    });

    it('must pass strict URL security allowlisting (HTTPS only, approved domains)', () => {
      for (const resource of ACADEMIC_RESOURCES) {
        const validation = validateDestinationUrl(resource.url);
        assert.strictEqual(validation.isValid, true, `URL for ${resource.id} must be valid`);
        assert.strictEqual(validation.isHttps, true, `URL for ${resource.id} must be HTTPS`);
        assert.strictEqual(
          validation.domainAllowed,
          true,
          `URL domain for ${resource.id} must be in allowlist`
        );
      }
    });

    it('must reject unapproved or insecure URLs', () => {
      assert.strictEqual(isAllowedUrl('http://drive.google.com/insecure'), false);
      assert.strictEqual(isAllowedUrl('https://malicious-site.com/steal'), false);
      assert.strictEqual(isAllowedUrl('javascript:alert(1)'), false);
    });
  });

  describe('Filtering and Discovery Service', () => {
    it('filters correctly by autonomous scheme', () => {
      const result = ResourceService.getResources({ scheme: 'autonomous' });
      assert.strictEqual(result.total, 3);
      assert.ok(result.resources.every((r) => r.scheme === 'autonomous'));
    });

    it('filters correctly by VTU scheme', () => {
      const result = ResourceService.getResources({ scheme: 'vtu' });
      // 7 VTU Drive + 4 VTU External (5th sem, 7th sem, syllabus, pyqp) = 11 total VTU resources
      assert.strictEqual(result.total, 11);
      assert.ok(result.resources.every((r) => r.scheme === 'vtu'));
    });

    it('filters correctly by semester', () => {
      const cCycle = ResourceService.getResources({ semester: 'c-cycle' });
      assert.strictEqual(cCycle.total, 2); // 1 Autonomous + 1 VTU

      const sem5 = ResourceService.getResources({ semester: '5' });
      assert.strictEqual(sem5.total, 2); // 1 VTU Drive + 1 VTU Circle External
    });

    it('filters correctly by category', () => {
      const calculators = ResourceService.getResources({ category: 'calculator' });
      assert.strictEqual(calculators.total, 2);
      assert.ok(calculators.resources.some((r) => r.slug === 'vtu-sgpa-calculator'));
      assert.ok(calculators.resources.some((r) => r.slug === 'vtu-cgpa-calculator'));
    });

    it('filters strictly by Google Drive resources', () => {
      const driveOnly = ResourceService.getResources({ isDriveOnly: 'true' });
      assert.strictEqual(driveOnly.total, 10);
      assert.ok(driveOnly.resources.every((r) => r.isOfficialClubDrive));
    });

    it('performs accurate full-text search across keywords', () => {
      const aiResults = ResourceService.getResources({ search: 'artificial intelligence' });
      assert.ok(aiResults.total >= 1);

      const mathResults = ResourceService.getResources({ search: 'calculator' });
      assert.strictEqual(mathResults.total, 2);

      const emptyResults = ResourceService.getResources({ search: 'nonexistent-query-xyz-123' });
      assert.strictEqual(emptyResults.total, 0);
      assert.strictEqual(emptyResults.resources.length, 0);
    });

    it('handles pagination bounds correctly', () => {
      const page1 = ResourceService.getResources({ page: 1, limit: 5 });
      assert.strictEqual(page1.resources.length, 5);
      assert.strictEqual(page1.total, 16);

      const page4 = ResourceService.getResources({ page: 4, limit: 5 });
      assert.strictEqual(page4.resources.length, 1);
    });

    it('retrieves single resource by ID and by slug', () => {
      const byId = ResourceService.getResourceById('res-auto-c-cycle');
      assert.ok(byId);
      assert.strictEqual(byId?.title, 'C Cycle — Autonomous');

      const bySlug = ResourceService.getResourceById('3rd-semester-autonomous');
      assert.ok(bySlug);
      assert.strictEqual(bySlug?.id, 'res-auto-3rd-sem');

      const notFound = ResourceService.getResourceById('invalid-id-random');
      assert.strictEqual(notFound, null);
    });
  });

  describe('Academic Structure and Branding Configuration', () => {
    it('returns valid academic structure metadata', () => {
      const structure = getAcademicStructure();
      assert.strictEqual(structure.schemes.length, 2);
      assert.strictEqual(structure.categories.length, 4);
      assert.strictEqual(structure.counts.total, 16);
      assert.strictEqual(structure.counts.autonomousDrive, 3);
      assert.strictEqual(structure.counts.vtuDrive, 7);
      assert.strictEqual(structure.counts.totalDrive, 10);
      assert.strictEqual(structure.counts.externalAcademic, 6);
    });

    it('preserves institutional, departmental and club branding hierarchy', () => {
      assert.strictEqual(BRAND_CONFIG.institution.name, 'AMC Engineering College');
      assert.strictEqual(BRAND_CONFIG.department.name, 'Department of Computer Science and Engineering');
      assert.strictEqual(BRAND_CONFIG.department.specialization, 'Artificial Intelligence & Machine Learning');
      assert.strictEqual(BRAND_CONFIG.club.name, 'NEURON NET');

      assert.strictEqual(BRAND_CONFIG.institution.logo.src, '/assets/logos/amc-college-logo.jpg');
      assert.strictEqual(BRAND_CONFIG.department.logo.src, '/assets/logos/cse-aiml-dept-logo.jpg');
      assert.strictEqual(BRAND_CONFIG.club.logo.src, '/assets/logos/neuron-net-club-logo.jpg');
    });
  });
});
