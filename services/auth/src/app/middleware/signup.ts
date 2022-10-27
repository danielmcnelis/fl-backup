export const signup = (options) => {
    console.log('signup route ln2')
  const { app, providers } = options
  const title = 'Signup'

  return (req, res, next) => {
    console.log('signup route ln7')
    const method = req.method

    if (method === 'GET') {
      res.render('auth/signup', {
        app,
        title,
        providers,
        firstName: '',
        lastName: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
      })
    } else if (method === 'POST') {
      // TODO: handle signup form post (local user/password)
      res.status(404).send('Sorry, we cannot find that!')
    }

    next()
  }
}
