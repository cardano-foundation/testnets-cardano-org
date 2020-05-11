const data = require('./data')
const crypto = require('crypto')

module.exports = ({ actions }) => {
  const { createNode } = actions
  const articles = data.get('articles')

  function findNextLink (children) {
    let path
    const childrenValues = [ ...children ]
    while (!path && childrenValues.length > 0) {
      const next = childrenValues.shift()
      if (next.content) {
        path = next.path
      } else {
        path = findNextLink(next.children)
      }
    }

    return path
  }

  function getHeaderLinks (articles, lang) {
    const headerLinks = []
    articles.forEach(article => {
      const path = article.content ? article.path : findNextLink(article.children)

      if (path) {
        headerLinks.push({
          path: `/${lang}${path}`,
          label: article.title
        })
      }
    })

    return headerLinks
  }

  createNode({
    mainNavigationLinks: Object.keys(articles).map(lang => ({
      lang,
      items: getHeaderLinks(articles[lang], lang)
    })),
    id: `main-navigation-links`,
    parent: null,
    children: [],
    internal: {
      type: 'MainNavigationLinks',
      description: 'Main navigation links taken from articles',
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(articles))
        .digest(`hex`)
    }
  })

  function createArticleNodes (articles, lang) {
    articles.forEach(article => {
      createNode({
        path: article.path,
        id: `document-id-${article.path}-${lang}`,
        content: article.content,
        title: article.title,
        fullTitle: article.fullTitle,
        lastUpdatedFormatted: article.lastUpdatedFormatted,
        lang,
        parent: null,
        children: [],
        internal: {
          type: 'DocumentationArticle',
          description: 'Documentation article',
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify({ ...article, lang }))
            .digest(`hex`)
        }
      })

      if (article.children.length > 0) {
        createArticleNodes(article.children, lang)
      }
    })
  }

  Object.keys(articles).forEach(lang => {
    createArticleNodes(articles[lang], lang)
  })
}
