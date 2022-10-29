
import { Player } from "@fl/models"

export const login = (options) => {
  const { app, providers, email, password } = options
  const title = 'Login'
  console.log('email ln7', email)
  console.log('password ln8', password)

  return (req, res, next) => {
    const method = req.method
    console.log('method', method)

    if (method === 'GET') {
      res.render('auth/login', {
        app,
        title,
        providers,
        signup: false
      })
    } else if (method === 'POST') {
        console.log('email ln21', email)
        console.log('password ln22', password)
        const idToken = Player.verifyLogin({
            email: email,
            password: password
        })

      // TODO: handle signup form post (local user/password)
        if (idToken) {
            res.cookie('id', idToken, {
        	    maxAge: 15 * 60 * 1000 // 15 minutes
            })
        } else {
            res.status(404).send('Sorry, we cannot find that!')
        }
    }

    next()
  }
}
