import React from 'react'

export default {
  id: 'file',
  // Visible label
  label: 'File',
  fields: [
    {
      name: 'file',
      label: 'File',
      widget: 'file',
      allow_multiple: false
    },
    {
      name: 'label',
      label: 'Label',
      widget: 'string'
    },
    {
      name: 'title_prefix',
      label: 'Title prefix',
      widget: 'select',
      default: 'Document - ',
      options: [ 'Document - ' ]
    }
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^\[(.*)\]\((.*?)(\s"(Document\s-\s).*")?\)$/,
  // Function to extract data elements from the regexp match
  fromBlock: (match) => ({
    file: match[2],
    label: match[1],
    title_prefix: match[3]
  }),
  // Function to create a text block from an instance of this component
  toBlock: ({ file, label, title_prefix: titlePrefix }) => `[${label}](${file} "${titlePrefix}${label}")`,
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: ({ file, label, title_prefix: titlePrefix }) => (
    <a href={file} title={`${titlePrefix}${label}`} target='_blank' rel='noopener noreferrer'>{label}</a>
  )
}
