import config from '../../src/config'
import { getAllArticlesWidget } from '../helpers'
const buildCollection = language => {
  return {
    name: `articles-${language}`,
    label: `Articles (${language})`,
    folder: `resources/content/articles/${language}`,
    slug: `{{year}}-{{month}}-{{day}}_{{hour}}-{{minute}}-{{second}}_{{slug}}-${language}`,
    create: true,
    delete: true,
    summary: `{{fields.title}} - {{fields.description}}`,
    fields: [
      getAllArticlesWidget(language, {
        required: false,
        multiple: false,
        name: 'parent',
        label: 'Parent article',
        hint: 'Does this article reside under another article?'
      }),
      {
        label: 'Title',
        name: 'title',
        widget: 'string',
        required: true
      },
      {
        label: 'Description',
        name: 'description',
        hint: 'Used to help identify the article on Netlify CMS',
        widget: 'string',
        required: true
      },
      {
        label: 'Order',
        name: 'order',
        widget: 'number',
        min: 1,
        default: 1,
        hint:
          'The position of this article relative to its siblings. (Lower numbers first)'
      },
      {
        label: 'External link',
        name: 'external_href',
        widget: 'string',
        default: '',
        required: false,
        hint: 'Link to an external resource instead of providing content. The link will slot into the navigation.'
      },
      {
        label: 'When was this article last updated?',
        name: 'last_updated',
        widget: 'datetime',
        format: 'YYYY-MM-DDTHH:mm:ssZ'
      },
      {
        label: 'Redirects from',
        name: 'redirects',
        required: false,
        widget: 'list',
        fields: [
          {
            name: 'from',
            label: 'From',
            widget: 'string'
          },
          {
            name: 'type',
            label: 'Type',
            hint: 'Redirect status. 301 is permanent. 302 is temporary.',
            widget: 'select',
            multiple: false,
            options: [
              {
                label: '301',
                value: 301
              },
              {
                label: '302',
                value: 302
              }
            ],
            default: null
          }
        ]
      },
      {
        label: 'Body',
        name: 'body',
        widget: 'markdown',
        required: false,
        hint: 'If no body is provided, then title appears as a \'heading\''
      }
    ]
  }
}

export default config.availableLanguages.map(({ key }) => buildCollection(key))
