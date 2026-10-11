import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (rule) => rule.required(),
    }),
    // Image Option
    defineField({
      name: 'image',
      title: 'Image File (Upload)',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.mediaType && parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
      description: 'Or paste a direct image URL if not uploading an image file',
      hidden: ({ parent }) => parent?.mediaType && parent?.mediaType !== 'image',
    }),
    // Video Options (Upload File or Direct URL)
    defineField({
      name: 'videoFile',
      title: 'Video File (Upload)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (MP4 / WebM / Stream)',
      type: 'url',
      description: 'Or paste a direct video link if not uploading a file',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    // Portfolio Card Meta (Optional)
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Branding \\ Packaging \\ Web',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2026',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short project summary displayed on cards',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      mediaType: 'mediaType',
      image: 'image',
    },
    prepare({ title, mediaType, image }) {
      const typeLabel = mediaType
        ? mediaType.charAt(0).toUpperCase() + mediaType.slice(1)
        : 'Image'
      return {
        title,
        subtitle: `Media: ${typeLabel}`,
        media: image,
      }
    },
  },
})
