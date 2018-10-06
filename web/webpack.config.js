module.exports = () => {
  return require(`./webpack.${process.env.NODE_ENV}.config.js`)
 }