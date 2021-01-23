const fs = require('fs')
const prettier = require('prettier')
const { PrismaClient } = require('@prisma/client')

const generateSitemap = async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')

  const getUrlSlug = (job) => {
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

  const prisma = new PrismaClient()

  // Get all Categories
  const categories = await prisma.category.findMany()

  // Get all tags
  const tags = await prisma.tag.findMany()

  // Get all locations
  const locations = await prisma.location.findMany()

  // Get all jobs Prisma
  const jobs = await prisma.job.findMany()

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
            <loc>https://remoteja.com</loc>
            <changefreq>hourly</changefreq>
            <priority>1.0</priority>
          </url>

            ${categories
              .map((category) => {
                return `
                        <url>
                            <loc>${`https://remoteja.com/categories/${category.name.replace(
                              ' ',
                              '-'
                            )}`}</loc>
                            <changefreq>hourly</changefreq>
                            <priority>1.0</priority>
                        </url>
                    `
              })
              .join('')}

              ${tags
                .map((tag) => {
                  return `
                          <url>
                              <loc>${`https://remoteja.com/tags/${tag.name.replace(
                                ' ',
                                '-'
                              )}`}</loc>
                              <changefreq>hourly</changefreq>
                              <priority>1.0</priority>
                          </url>
                      `
                })
                .join('')}

                ${locations
                  .map((location) => {
                    return `
                            <url>
                                <loc>${`https://remoteja.com/locations/${location.name.replace(
                                  ' ',
                                  '-'
                                )}`}</loc>
                                <changefreq>hourly</changefreq>
                                <priority>1.0</priority>
                            </url>
                        `
                  })
                  .join('')}

                  ${jobs
                    .map((job) => {
                      return `
                              <url>
                                  <loc>${`https://remoteja.com/remote-jobs/${getUrlSlug(
                                    job
                                  )}`}</loc>
                                  <changefreq>weekly</changefreq>
                                  <priority>0.8</priority>
                              </url>
                          `
                    })
                    .join('')}

        </urlset>
    `

  const formattedSitemap = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  fs.writeFileSync('public/sitemap.xml', formattedSitemap)

  await prisma.$disconnect()
}

generateSitemap()

// ${tags
//   .map((route) => {
//     return `
//             <url>
//                 <loc>${`https://quizquestionlist.com/questions/${route}`}</loc
//                 <changefreq>daily</changefreq>
//                 <priority>1.0</priority>
//             </url>
//         `
//   })
//   .join('')}

//   ${jobs
//     .map((route) => {
//       return `
//               <url>
//                   <loc>${`https://remoteja.com/`}</loc>
//                   <changefreq>monthly</changefreq>
//                   <priority>0.8</priority>
//               </url>
//           `
//     })
//     .join('')}
