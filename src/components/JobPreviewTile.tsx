import React from 'react'
import Link from 'next/link'
import theme from '../styles/theme'
import { ONE_WEEK_EPOCH } from '../lib/constants'
import { device } from '../lib/mediaQueries'

type Props = {
  job: Models.JobWithRelations
}

const JobPreviewTile = ({ job }: Props) => {
  const {
    urlSlug,
    type,
    featured,
    companyName,
    location,
    title,
    createdEpoch,
    daysSinceEpoch,
    tags,
  } = job

  return (
    <Link href={`/remote-jobs/${urlSlug}`}>
      <section className={featured ? 'job-card premium' : 'job-card'}>
        <div id="left">
          <h4>{companyName}</h4>
          <h3 className="title custom-underline">{title}</h3>
          <p>
            {location.name} · {type.name}
          </p>
          <div className="tags">
            {tags.map(({ name, slug }) => (
              <Link href={`/tags/${slug}`}>
                <a id="tag-link">{name}</a>
              </Link>
            ))}
          </div>
        </div>
        {featured && (
          <div id="center">
            {/* Check featured posting is less than 1 Week Old */}
            {Math.round(Date.now() / 1000) - ONE_WEEK_EPOCH < createdEpoch ? (
              <div id="featured">Featured</div>
            ) : null}
          </div>
        )}

        <div id="right">{daysSinceEpoch}d</div>

        <style jsx>{`
          .job-card {
            display: flex;
            background-color: white;
            width: 100%;
            max-width: 600px;
            margin: 0.3rem 0;
            padding: 0.75rem 0.25rem;
            font-family: ${theme.fontFamily.sansSerif};
            border: 1px solid lightgray;
            box-shadow: -1px 1px lightgray, -2px 2px lightgray,
              -3px 3px lightgray, -4px 4px lightgray;
            cursor: pointer;

            @media ${device.sm} {
              max-width: 800px;
            }
            &:hover {
              background-color: whitesmoke;
              .custom-underline:before {
                visibility: visible;
                width: 100%;
              }
            }
          }
          #left {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            flex-grow: 1;
            width: 75%;
            padding: 0 0.25rem;
            h4 {
              margin-top: -5px;
              line-height: 1.3rem;
              font-weight: bold;
              color: gray;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 1rem;

              @media ${device.sm} {
                font-size: 1.25rem;
                line-height: 1.5rem;
              }
            }
            .title {
              max-width: 100%;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              font-weight: 600;
              font-size: 1rem;
              line-height: 1rem;

              @media ${device.sm} {
                font-size: 1.25rem;
                line-height: 1.5rem;
              }
            }
            p {
              text-transform: capitalize;
              line-height: 1.25rem;
              font-size: 0.9rem;
              font-weight: 500;
              margin-top: -3px;
              margin-bottom: 0.4rem;
            }
            .tags {
              z-index: 100;
              overflow: visible;
              margin-left: -2px;
              margin-top: -4px;
              padding: 0;
            }
          }
          #center {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          #right {
            width: 10%;
            align-items: right;
            text-align: right;
            margin-right: 5px;
            padding: 0 0.25rem;
            font-size: 0.9rem;
            font-weight: 500;
          }
          #featured {
            background-color: ${theme.colors.secondary};
            color: ${theme.colors.primary};
            font-size: 0.7rem;
            font-weight: bold;
            padding: 0 0.25rem;
            border-radius: 0.25rem;

            @media ${device.sm} {
              font-size: 0.9rem;
              padding: 0 0.25rem;
            }
          }
          #tag-link {
            overflow: visible;
            background-color: ${theme.colors.primary};
            margin: 0 0.09rem;
            font-size: 0.7rem;
            font-weight: 600;
            border-radius: 0.25rem;
            padding: 0.2rem 0.25rem;
            color: whitesmoke;

            @media ${device.sm} {
              font-size: 0.9rem;
              margin: 0 0.125rem;
            }

            &:hover {
              color: ${theme.colors.secondary};
            }
          }
          .custom-underline {
            position: relative;
            &:before {
              content: '';
              position: absolute;
              width: 0;
              height: 2px;
              bottom: 0;
              left: 0;
              background-color: ${theme.colors.primary};
              visibility: hidden;
              transition: all 0.3s ease-in-out;
            }
          }
          .premium {
            border: 1px solid ${theme.colors.secondary};
            box-shadow: -1px 1px ${theme.colors.secondary},
              -2px 2px ${theme.colors.secondary},
              -3px 3px ${theme.colors.secondary},
              -4px 4px ${theme.colors.secondary};
          }

          @media ${device.sm} {
            #tag-link {
              font-size: 0.9rem;
              margin: 0 0.125rem;
            }
          }
        `}</style>
      </section>
    </Link>
  )
}

export default JobPreviewTile
