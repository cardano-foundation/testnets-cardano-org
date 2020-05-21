export default {
  name: 'global_content',
  label: 'Global content',
  folder: 'resources/content/global',
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
        },
        {
          name: 'faucet_content',
          label: 'Faucet content',
          widget: 'object',
          fields: [
            {
              name: 'funds',
              label: 'Funds',
              widget: 'string'
            },
            {
              name: 'invalid_address',
              label: 'Invalid address',
              widget: 'string'
            },
            {
              name: 'server_error',
              label: 'Server error',
              widget: 'string'
            },
            {
              name: 'endpoint_not_found',
              label: 'Endpoint not found',
              widget: 'string'
            },
            {
              name: 'too_many_attempts',
              label: 'Too many requests',
              widget: 'string'
            },
            {
              name: 'too_many_attempts_retry',
              label: 'Too many requests with retry after',
              widget: 'string',
              hint: '{{ time }} is replaced with a localised date time for the user to retry after'
            },
            {
              name: 'address_helper_text',
              label: 'Address helper text',
              widget: 'string'
            },
            {
              name: 'api_key_helper_text',
              label: 'API key helper text',
              widget: 'string'
            },
            {
              name: 'request_funds',
              label: 'Request funds',
              widget: 'string'
            },
            {
              name: 'request_more_funds',
              label: 'Request more funds',
              widget: 'string'
            },
            {
              name: 'success_heading',
              label: 'Success title',
              widget: 'string'
            },
            {
              name: 'verify_transaction_hash',
              label: 'Verify transaction hash',
              widget: 'string'
            },
            {
              name: 'transaction_successful',
              label: 'Transaction successful',
              widget: 'string',
              hint: '{{ amount }} will be replaced with the amount of ADA transferred. {{ address }} will be replaced with the address the ADA was sent to.'
            }
          ]
        },
        {
          name: 'downloaders_content',
          label: 'Downloaders content',
          widget: 'object',
          fields: [
            {
              name: 'version',
              label: 'Version label',
              widget: 'string'
            },
            {
              name: 'sha_checksum',
              label: 'SHA256 checksum label',
              widget: 'string'
            },
            {
              name: 'verify_signature',
              label: 'Verify signature label',
              widget: 'string'
            },
            {
              name: 'pgp_signature',
              label: 'PGP signature label',
              widget: 'string'
            },
            {
              name: 'verify_checksum',
              label: 'Verify checksum label',
              widget: 'string'
            },
            {
              name: 'copy_to_clipboard',
              label: 'Copy to clipboard label',
              widget: 'string'
            },
            {
              name: 'error_fetching_data',
              label: 'Generic server error',
              widget: 'string'
            },
            {
              name: 'platforms_order',
              label: 'Platforms order',
              widget: 'list',
              allow_add: false,
              field: {
                label: 'Platform',
                name: 'platform_name',
                widget: 'string'
              }
            },
            {
              name: 'windows',
              label: 'Windows platform',
              widget: 'object',
              fields: [
                {
                  name: 'short_label',
                  label: 'Shorthand label',
                  widget: 'string'
                },
                {
                  name: 'full_label',
                  label: 'Full label',
                  widget: 'string'
                },
                {
                  name: 'checksum_instructions',
                  label: 'Checksum instructions',
                  widget: 'markdown'
                },
                {
                  name: 'signature_instructions',
                  label: 'PGP signature instructions',
                  widget: 'markdown'
                }
              ]
            },
            {
              name: 'darwin',
              label: 'Mac OS platform',
              widget: 'object',
              fields: [
                {
                  name: 'short_label',
                  label: 'Shorthand label',
                  widget: 'string'
                },
                {
                  name: 'full_label',
                  label: 'Full label',
                  widget: 'string'
                },
                {
                  name: 'checksum_instructions',
                  label: 'Checksum instructions',
                  widget: 'markdown'
                },
                {
                  name: 'signature_instructions',
                  label: 'PGP signature instructions',
                  widget: 'markdown'
                }
              ]
            },
            {
              name: 'linux',
              label: 'Linux platform',
              widget: 'object',
              fields: [
                {
                  name: 'short_label',
                  label: 'Shorthand label',
                  widget: 'string'
                },
                {
                  name: 'full_label',
                  label: 'Full label',
                  widget: 'string'
                },
                {
                  name: 'checksum_instructions',
                  label: 'Checksum instructions',
                  widget: 'markdown'
                },
                {
                  name: 'signature_instructions',
                  label: 'PGP signature instructions',
                  widget: 'markdown'
                }
              ]
            }
          ]
        },
        {
          name: 'staking_calculator',
          label: 'Staking calculator',
          widget: 'object',
          fields: [
            {
              name: 'select_a_calculator',
              label: 'Select a calculator',
              widget: 'string'
            },
            {
              name: 'i_want_to',
              label: 'I want to',
              widget: 'string'
            },
            {
              name: 'delegate_my_stake',
              label: 'Delegate my stake',
              widget: 'string'
            },
            {
              name: 'run_a_stake_pool',
              label: 'Run a stake pool',
              widget: 'string'
            },
            {
              name: 'show_advanced_options',
              label: 'Show advanced options',
              widget: 'string'
            },
            {
              name: 'ada_label',
              label: 'ADA label',
              widget: 'string'
            },
            {
              name: 'ada_descriptor',
              label: 'ADA field description',
              widget: 'string'
            },
            {
              name: 'reset',
              label: 'Reset',
              widget: 'string'
            },
            {
              name: 'currency_label',
              label: 'Currency label',
              widget: 'string'
            },
            {
              name: 'currency_descriptor',
              label: 'Currency field description',
              widget: 'string'
            },
            {
              name: 'exchange_rate_label',
              label: 'Exchange rate label',
              widget: 'string'
            },
            {
              name: 'exchange_rate_descriptor',
              label: 'Exchange rate field description',
              widget: 'markdown'
            },
            {
              name: 'fixed_fee_label',
              label: 'Fixed fee label',
              widget: 'string'
            },
            {
              name: 'fixed_fee_descriptor_ada',
              label: 'Fixed fee field description (when using ADA)',
              widget: 'string'
            },
            {
              name: 'fixed_fee_descriptor',
              label: 'Fixed fee field description (when using currency othet than ADA)',
              widget: 'string'
            },
            {
              name: 'stake_pool_control_label',
              label: 'Stake pool control label',
              widget: 'string'
            },
            {
              name: 'stake_pool_control_descriptor',
              label: 'Stake pool control field description',
              widget: 'string'
            },
            {
              name: 'total_stake_pools_label',
              label: 'Total stake pools label',
              widget: 'string'
            },
            {
              name: 'participation_rate_label',
              label: 'Participation rate label',
              widget: 'string'
            },
            {
              name: 'participation_rate_descriptor',
              label: 'Participation rate field description',
              widget: 'string'
            },
            {
              name: 'operators_stake_label',
              label: 'Operators stake label',
              widget: 'string'
            },
            {
              name: 'operators_stake_descriptor',
              label: 'Operators stake field description',
              widget: 'string'
            },
            {
              name: 'stake_pool_margin_label',
              label: 'Stake pool margin label',
              widget: 'string'
            },
            {
              name: 'stake_pool_margin_descriptor',
              label: 'Stake pool margin field description',
              widget: 'string'
            },
            {
              name: 'stake_pool_performance_label',
              label: 'Stake pool performance label',
              widget: 'string'
            },
            {
              name: 'stake_pool_performance_descriptor',
              label: 'Stake pool performance field description',
              widget: 'string'
            },
            {
              name: 'delegation_rewards',
              label: 'Delegation rewards',
              widget: 'string'
            },
            {
              name: 'daily',
              label: 'Daily',
              widget: 'string'
            },
            {
              name: 'per_epoch',
              label: 'Per epoch',
              widget: 'string'
            },
            {
              name: 'monthly',
              label: 'Monthly',
              widget: 'string'
            },
            {
              name: 'yearly',
              label: 'Yearly',
              widget: 'string'
            },
            {
              name: 'yield',
              label: 'Yield',
              widget: 'string'
            },
            {
              name: 'private_stake_pool_label',
              label: 'Private stake pool label',
              widget: 'string'
            },
            {
              name: 'private_stake_pool_descriptor',
              label: 'Private stake pool input description',
              widget: 'string'
            },
            {
              name: 'running_costs',
              label: 'Running costs',
              widget: 'string'
            },
            {
              name: 'stake_pool_operation_rewards',
              label: 'Stake pool operation rewards',
              widget: 'string'
            },
            {
              name: 'combined_rewards',
              label: 'Combined rewards',
              widget: 'string'
            }
          ]
        }
      ]
    }
  ]
}
