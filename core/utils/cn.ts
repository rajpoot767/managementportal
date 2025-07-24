type ClassValue = string | undefined | null | boolean | { [key: string]: boolean } | ClassValue[];

function filterClasses(classes: ClassValue[]): string[] {
  return classes.reduce<string[]>((acc, cls) => {
    if (!cls) return acc;
    
    if (typeof cls === 'string') {
      return [...acc, ...cls.split(' ').filter(Boolean)];
    }
    
    if (Array.isArray(cls)) {
      return [...acc, ...filterClasses(cls)];
    }
    
    if (typeof cls === 'object') {
      return [
        ...acc,
        ...Object.entries(cls)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
      ];
    }
    
    return acc;
  }, []);
}

export function cn(...inputs: ClassValue[]): string {
  return [...new Set(filterClasses(inputs))].join(' ');
} 