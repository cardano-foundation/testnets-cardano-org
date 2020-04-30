# IOHK Documentation Gatsby Starter

[__EXAMPLE__ - gatsby-starter-iohk-docs.netlify.app](https://gatsby-starter-iohk-docs.netlify.app/)

The [Gatsby](https://www.gatsbyjs.org/) starter template used by [IOHK](https://iohk.io/) to build documentation web assets. Built on [gatsby-starter-iohk-default](https://github.com/input-output-hk/gatsby-starter-iohk-default). Check out [gatsby-starter-iohk-default](https://github.com/input-output-hk/gatsby-starter-iohk-default) for additional documentation.

```
gatsby new gatsby-starter-iohk-docs https://github.com/input-output-hk/gatsby-starter-iohk-docs
```

## Features

Everything that [gatsby-starter-iohk-default](https://github.com/input-output-hk/gatsby-starter-iohk-default) provides plus:

* CMS enabled hierarchial documentation
* Embed custom React components in markdown articles

## Configuration

See [gatsby-starter-iohk-default](https://github.com/input-output-hk/gatsby-starter-iohk-default) for full configuration. In addition to the default starter documentation the following config is available.

| Option | Notes |
| ------ | ----- |
| gitHubRepository | Optional string reference to the repository. If it is provided then the "Report an issue" link will be displayed on articles. |

## Pages

The documentation starter consists of only 3 static pages.

* `src/pages/index.js` the home page
* `src/pages/404.js` 404 page
* `src/pages/search.js` search page

All other pages are generated from articles which can be found in `resources/content/articles/<language>`. The articles have a flat file structure to accomodate Netlify CMS. Articles are linked hierarchically to parent articles to create a navigation structure. Articles were designed to be added via the CMS.

Each language can contain different articles, meaning the navigation structure does not need to be mirrored across different languages.

An example article: saved as `resources/content/articles/en/introduction.md`

```markdown
---
title: Introduction
parent: ''
order: 1
last_updated: "2020-04-20T15:40:10+01:00"
---
# Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac pretium metus. In tempus diam non lobortis tristique. Integer maximus fermentum vehicula. Vestibulum sodales diam maximus ipsum lobortis maximus. Praesent id mi augue. Vestibulum id eros id dolor gravida condimentum. Ut a nisi arcu. Suspendisse congue ligula ipsum, vitae consectetur nisl pellentesque ac. Integer sagittis turpis tincidunt diam laoreet, eu venenatis tortor tempus. Nulla iaculis scelerisque mauris, ut finibus nunc porta vitae. Ut aliquam sem odio, a lacinia urna varius porta. Nunc eget eleifend turpis. Nam vitae turpis nisi. Sed quis ligula tellus. Praesent nec augue faucibus, luctus turpis lacinia, vulputate metus.

```

* The articles title is used in the navigation as well as for the page title on top level navigation items.
* In this article there is no parent meaning this item will appear in the top level navigation as `<a href="/en/introduction/">Introduction</a>`.
* The order is set to 1. Order is an arbitrary number used for sorting navigation items on the same level. Where order is the same they are sorted alphabetically on title.
* Last updated is an ISO 8601 datetime string with UTC offset. This is converted to a UTC datetime string on the article page.
* Lastly the articles content is parsed as markdown. When an article has no markdown a page is not generated, however it will appear in the navigation. For top level navigation items it will link to the first child article with content. For sub navigation items an accordion will be used.

To create a child page on `introduction` we can simply reference the parent as `introduction`:

```markdown
---
title: Overview
parent: introduction
order: 1
last_updated: "2020-04-20T15:40:10+01:00"
---
# Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac pretium metus. In tempus diam non lobortis tristique. Integer maximus fermentum vehicula. Vestibulum sodales diam maximus ipsum lobortis maximus. Praesent id mi augue. Vestibulum id eros id dolor gravida condimentum. Ut a nisi arcu. Suspendisse congue ligula ipsum, vitae consectetur nisl pellentesque ac. Integer sagittis turpis tincidunt diam laoreet, eu venenatis tortor tempus. Nulla iaculis scelerisque mauris, ut finibus nunc porta vitae. Ut aliquam sem odio, a lacinia urna varius porta. Nunc eget eleifend turpis. Nam vitae turpis nisi. Sed quis ligula tellus. Praesent nec augue faucibus, luctus turpis lacinia, vulputate metus.

```

## Custom React components in markdown

Sometimes markdown alone isn't enough. In order to allow for custom React components whilst maintaining the navigation and documentation structure, custom React components can be injected into markdown. This is done using specific syntax and referencing the component to be included as follows:

```
<!-- include components/ExampleComponent -->
```

This will be replaced the component `ExampleComponent` in this case `src/components/MarkdownComponents/ExampleComponent`. To extend this for new components simply create a component and export it from `src/components/MarkdownComponents/index.js`. `ExampleComponent` is a reference to the named export in `src/components/MarkdownComponents/index.js`.

In the wider context of the full markdown file this could look like:

```markdown
---
title: Overview
parent: introduction
order: 1
last_updated: "2020-04-20T15:40:10+01:00"
---
# Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac pretium metus. In tempus diam non lobortis tristique. Integer maximus fermentum vehicula. Vestibulum sodales diam maximus ipsum lobortis maximus. Praesent id mi augue. Vestibulum id eros id dolor gravida condimentum. Ut a nisi arcu. Suspendisse congue ligula ipsum, vitae consectetur nisl pellentesque ac. Integer sagittis turpis tincidunt diam laoreet, eu venenatis tortor tempus. Nulla iaculis scelerisque mauris, ut finibus nunc porta vitae. Ut aliquam sem odio, a lacinia urna varius porta. Nunc eget eleifend turpis. Nam vitae turpis nisi. Sed quis ligula tellus. Praesent nec augue faucibus, luctus turpis lacinia, vulputate metus.

<!-- include components/ExampleComponent -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac pretium metus. In tempus diam non lobortis tristique. Integer maximus fermentum vehicula. Vestibulum sodales diam maximus ipsum lobortis maximus. Praesent id mi augue. Vestibulum id eros id dolor gravida condimentum. Ut a nisi arcu. Suspendisse congue ligula ipsum, vitae consectetur nisl pellentesque ac. Integer sagittis turpis tincidunt diam laoreet, eu venenatis tortor tempus. Nulla iaculis scelerisque mauris, ut finibus nunc porta vitae. Ut aliquam sem odio, a lacinia urna varius porta. Nunc eget eleifend turpis. Nam vitae turpis nisi. Sed quis ligula tellus. Praesent nec augue faucibus, luctus turpis lacinia, vulputate metus.

```
