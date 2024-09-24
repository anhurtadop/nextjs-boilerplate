const config = {
  // '**/*.{ts?(x),mts}': () => 'tsc -p tsconfig.json --noEmit',
  // '*.{js,jsx,mjs,cjs,ts,tsx,mts}': 'npm run lint -- --fix',
  '*.{md,json}': 'prettier --write',
};

export default config;
