export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
        sources: ['unsplash'],
      },
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'projectsIntro',
      title: 'Projects Introduction',
      type: 'text',
    },
    {
      name: 'articleTitle',
      title: 'Article Title',
      type: 'text',
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
    },
    {
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url',
    },
    {
      name: 'servicesSubtitle',
      title: 'Services Subtitle',
      type: 'string',
    },
    {
      name: 'servicesTitle',
      title: 'Services Title',
      type: 'text',
    },
    {
      name: 'featureImage',
      title: 'Feature Image',
      type: 'image',
      options: {
        hotspot: true,
        sources: ['unsplash'],
      },
    },
    {
      name: 'clientsTitle',
      title: 'Clients Title',
      type: 'string',
    },
    {
      name: 'clientsDescription',
      title: 'Clients Description',
      type: 'array',
      of: [{type: 'text'}],
    },
    {
      name: 'clientsAdditionalInfo',
      title: 'Clients Additional Info',
      type: 'array',
      of: [{type: 'text'}],
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
      name: 'twitterLink',
      title: 'Twitter Link',
      type: 'url',
    },
    {
      name: 'instagramLink',
      title: 'Instagram Link',
      type: 'url',
    },
    {
      name: 'linkedinLink',
      title: 'LinkedIn Link',
      type: 'url',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
  ],
}
