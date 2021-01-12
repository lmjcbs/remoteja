import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import { getCurrentDateAndMonth } from '../../../utils'
import Twitter from 'twitter'
import { getTwitterStatusUpdate } from '../../../utils'

const prisma = new PrismaClient()

// bearer_token: process.env.TWITTER_BEARER_TOKEN,

console.log(process.env.TWITTER_ACCESS_TOKEN_KEY)
console.log(process.env.TWITTER_ACCESS_TOKEN_KEY_SECRET)
const twitter = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_KEY_SECRET,
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // selects the last 12 characters from uuid
  const jid = uuid().split('-').pop()
  const epoch = Math.floor(new Date().getTime() / 1000)
  const datePosted = getCurrentDateAndMonth()

  console.log(twitter)

  // create tags if they don't already exist
  await req.body.tags.map(async (tag: string) => {
    await prisma.tag.upsert({
      where: { name: tag },
      update: {},
      create: { name: tag },
    })
  })

  // format tags argument into primsa connect input format
  const tagsArray = []
  for (let index = 0; index < req.body.tags.length; index++) {
    tagsArray.push({ name: req.body.tags[index] })
  }

  try {
    const job = await prisma.job.create({
      data: {
        ...req.body,
        jid,
        epoch,
        datePosted,
        location: { connect: { name: req.body.location } },
        category: { connect: { name: req.body.category } },
        tags: { connect: tagsArray },
      },
    })

    twitter.post(
      'statuses/update',
      { status: `${getTwitterStatusUpdate(job)}` },
      function (error, tweet, response) {
        if (error) throw error
        console.log(tweet) // Tweet body.
        console.log(response) // Raw response object.
      }
    )

    res.status(200).json(job)
  } catch (e) {
    res.status(500).json(e.message)
  } finally {
    prisma.$disconnect()
  }
}
