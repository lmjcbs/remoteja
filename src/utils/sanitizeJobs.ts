import { getUrlSlug } from './getUrlSlug'

export const extendJobsData = (jobs: Models.JobWithRelations[]) => {
  return jobs.map((job) => {
    return {
      ...job,
      daysSinceEpoch: Math.floor(
        (Math.round(Date.now() / 1000) - job.createdEpoch) / 86400
      ),
      urlSlug: getUrlSlug(job),
    }
  })
}
