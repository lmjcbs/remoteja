import { getUrlSlug } from './getUrlSlug'

export const extendJobsData = (jobs) => {
  return jobs.map((job) => {
    return {
      ...job,
      daysSinceEpoch: Math.floor(
        (Math.round(Date.now() / 1000) - job.epoch) / 86400
      ),
      urlSlug: getUrlSlug(job),
    }
  })
}
