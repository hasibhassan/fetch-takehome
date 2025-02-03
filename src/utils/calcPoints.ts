import { Receipt } from '../types/receipt'

export const calcPoints = (receipt: Receipt): number => {
  let points = 0

  // count alphanumeric
  for (const char of receipt.retailer) {
    if (char.match(/[a-zA-Z0-9]/)) {
      points++
    }
  }

  // round dollar amount rule
  if (receipt.total.endsWith('.00')) {
    points += 50
  }

  // multiple of .25 rule
  if (parseFloat(receipt.total) % 0.25 === 0) {
    points += 25
  }

  // count pairs
  const pairs = Math.floor(receipt.items.length / 2)
  points += pairs * 5

  // trimmed description length rule
  for (const item of receipt.items) {
    const trimmedLen = item.shortDescription.trim().length

    if (trimmedLen % 3 === 0) {
      points += Math.ceil(parseFloat(item.price) * 0.2)
    }
  }

  // odd purchase date rule
  const purchaseDay = receipt.purchaseDate.split('-')[2]
  if (parseInt(purchaseDay, 10) % 2 !== 0) {
    points += 6
  }

  // purchase is after 2:00pm and before 4:00pm. rule
  const splitTimestamp = receipt.purchaseTime.split(':')
  const hour = Number(splitTimestamp[0])
  const min = Number(splitTimestamp[1])
  const timeInMins = hour * 60 + min
  const startInMins = 14 * 60
  const endInMins = 16 * 60

  // using less than 4:00 pm here because 3:59 is valid but 4:00 isn't
  if (timeInMins >= startInMins && timeInMins < endInMins) {
    points += 10
  }

  return points
}
