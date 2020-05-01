module.exports = {
  plugins: [
    '@rhysforyou/gatsby-plugin-react-helmet-async',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path: `${__dirname}/resources`
      }
    },
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'IOHK Gatsby Starter Documentation',
        short_name: 'IOHK Docs Starter',
        start_url: '/',
        icon: 'resources/images/manifest-icon.png',
        background_color: '#121326',
        theme_color: '#1fc1c3',
        display: 'minimal-ui',
        icon_options: {
          purpose: 'maskable'
        }
      }
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true
        }
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Remove dead code
        pure: true
      }
    },
    'gatsby-plugin-offline'
  ]
}
