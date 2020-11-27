import { getUrlSlug } from './getUrlSlug'

export const getJobTwitterShareLink = (job): string => {
  const companyName = job.companyName.replace(' ', '+')
  const jobTitle = job.title.replace(' ', '%20')
  const jobUrl = getUrlSlug(job)
  return `https://twitter.com/intent/tweet?related=remoteja&text=${companyName}%20is%20hiring%20${jobTitle}%21+%F0%9F%9A%80+%0A%0A+%E2%86%92+https%3A%2F%2Fremoteja.com%2Fremote-jobs%2F${jobUrl}+via+%40remoteja&url=`
}
