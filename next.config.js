// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = {
  target: 'serverless'
}
module.exports = withSass({
  /* config options here */
})