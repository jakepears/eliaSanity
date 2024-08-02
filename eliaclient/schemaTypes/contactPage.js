export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'inquiriesTitle',
      title: 'Inquiries Title',
      type: 'string',
    },
    {
      name: 'inquiriesDescription',
      title: 'Inquiries Description',
      type: 'text',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'openingTimes',
      title: 'Opening Times',
      type: 'string',
    },
    {
      name: 'networksTitle',
      title: 'Networks Title',
      type: 'string',
    },
    {
      name: 'socialNetworks',
      title: 'Social Networks',
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
      name: 'workplaceTitle',
      title: 'Workplace Title',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'text',
    },
  ],
}
