export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
    },
    {
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'link', type: 'string', title: 'Link'},
          ],
        },
      ],
    },
  ],
}
