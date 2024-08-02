export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      sources: ['unsplash'],
    },
    {
      name: 'aboutUsTitle',
      title: 'About Us Title',
      type: 'string',
    },
    {
      name: 'aboutUsDescription',
      title: 'About Us Description',
      type: 'array',
      of: [{type: 'text'}],
    },
    {
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description'},
          ],
        },
      ],
    },
    {
      name: 'featureImage',
      title: 'Feature Image',
      type: 'image',
      options: {hotspot: true},
      sources: ['unsplash'],
    },
    {
      name: 'clientsTitle',
      title: 'Clients Title',
      type: 'string',
    },
    {
      name: 'clientLogos',
      title: 'Client Logos',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true, sources: ['unsplash']}}],
    },
    {
      name: 'officeImage',
      title: 'Office Image',
      type: 'image',
      options: {hotspot: true},
      sources: ['unsplash'],
    },
    {
      name: 'workplaceTitle',
      title: 'Workplace Title',
      type: 'string',
    },
    {
      name: 'footerTitle',
      title: 'Footer Title',
      type: 'string',
    },
    {
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'string',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'url', type: 'url', title: 'URL'},
          ],
        },
      ],
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
  ],
}
