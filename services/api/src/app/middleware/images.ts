import * as fs from 'fs'

export const imagesCreate = async (req, res, next) => {
  try {
    const buffer = req.body.image
      .replace(/^data:image\/jpg;base64,/, '')
      .replace(/^data:image\/jpeg;base64,/, '')
      .replace(/^data:image\/png;base64,/, '')
    fs.writeFileSync(`./public/images/${req.body.folder}/${req.body.fileName}`, buffer, 'base64')
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}
