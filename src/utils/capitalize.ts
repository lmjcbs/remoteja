export const capitalize = (str: string): string => {
  let separateWords = str.toLowerCase().split(' ')
  for (var i = 0; i < separateWords.length; i++) {
    separateWords[i] =
      separateWords[i].charAt(0).toUpperCase() + separateWords[i].substring(1)
  }
  return separateWords.join(' ')
}
