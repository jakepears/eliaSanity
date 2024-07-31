export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
        sources: ['unsplash'],
      },
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },

    {
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{type: 'text'}],
    },
    {
      name: 'overviewTitle',
      title: 'Overview Title',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{type: 'text'}],
    },
    {
      name: 'detailImage',
      title: 'Detail Image',
      type: 'image',
      options: {
        hotspot: true,
        sources: ['unsplash'],
      },
    },
    {
      name: 'conclusion',
      title: 'Conclusion',
      type: 'text',
    },
    {
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
    },
  ],
}
