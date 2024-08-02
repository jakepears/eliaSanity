export default {
  name: 'menu',
  title: 'Menu',
  type: 'document',
  fields: [
    {
      name: 'defaultPreviewImage',
      title: 'Default Preview Image',
      type: 'image',
      options: {
        hotspot: true,
        sources: ['unsplash'],
      },
    },
    {
      name: 'menuLinks',
      title: 'Menu Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'path', type: 'string', title: 'Path'},
            {name: 'text', type: 'string', title: 'Text'},
            {
              name: 'previewImage',
              title: 'Preview Image',
              type: 'image',
              options: {
                hotspot: true,
                sources: ['unsplash'],
              },
            },
          ],
        },
      ],
    },
  ],
}
