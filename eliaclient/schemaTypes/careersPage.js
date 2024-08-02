export default {
  name: 'careersPage',
  title: 'Careers Page',
  type: 'document',
  fields: [
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'text',
    },
    {
      name: 'openPositionsTitle',
      title: 'Open Positions Title',
      type: 'string',
    },
    {
      name: 'openPositions',
      title: 'Open Positions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Position Title'},
            {name: 'description', type: 'text', title: 'Position Description'},
            {name: 'applyLink', type: 'url', title: 'Apply Link'},
          ],
        },
      ],
    },
  ],
}
