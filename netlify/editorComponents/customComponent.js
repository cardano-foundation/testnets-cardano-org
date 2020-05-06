import React from 'react'
import MarkdownComponents from '../../src/components/MarkdownComponents'

export default {
  id: 'custom_component',
  // Visible label
  label: 'Component',
  fields: [
    {
      name: 'component',
      label: 'Component',
      widget: 'select',
      options: Object.keys(MarkdownComponents)
    }
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^<!--\sinclude\scomponents\/([^\s]+)\s-->$/,
  // Function to extract data elements from the regexp match
  fromBlock: (match) => ({
    component: match[1]
  }),
  // Function to create a text block from an instance of this component
  toBlock: ({ component }) => `<!-- include components/${component} -->`,
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: ({ component }) => {
    const Component = MarkdownComponents[component]
    if (!Component) return <p>Component not found</p>
    return (
      <p>Custom component - {component}</p>
    )
  }
}
