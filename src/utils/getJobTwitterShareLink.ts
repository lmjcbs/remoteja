import { getUrlSlug } from './getUrlSlug'

export const getJobTwitterShareLink = (
  job: Models.JobWithRelations
): string => {
  return `https://twitter.com/intent/tweet?related=remoteja&text=%E2%9C%A8%20${
    job.companyName
  }%20is%20hiring%20for%20a%20${
    job.title
  }%0a%0ahttps%3A%2F%2Fremoteja.com%2Fremote-jobs%2F${getUrlSlug(
    job
  )}+via+%40remoteja`
}
