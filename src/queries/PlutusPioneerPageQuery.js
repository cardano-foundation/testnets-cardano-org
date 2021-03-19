import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Language from '@input-output-hk/front-end-core-components/components/Language'

const PlutusPioneerPageQuery = ({ render }) => (
  <Language.Consumer>
    {({ key: lang }) => (
      <StaticQuery
        query={graphql`
          query {
            allFile(filter:{relativePath:{glob:"content/pages/plutus-pioneer-program/*.md"}}) {
              nodes{
                relativePath,
                childMarkdownRemark{
                  frontmatter {
                    content {
                      hero_content
                      hero_cta_label
                      hero_cta_href
                      available_testnets
                      tecnhical_support_content
                      technical_support_cta_label
                      technical_support_cta_href
                      more_label
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ allFile }) => {
          const content = allFile.nodes.filter(node => node.relativePath === `content/pages/plutus-pioneer-program/plutus-pioneer-program-${lang}.md`).shift()
          if (!content || !content.childMarkdownRemark) throw new Error(`No index translations found for language ${lang}`)
          return render(content.childMarkdownRemark.frontmatter.content)
        }}
      />
    )}
  </Language.Consumer>
)

PlutusPioneerPageQuery.propTypes = {
  render: PropTypes.func.isRequired
}

export default PlutusPioneerPageQuery
