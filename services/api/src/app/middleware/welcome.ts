export const welcome = async (_req, res, _next) => {
  const greeting = { message: 'Welcome to api!' }

  res.send(greeting)
}
