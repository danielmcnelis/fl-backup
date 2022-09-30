import * as express from 'express'
import * as chalk from 'chalk'
import { stats, welcome } from './routes'
import { error } from './middleware'
import config from './config'

const app = express()

const routes = { stats, welcome }
Object.values(routes).forEach((route) => {
  route.stack.forEach((route) => {
    const path = route.route.path
    const methods = Object.entries(route.route.methods).reduce((reduced, [key, value]) => {
      if (value) {
        reduced.push(key.toUpperCase())
      }
      return reduced
    }, [])
    methods.forEach((method) => {
      console.log(`${chalk.yellow(method)} ${chalk.green(path)}`)
    })
  })

  app.use(route)
})

app.use(error)

const port = config.service.port
const server = app.listen(port, () => {
  console.log(chalk.cyan(`Listening at http://localhost:${port}`))
})
server.on('error', console.error)
