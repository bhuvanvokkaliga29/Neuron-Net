const ALLOWED_DOMAINS = [
  'drive.google.com',
  'vtucircle.com',
];

export interface UrlValidationResult {
  isValid: boolean;
  isHttps: boolean;
  domainAllowed: boolean;
  error?: string;
}

export function validateDestinationUrl(urlString: string): UrlValidationResult {
  try {
    const parsed = new URL(urlString);

    if (parsed.protocol !== 'https:') {
      return {
        isValid: false,
        isHttps: false,
        domainAllowed: false,
        error: 'Only secure HTTPS destinations are allowed.',
      };
    }

    const hostname = parsed.hostname.toLowerCase();
    const isAllowed = ALLOWED_DOMAINS.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );

    if (!isAllowed) {
      return {
        isValid: false,
        isHttps: true,
        domainAllowed: false,
        error: `Host "${hostname}" is not in the approved academic destinations allowlist.`,
      };
    }

    return {
      isValid: true,
      isHttps: true,
      domainAllowed: true,
    };
  } catch {
    return {
      isValid: false,
      isHttps: false,
      domainAllowed: false,
      error: 'Malformed URL provided.',
    };
  }
}

export function isAllowedUrl(urlString: string): boolean {
  return validateDestinationUrl(urlString).isValid;
}
