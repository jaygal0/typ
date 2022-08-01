import dbConnect from '../../../utils/dbConnect'
import Phrase from '../../../models/Phrase'

dbConnect()

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const phrases = await Phrase.collection('phrases').find({})
        res.status(200).json({ success: true, data: phrases })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const phrase = await Phrase.create(req.body)
        res.status(201).json({ success: true, data: phrase })
      } catch (error) {
        res
          .status(400)
          .json({ success: false, data: error.errors.title.message })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}