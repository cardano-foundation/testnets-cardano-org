const path = require('path')
const data = require('../data')

function cleanNavigationContext (context) {
  context.hasContent = Boolean(context.content)
  delete context.content
  context.children.forEach(child => {
    cleanNavigationContext(child)
  })

  return context
}

function getContext (article) {
  return JSON.parse(JSON.stringify(article))
}

module.exports = ({ createPage }) => {
  const articleTemplate = path.join(__dirname, '../../../src/templates/Article.js')
  function createChildPages (lang, articles, { context = null } = {}) {
    articles.forEach((article, i) => {
      let next = i === articles.length - 1 ? null : articles[i + 1]
      const previous = i === 0 ? null : articles[i - 1]
      const navigationContext = context || cleanNavigationContext(getContext(article))
      /**
       * If we are a top-level navigation element
       * we use the first child as the _next_ link
       */
      if (Array.isArray(article.children) && article.children.length) {
        next = article.children[0]
      }
      if (article.content) {
        createPage({
          path: `/${lang}${article.path}`,
          component: articleTemplate,
          context: {
            pageTitle: article.title,
            navigationContext,
            content: article.content,
            lastUpdatedFormatted: article.lastUpdatedFormatted,
            lastUpdated: article.lastUpdated,
            lang,
            previous,
            next,
            hasNoChildContent: article.hasNoChildContent
          }
        })
      }

      if (article.children.length > 0) createChildPages(lang, article.children, { context: navigationContext })
    })
  }

  const articles = data.get('articles')
  Object.keys(articles).forEach((lang) => {
    createChildPages(lang, articles[lang])
  })
}
