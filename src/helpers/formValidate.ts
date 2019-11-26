export const changeDatePart = (part: number, val: string, date: string) => {
  let splittedDate = date.split('-')

  splittedDate[part] = val

  return splittedDate.join('-')
}

export const validateDate = (date: string) => {
  const parsedDate = Date.parse(date)
  const dateObj = new Date(parsedDate)

  // This will happen when the date makes no sense
  if (Number.isNaN(parsedDate)) {
    return 'Invalid date format'
  }

  const actualDate = Number.parseInt(date.split('-')[1])

  // This validates if the date has valid value, like on leap years
  if (dateObj.getDate() !== actualDate) {
    return 'Invalide date'
  }

  return ''
}
