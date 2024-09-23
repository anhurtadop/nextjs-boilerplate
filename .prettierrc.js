module.exports = {
  printWidth: 120,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'es5', // add trailing commas in objects, arrays, etc.
  semi: true, // add ; when needed
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'always', // braces even for single param in arrow functions (a) => { }
  jsxSingleQuote: false, // "" for react props, like in html
  bracketSameLine: false, // pretty JSX
  endOfLine: 'lf', // 'lf' for linux, 'crlf' for windows, we need to use 'lf' for git
};
