export const serializeDateObjects = (rawData) => {
  return JSON.parse(JSON.stringify(rawData))
}
