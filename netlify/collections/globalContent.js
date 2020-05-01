export default {
  name: 'meta_data',
  label: 'Meta data',
  folder: 'resources/content/meta',
  create: false,
  delete: false,
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string'
    },
    {
      label: 'Global content',
      name: 'content',
      widget: 'object',
      fields: [
        {
          name: 'main_title',
          label: 'Main title',
          widget: 'string'
        },
        {
          name: 'select_language',
          label: 'Select language label',
          widget: 'string'
        },
        {
          name: 'select_theme',
          label: 'Select theme label',
          widget: 'string'
        },
        {
          name: 'last_updated',
          label: 'Last updated label',
          widget: 'string'
        },
        {
          name: 'report_an_issue',
          label: 'Report an issue label',
          widget: 'string'
        },
        {
          name: 'search',
          label: 'Search label',
          widget: 'string'
        },
        {
          name: 'search_form_aria_label',
          label: 'Search form aria label',
          widget: 'string'
        },
        {
          name: 'search_form_submit_aria_label',
          label: 'Search form submit aria label',
          widget: 'string'
        },
        {
          name: 'open_search_bar',
          label: 'Open search bar aria label',
          widget: 'string'
        },
        {
          name: 'close_search_bar',
          label: 'Close search bar aria label',
          widget: 'string'
        },
        {
          name: 'main_navigation_label',
          label: 'Main navigation aria label',
          widget: 'string'
        },
        {
          name: 'close_main_navigation',
          label: 'Close main navigation aria label',
          widget: 'string'
        },
        {
          name: 'open_main_navigation',
          label: 'Open main navigation aria label',
          widget: 'string'
        },
        {
          name: 'logo_alt',
          label: 'Main logo alt image tag',
          widget: 'string'
        },
        {
          name: 'kevm_description',
          label: 'KEVM description',
          widget: 'markdown'
        },
        {
          name: 'iele_description',
          label: 'IELE description',
          widget: 'markdown'
        }
      ]
    }
  ]
}
