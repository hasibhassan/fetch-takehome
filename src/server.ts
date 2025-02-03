import express, { RequestHandler } from 'express'
import fs from 'fs'
import yaml from 'js-yaml'
import swaggerUi from 'swagger-ui-express'
import { v4 as uuid } from 'uuid'
import { Receipt } from './types/receipt'
import { calcPoints } from './utils/calcPoints'

const openapiSpec = yaml.load(fs.readFileSync('api.yml', 'utf8')) as object

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
// api docs endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec))

const receipts: Record<string, Receipt> = {}
const receiptPoints: Record<string, number> = {}

const handleProcessReceipt: RequestHandler<{}, any, Receipt> = (
  req,
  res
): void => {
  const { retailer, purchaseDate, purchaseTime, items, total } = req.body
  const id = uuid()

  if (!retailer || !purchaseDate || !purchaseTime || !items || !total) {
    res.status(400).json({ error: 'invalid receipt' })
  }

  for (const item of items) {
    if (!item.shortDescription || !item.price) {
      res.status(400).json({ error: 'invalid receipt items' })
    }
  }

  receipts[id] = { retailer, purchaseDate, purchaseTime, items, total }
  receiptPoints[id] = calcPoints(receipts[id])

  res.status(200).json({ id })
}
app.post('/receipts/process', handleProcessReceipt)

const handleGetPoints: RequestHandler<{ id: string }> = (req, res): void => {
  const { id } = req.params
  if (!receipts[id]) {
    res.status(404).json({ error: 'receipt not found' })
  }

  res.status(200).json({ points: receiptPoints[id] })
}
app.get('/receipts/:id/points', handleGetPoints)

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
  console.log(`docs at http://localhost:${PORT}/docs`)
})
