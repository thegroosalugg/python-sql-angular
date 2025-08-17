type Colors =
  | 'slate' | 'gray'    | 'zinc'   | 'neutral' | 'stone'
  | 'red'   | 'orange'  | 'amber'  | 'yellow'  | 'lime'
  | 'green' | 'emerald' | 'teal'   | 'cyan'    | 'sky'
  | 'blue'  | 'indigo'  | 'violet' | 'purple'  | 'fuchsia'
  | 'pink'  | 'rose'   // Tailwind colors
  | 'rust'  | 'steel'; // custom colors

type Shades = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type CssColor = `${Colors}-${Shades}`;

export type RootColor =
  | 'bg'
  | 'fg'
  | 'text'
  | 'box'
  | 'accent'
  | 'accent-hvr'
  | 'hover'
  | 'danger'
  | 'success';
