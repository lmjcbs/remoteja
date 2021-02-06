import React from 'react'
import JobPreviewTile from '../JobPreviewTile'

type JobCardProps = {
  jobs: JobWithRelations[]
}

const JobCardContainer = ({ jobs }: JobCardProps) => {
  return (
    <main>
      {jobs.map((job) => (
        <JobPreviewTile job={job} />
      ))}
      <style jsx>
        {`
          main {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: whitesmoke;
            width: 100%;
            flex-grow: 1;
            padding: 0rem 0.3rem 3rem 0.3rem;
          }
        `}
      </style>
    </main>
  )
}

export default JobCardContainer
