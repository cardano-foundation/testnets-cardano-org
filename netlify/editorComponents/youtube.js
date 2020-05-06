import React from 'react'

export default {
  id: 'youtube',
  // Visible label
  label: 'YouTube',
  fields: [
    {
      name: 'id',
      label: 'Video id',
      widget: 'string'
    }
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<!--\sembed\syoutube\/([^\s]+)\s-->$/,
  // Function to extract data elements from the regexp match
  fromBlock: (match) => ({
    id: match[1]
  }),
  // Function to create a text block from an instance of this component
  toBlock: ({ id }) => `<!-- embed youtube/${id} -->`,
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: ({ id }) => (
    <p>Embedded YouTube video - {id}</p>
  )
}
