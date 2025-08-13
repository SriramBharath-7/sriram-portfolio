/**
 * Sanitizes a string to prevent XSS attacks
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitizes an object by recursively sanitizing all string values
 */
export function sanitizeObject<T extends Record<string, string | number | boolean | null | undefined | T>>(obj: T): T {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value as T);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}

/**
 * Validates and sanitizes HTML content
 */
export function sanitizeHTML(html: string): string {
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const allowedAttributes = ['class', 'id'];

  const doc = new DOMParser().parseFromString(html, 'text/html');
  
  function sanitizeNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return sanitizeString(node.textContent || '');
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      if (!allowedTags.includes(tagName)) {
        return sanitizeString(element.textContent || '');
      }

      const attributes = Array.from(element.attributes)
        .filter(attr => allowedAttributes.includes(attr.name))
        .map(attr => `${attr.name}="${sanitizeString(attr.value)}"`)
        .join(' ');

      const children = Array.from(element.childNodes)
        .map(child => sanitizeNode(child))
        .join('');

      return `<${tagName}${attributes ? ' ' + attributes : ''}>${children}</${tagName}>`;
    }

    return '';
  }

  return sanitizeNode(doc.body);
}

/**
 * Validates and sanitizes URLs
 */
export function sanitizeURL(url: string): string {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol');
    }
    return parsed.toString();
  } catch {
    return '';
  }
}

/**
 * Validates and sanitizes email addresses
 */
export function sanitizeEmail(email: string): string {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) ? sanitizeString(email) : '';
}

/**
 * Validates and sanitizes phone numbers
 */
export function sanitizePhone(phone: string): string {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone) ? sanitizeString(phone) : '';
} 