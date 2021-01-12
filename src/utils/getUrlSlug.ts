export const getUrlSlug = (
  job: Models.JobWithRelations | Models.Job
): string => {
  const slug = `${job.title} ${job.companyName} ${job.jid}`
  const sanitizedSlug = slug
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace all spaces with '-'
    .replace(/[^\w\-]+/g, '') // Remove all none-word chars
    .replace(/\-\-+/g, '-') // Replace multiple spaces with single '-'
    .replace(/^-+/, '') // Trim from start of text
    .replace(/-+$/, '') // Trim from end of text
  return sanitizedSlug
}
