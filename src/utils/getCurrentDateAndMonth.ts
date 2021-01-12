export const getCurrentDateAndMonth = (): string => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const date = new Date().getDate()
  const month = months[new Date().getMonth()]

  return `${date} ${month}`
}
