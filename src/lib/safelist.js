// Classes built dynamically (e.g. `bg-${color}`) must appear literally somewhere
// so the Tailwind scanner generates them. This file is never imported.
export const SAFELIST = `
bg-tang bg-aqua bg-sun bg-leaf bg-blush
bg-tang-soft bg-aqua-soft bg-sun-soft bg-leaf-soft bg-blush-soft
text-tang-dark text-aqua-dark text-leaf-dark text-blush-dark
`;
