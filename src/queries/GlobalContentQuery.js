import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Language from '@input-output-hk/front-end-core-components/components/Language'

const GlobalContentQuery = ({ render }) => (
  <Language.Consumer>
    {({ key: lang }) => (
      <StaticQuery
        query={graphql`
          query {
            allFile(filter:{relativePath:{glob:"content/global/*.md"}}) {
              nodes{
                relativePath,
                childMarkdownRemark{
                  frontmatter {
                    content {
                      main_title
                      main_title_aria_label
                      select_language
                      select_theme
                      last_updated
                      report_an_issue
                      search
                      search_form_aria_label
                      search_form_submit_aria_label
                      open_search_bar
                      close_search_bar
                      main_navigation_label
                      close_main_navigation
                      open_main_navigation
                      logo_alt
                      staking_calculator {
                        select_a_calculator
                        i_want_to
                        delegate_my_stake
                        run_a_stake_pool
                        show_advanced_options
                        reset
                        share
                        tweet
                        copy_to_clipboard
                        ada_label
                        ada_descriptor
                        ada_label_operator
                        ada_descriptor_operator
                        currency_label
                        currency_descriptor
                        exchange_rate_label
                        exchange_rate_descriptor
                        fixed_fee_label
                        fixed_fee_descriptor_ada
                        fixed_fee_descriptor
                        stake_pool_control_label
                        stake_pool_control_descriptor
                        total_stake_pools_label
                        participation_rate_label
                        participation_rate_descriptor
                        operators_stake_label
                        operators_stake_descriptor
                        stake_pool_margin_label
                        stake_pool_margin_descriptor
                        stake_pool_performance_label
                        stake_pool_performance_descriptor
                        delegation_rewards
                        daily
                        yield
                        per_epoch
                        monthly
                        yearly
                        private_stake_pool_label
                        private_stake_pool_descriptor
                        running_costs
                        stake_pool_operation_rewards
                        combined_rewards
                        transaction_fees_per_epoch_label
                        transaction_fees_per_epoch_descriptor
                        influence_factor_label
                        influence_factor_descriptor
                      }
                      kevm_description
                      iele_description
                      faucet_content {
                        funds
                        invalid_address
                        server_error
                        endpoint_not_found
                        too_many_attempts
                        too_many_attempts_retry
                        address_helper_text
                        api_key_helper_text
                        request_funds
                        request_more_funds
                        success_heading
                        verify_transaction_hash
                        transaction_successful
                      }
                      downloaders_content {
                        version
                        error_fetching_data
                        platforms_order {
                          platform_name
                        }
                        sha_checksum
                        verify_signature
                        pgp_signature
                        verify_checksum
                        copy_to_clipboard
                        windows {
                          short_label
                          full_label
                          checksum_instructions
                          signature_instructions
                        }
                        darwin {
                          short_label
                          full_label
                          checksum_instructions
                          signature_instructions
                        }
                        linux {
                          short_label
                          full_label
                          checksum_instructions
                          signature_instructions
                        }
                      }
                    }
                  }
                }
              }
            }

            mainNavigationLinks {
              mainNavigationLinks {
                lang
                items {
                  label
                  path
                }
              }
            }
          }
        `}
        render={({ allFile, mainNavigationLinks }) => {
          const content = allFile.nodes.filter(node => node.relativePath === `content/global/global-${lang}.md`).shift()
          if (!content || !content.childMarkdownRemark) throw new Error(`No global translations found for language ${lang}`)

          const items = (mainNavigationLinks.mainNavigationLinks.filter((itemSet) => itemSet.lang === lang).shift() || {}).items
          if (!items) throw new Error(`No header links for language ${lang}`)

          return render(content.childMarkdownRemark.frontmatter.content, items)
        }}
      />
    )}
  </Language.Consumer>
)

GlobalContentQuery.propTypes = {
  render: PropTypes.func.isRequired
}

export default GlobalContentQuery
