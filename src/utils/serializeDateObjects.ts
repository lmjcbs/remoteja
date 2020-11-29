export const serializeDateObjects = (
  job: Models.JobWithRelations | Models.JobWithRelations[]
) => {
  return JSON.parse(JSON.stringify(job))
}
