import { FC, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client'
import { useForm } from 'react-hook-form'

interface FormData {
  title: string
  descriptionAsHTML: string
  datePosted: string
  location: string
  category: string
  applyUrl: string
  companyName: string
  featured: boolean
  tags: string[]
}

type PostJobProps = {
  locations: Models.Location[]
  categories: Models.Category[]
}

const PostJob: FC<PostJobProps> = ({ locations, categories }) => {
  // const { data, setData } = useState({})
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    console.log(JSON.stringify(data))
    fetch('/api/jobs/create', {
      method: 'post',
      body: JSON.stringify({ ...data, tags: ['startup'] }),
    }).then(function (response) {
      console.log(response.body)
    })
  })

  return (
    <div className="bg-gray-50 flex flex-col justify-center">
      <div className="text-center font-medium text-xl">
        <div>Post a Job</div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-6 border border-gray-300">
        <form action="" onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="text-sm font-bold text-gray-600 block"
            >
              Title
            </label>
            <input
              ref={register()}
              name="title"
              type="text"
              className="w-full p-2 border border-gray-200 rounded mt-1"
            ></input>
          </div>
          <div>
            <label
              htmlFor="company"
              className="text-sm font-bold text-gray-600 block"
            >
              Company
            </label>
            <input
              ref={register()}
              name="companyName"
              type="text"
              className="w-full p-2 border border-gray-200 rounded mt-1"
            ></input>
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-sm font-bold text-gray-600 block"
            >
              DescriptionAsHTML
            </label>
            <input
              ref={register()}
              name="description"
              type="text"
              className="w-full p-2 border border-gray-200 rounded mt-1"
            ></input>
          </div>
          <div>
            <label
              htmlFor="location"
              className="text-sm font-bold text-gray-600 block"
            >
              Location
            </label>
            <select
              ref={register()}
              name="location"
              className="w-full p-2 border border-gray-200 rounded mt-1 capitalize"
            >
              {locations.map((location) => {
                return <option value={location.name}>{location.name}</option>
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="location"
              className="text-sm font-bold text-gray-600 block"
            >
              Category
            </label>
            <select
              ref={register()}
              name="category"
              className="w-full p-2 border border-gray-200 rounded mt-1 capitalize"
            >
              {categories.map((category) => {
                return <option value={category.name}>{category.name}</option>
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="applyUrl"
              className="text-sm font-bold text-gray-600 block"
            >
              Apply URL
            </label>
            <input
              ref={register()}
              name="applyUrl"
              type="text"
              className="w-full p-2 border border-gray-200 rounded mt-1"
            ></input>
          </div>
          <div className="flex space-x-2">
            <input
              ref={register()}
              name="featured"
              type="checkbox"
              className="h-4 w-4 text-blue-400 rounded"
            ></input>
            <label
              htmlFor="featured"
              className="text-sm font-bold text-gray-600 block"
            >
              Featured
            </label>
          </div>
          <div>
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient()

  const locations = await prisma.location.findMany()
  const categories = await prisma.category.findMany()

  await prisma.$disconnect()

  return {
    props: {
      // getStaticProps Fails to Serialize Date Object
      locations: JSON.parse(JSON.stringify(locations)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  }
}

export default PostJob
