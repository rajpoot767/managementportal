type VariantConfig = {
  [key: string]: {
    [key: string]: string;
  };
};

type DefaultVariants = {
  [key: string]: string | boolean | number;
};

export type VariantProps<T> = {
  [K in keyof T["variants"]]?: keyof T["variants"][K] | null;
} & {
  className?: string;
};

export function createVariants(
  baseClasses: string,
  config: {
    variants: VariantConfig;
    defaultVariants?: DefaultVariants;
  }
) {
  return function variantClassBuilder(props: { [key: string]: any } = {}) {
    const { className = "", ...variantProps } = props;
    const { variants, defaultVariants = {} } = config;

    const classes = [baseClasses];

    Object.keys(variants).forEach((variant) => {
      const value = variantProps[variant] ?? defaultVariants[variant];
      if (value && variants[variant][value]) {
        classes.push(variants[variant][value]);
      }
    });

    if (className) {
      classes.push(className);
    }

    return classes.join(" ");
  };
} 