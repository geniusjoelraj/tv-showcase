import { defineQuery } from 'next-sanity'

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(_createdAt asc) {
    _id,
    title,
    mediaType,
    videoUrl,
    imageUrl,
    image {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt,
      hotspot,
      crop
    },
    videoFile {
      asset->{
        _id,
        url,
        mimeType
      }
    },
    category,
    year,
    desc
  }
`)
