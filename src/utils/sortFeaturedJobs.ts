import { ONE_WEEK_EPOCH } from '../lib/constants'

export const sortFeaturedJobs = (
  jobs: JobWithRelations[]
): JobWithRelations[] => {
  const standardJobs: JobWithRelations[] = []
  const featuredJobs: JobWithRelations[] = []

  jobs.forEach((job) => {
    if (
      job.featured === true &&
      job.createdEpoch > Math.round(Date.now() / 1000) - ONE_WEEK_EPOCH
    ) {
      featuredJobs.push(job)
    } else {
      standardJobs.push(job)
    }
  })

  return [...featuredJobs, ...standardJobs]
}
