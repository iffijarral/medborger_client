/** @type {import('jest').Config} */
const config = {
  verbose: true,
  moduleNameMapper: {
    '^axios$': require.resolve('axios')
  }
};

module.exports = config;
