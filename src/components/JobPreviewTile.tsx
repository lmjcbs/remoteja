import { FC } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, MapMarkerIcon } from '../lib/svg'

type JobPreviewTileProps = {
  job: Models.Job & {
    category: Models.Category
    location: Models.Location
    tags: Models.Tag[]
  }
}

const JobPreviewTile: FC<JobPreviewTileProps> = ({ job }) => {
  const {
    urlSlug,
    category,
    featured,
    companyName,
    location,
    title,
    daysSinceEpoch,
    tags,
  } = job
  return (
    <Link href={`/remote-jobs/${urlSlug}`}>
      <div
        className={`${
          featured
            ? 'bg-yellow-100 hover:bg-yellow-200 border-yellow-200 hover:bg-opacity-75'
            : 'bg-white hover:bg-gray-50'
        } w-full group rounded-lg border-2 shadow-lg px-2 lg:my-3 md:px-4 xl:px-6 py-2 my-2 flex justify-between cursor-pointer`}
      >
        <div>
          <div className="text-sm md:text-base font-medium text-gray-700">
            {companyName}
          </div>
          <h3 className="text-sm md:text-lg max-w-xs md:max-w-lg lg:max-w-2xl font-semibold capitalize tracking-wide text-gray-800">
            {title}
          </h3>
          <div className="flex items-center text-gray-800 font-medium tracking-wide md:mb-1">
            <MapMarkerIcon
              size={18}
              className={`fill-current ${
                featured ? 'text-yellow-300' : 'text-gray-500'
              }`}
            />
            <Link href={`/locations/${location.name}`}>
              <a className="text-xs md:text-sm ml-0.5 hover:underline capitalize">
                {location.name}
              </a>
            </Link>
            <div className="mx-1 text-based">·</div>
            <Link href={`/categories/${category.name}`}>
              <a className="text-xs md:text-sm hover:underline capitalize">
                {category.name}
              </a>
            </Link>
          </div>

          {tags.map(({ name, id }) => (
            <Link key={id} href={`/tags/${name}`}>
              <a className="inline-block bg-indigo-200 hover:bg-indigo-300 border-2 hover:border-indigo-300 border-indigo-200 rounded-md px-1 md:px-2 py-0 text-xs md:text-sm font-medium text-gray-700 mr-1 mb-1 shadow-md tracking-wide">
                <span className="font-semibold">#</span>
                {name}
              </a>
            </Link>
          ))}
        </div>

        <div className="flex justify-end">
          <div className="relative flex flex-col">
            <div className="justify-items-end text-gray-700 font-medium mr-1 mt-0. text-xs md:text-sm mb-5">
              {daysSinceEpoch}
              <span>d</span>
            </div>
            {featured ? (
              <div className="absolute mt-10 -ml-24 md:-ml-36 text-gray-700 text-xs md:text-sm font-semibold border-2 border-yellow-300 bg-yellow-300 px-1 rounded-md text-center">
                Featured
              </div>
            ) : null}
            <ArrowRightIcon
              size={24}
              className="opacity-0 group-hover:opacity-100 fill-current text-gray-700"
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default JobPreviewTile
