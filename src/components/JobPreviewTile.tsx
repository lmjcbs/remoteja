import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default function JobPreviewTile({ job }) {
  const {
    urlSlug,
    category,
    pinned,
    companyName,
    location,
    title,
    description,
    daysSinceEpoch,
    tags,
  } = job
  return (
    <Link href={`remote-jobs/${urlSlug}`}>
      <div
        className={`${
          pinned ? 'bg-yellow-100' : 'bg-white'
        } border hover:border-gray-300 rounded-lg shadow-md px-2 lg:my-3 md:px-4 xl:px-6 py-2 my-2 flex justify-between`}
      >
        <div>
          <div className="text-xs md:text-sm text-gray-600">{companyName}</div>
          <h3 className="text-md md:text-lg text-gray-00 font-semibold capitalize tracking-wide">
            {title}
          </h3>
          <div className="flex items-center text-gray-600 font-medium tracking-wide">
            <FontAwesomeIcon
              className="text-indigo-500 mr-1 text-xs"
              icon={faMapMarkerAlt}
            />
            <Link href={`/location/${location.name}`}>
              <a className="text-xs hover:underline capitalize">
                {location.name}
              </a>
            </Link>
            <div className="mx-1 text-base">·</div>
            <Link href={`/location/${category.name}`}>
              <a className="text-xs hover:underline capitalize">
                {category.name}
              </a>
            </Link>
          </div>
          <div className="hidden md:flex py-1">
            <span className="mx-1 text-lg font-extrabold">·</span>
            <p className=" text-xs lg:text-sm text-gray-700">
              {description.substr(0, 175)}...{' '}
            </p>
          </div>

          {tags.map(({ name, id }) => (
            <Link key={id} href={`/tag/${name}`}>
              <a className="inline-block bg-indigo-200 hover:bg-indigo-100 border-2 hover:border-indigo-100 border-indigo-200 rounded-md px-1 md:px-2 py-0 text-xs md:font-medium text-gray-700 mr-1 mb-1 shadow-md tracking-wide">
                <span className="font-bold">#</span>
                {name}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex items-baseline justify-end">
          <div className="text-xs">
            {pinned ? (
              <FontAwesomeIcon
                className="text-indigo-500 mr-1 text-sm"
                icon={faThumbtack}
              />
            ) : null}
          </div>
          <div className="text-gray-600 justify-items-end text-sm">
            {daysSinceEpoch}
            <span className="text-xs">d</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
