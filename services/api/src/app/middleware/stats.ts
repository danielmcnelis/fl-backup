import { CustomError } from '@fl/errors'

export const statsAll = async (req, res, next) => {
  try {
    // throw new CustomError('boom')
    const test = {}
    //@ts-ignore
    test.nonExistingMethod()
    res.json({ x: 1 })
  } catch (err) {
    next(err)
  }
  // try {
  //   const onlyUnique = (value, index, self) => self.indexOf(value) === index
  //   const banlists = [...await Status.findAll()].map((s) => s.banlist).filter(onlyUnique).sort()

  //   res.json(banlists)
  // } catch (err) {
  //   next(err)
  // }
}
