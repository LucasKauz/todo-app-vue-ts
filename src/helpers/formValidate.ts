import moment from 'moment'

export const changeDatePart = (part: number, val: string, date: string) => {
  let splittedDate = date.split('-')

  splittedDate[part] = String(Number.parseInt(val))

  return splittedDate.join('-')
}

const hasItemSmallerThanOne = (arr: string[]) => {
  return (
    arr.filter((i): boolean => Number.parseInt(i) > 0).length !== arr.length
  )
}

export const isValidDate = (date: string, force: boolean = false) => {
  if (date.length < 1) return 'Invalid date'

  const momentDate = moment(date)
  if (force && hasItemSmallerThanOne(date.split('-'))) {
    return 'Invalid date'
  }

  if (!momentDate.isValid()) return 'Invalid date'

  // This validates if the date has valid value, like on leap years
  const actualDay = Number.parseInt(date.split('-')[2])
  if (momentDate.date() !== actualDay) {
    return 'Invalid date'
  }

  return ''
}

export const getDay = (date: string): string => {
  if (date.length < 1) return ''

  return String(moment(date).date())
}

export const getMonth = (date: string): string => {
  if (date.length < 1) return ''

  return String(moment(date).month() + 1)
}

export const getYear = (date: string): string => {
  if (date.length < 1) return ''

  return String(moment(date).year())
}
