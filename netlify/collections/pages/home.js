export default {
  name: 'home_page',
  label: 'home page',
  folder: 'resources/content/index',
  create: false,
  delete: false,
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string'
    },
    {
      name: 'content',
      label: 'home page content',
      widget: 'object',
      fields: [
        {
          name: 'title',
          label: 'Page title',
          widget: 'string'
        }
      ]
    }
  ]
}
