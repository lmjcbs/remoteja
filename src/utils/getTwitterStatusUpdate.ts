import { getUrlSlug } from './getUrlSlug'

export const getTwitterStatusUpdate = (job: Models.Job): string => {
  return `${job.companyName} is hiring for a ${job.title} 🌍

➡️ https://remoteja.com/remote-jobs/${getUrlSlug(job)} #remotework`
}
