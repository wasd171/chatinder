const { NODE_ENV } = process.env
const isDev = NODE_ENV === 'development'
module.exports = isDev
