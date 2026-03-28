type ClassDictionary = Record<string, boolean | null | undefined>;

type ClassInput =
  | ClassDictionary
  | ClassInput[]
  | false
  | null
  | number
  | string
  | undefined;

export function cn(...inputs: ClassInput[]) {
  const classes: string[] = [];

  const append = (input: ClassInput): void => {
    if (!input) {
      return;
    }

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
      return;
    }

    if (Array.isArray(input)) {
      input.forEach(append);
      return;
    }

    for (const [name, enabled] of Object.entries(input)) {
      if (enabled) {
        classes.push(name);
      }
    }
  };

  inputs.forEach(append);

  return classes.join(" ");
}
