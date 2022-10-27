export const login = (options) => {
    console.log('login route ln2')
  const { app, providers } = options
  const title = 'Login'

  return (req, res, next) => {
    console.log('login route ln7')
    const method = req.method

    if (method === 'GET') {
      res.render('auth/login', {
        app,
        title,
        providers,
        signup: false
      })
    } else if (method === 'POST') {
      // TODO: handle signup form post (local user/password)
      res.status(404).send('Sorry, we cannot find that!')
    }

    next()
  }
}
