const server = require('./server')
const PORT = 3000

server.listen(process.env.PORT || PORT, () =>
  console.log(`Listening on port ${PORT}`)
)

module.exports = server
