import { getUrlSlug } from './getUrlSlug'

export const getJobMailtoLink = (job): string => {
  return `mailto:?subject=%E2%9C%A8%20${
    job.companyName
  }%20is%20hiring%20for%20a%20${
    job.title
  }%20via%20%40remoteja&body=https://remoteja.com/remote-jobs/${getUrlSlug(
    job
  )}`
}
