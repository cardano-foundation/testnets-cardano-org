import React from 'react'

export default {
  id: 'grafana',
  // Visible label
  label: 'Grafana panel',
  fields: [
    {
      name: 'url',
      label: 'Embed URL (theme is automatically applied)',
      widget: 'string'
    }
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<!--\sembed\sgrafana\/([^\s]+)\s-->$/,
  // Function to extract data elements from the regexp match
  fromBlock: (match) => ({
    url: match[1]
  }),
  // Function to create a text block from an instance of this component
  toBlock: ({ url }) => `<!-- embed grafana/${url} -->`,
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: ({ url }) => (
    <p>Embedded Grafana panel - {url}</p>
  )
}
