module.exports = {
  'src/**/*.{js,ts,jsx,tsx}': ['prettier --write', 'eslint --fix', 'git add'],
  '*.json': ['prettier --write', 'git add'],
};
