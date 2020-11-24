import Link from 'next/link'

export default function JobPreviewTile({ job }) {
  const {
    urlSlug,
    pinned,
    companyName,
    location,
    title,
    description,
    daysSinceEpoch,
    tags,
  } = job
  return (
    <Link href={`job/${urlSlug}`}>
      <div
        className={`bg-white border hover:border-indigo-600 focus:border-indigo-600 rounded-lg shadow-md px-2 py-2 my-2 flex justify-between`}
      >
        <div>
          <div className="text-sm font-semibold text-gray-800">
            {companyName}
          </div>
          <h4 className="font-semibold">{title}</h4>
          <Link href={`/location/${location.name}`}>
            <a className="text-xs text-gray-800">{location.name}</a>
          </Link>
          <p className="text-sm text-gray-700">
            {description.substr(0, 175)}...{' '}
            <span className="hover:underline">Show more</span>
          </p>
          {tags.map(({ name, id }) => (
            <Link key={id} href={`/tag/${name}`}>
              <a className="inline-block bg-indigo-100 hover:bg-indigo-300 rounded-full px-2 py-0 text-xs font-semibold text-gray-700 mr-2 mb-2">
                #{name}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex justify-end">
          <div className="text-xs">{pinned ? <p>Premium</p> : null}</div>
          <div className="text-gray-600 justify-items-end text-sm">
            {daysSinceEpoch}
            <span className="text-xs">d</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
