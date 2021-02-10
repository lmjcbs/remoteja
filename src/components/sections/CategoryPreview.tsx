import Link from 'next/link'
import JobPreviewTile from '../JobPreviewTile'
import theme from '../../styles/theme'

type CategoryPreviewProps = {
  name: string
  slug: string
  jobs: JobWithRelations[]
}

const CategoryPreview = ({ name, slug, jobs }: CategoryPreviewProps) => {
  return (
    <div className="wrapper">
      <h1 className="title">
        <Link href={`/categories/${slug}`}>
          <a>{name} Jobs</a>
        </Link>
      </h1>

      {jobs.map((job) => (
        <JobPreviewTile job={job} />
      ))}

      <h2 className="button">
        <Link href={`/categories/${slug}`}>
          <a>View All {name} Jobs</a>
        </Link>
      </h2>

      <style jsx>
        {`
          .wrapper {
            margin: 2rem 0;
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 100%;
            flex-grow: 1;
            padding: 0rem 0.3rem 3rem 0.3rem;
          }

          .title {
            text-align: left;
            font-size: 2rem;
            font-weight: 800;
            color: #383838;
          }

          .button {
            background-color: ${theme.colors.primary};
            margin-top: 1rem;
            padding: 0.25rem 0.5rem;
            color: whitesmoke;
          }
        `}
      </style>
    </div>
  )
}

export default CategoryPreview
