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
  if (date.length < 1) return false

  const momentDate = moment(date, 'YYYY-MM-DD', true)
  if (force && hasItemSmallerThanOne(date.split('-'))) {
    return false
  }

  if (!momentDate.isValid()) return false

  // This validates if the date has valid value, like on leap years
  const actualDay = Number.parseInt(date.split('-')[2])
  if (momentDate.date() !== actualDay) {
    return false
  }

  return true
}

export const getDay = (date: string): string => {
  if (date.length < 1) return ''

  return String(moment(date, 'YYYY-MM-DD', true).date())
}

export const getMonth = (date: string): string => {
  if (date.length < 1) return ''

  return String(moment(date, 'YYYY-MM-DD', true).month() + 1)
}

export const getYear = (date: string): string => {
  if (date.length < 1) return ''

  return String(moment(date, 'YYYY-MM-DD', true).year())
}
