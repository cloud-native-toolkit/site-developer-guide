var plugins = [{
      plugin: require('/Users/mjperrins/projects/cat/guide/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[{"resolve":"/Users/mjperrins/projects/cat/guide/node_modules/gatsby-remark-images","id":"3626c0e0-58d4-5046-b0e5-cb7731a052f2","name":"gatsby-remark-images","version":"3.1.26","pluginOptions":{"plugins":[]},"nodeAPIs":[],"browserAPIs":["onRouteUpdate"],"ssrAPIs":["onRenderBody"]}],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-unwrap-images"},{"resolve":"gatsby-remark-smartypants"},{"resolve":"gatsby-remark-images","options":{"maxWidth":1152,"linkImagesToOriginal":false,"quality":75,"withWebp":false}},{"resolve":"gatsby-remark-responsive-iframe"},{"resolve":"gatsby-remark-copy-linked-files"}],"remarkPlugins":[null],"defaultLayouts":{"default":"/Users/mjperrins/projects/cat/guide/node_modules/gatsby-theme-carbon/src/templates/Default.js","home":"/Users/mjperrins/projects/cat/guide/node_modules/gatsby-theme-carbon/src/templates/Homepage.js"}},
    },{
      plugin: require('/Users/mjperrins/projects/cat/guide/node_modules/gatsby-remark-images/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mjperrins/projects/cat/guide/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Carbon Design Gatsby Theme","short_name":"Gatsby Theme Carbon","start_url":"/","background_color":"#ffffff","theme_color":"#0f62fe","display":"browser","icon":"/Users/mjperrins/projects/cat/guide/node_modules/gatsby-theme-carbon/src/images/favicon.png"},
    },{
      plugin: require('/Users/mjperrins/projects/cat/guide/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mjperrins/projects/cat/guide/node_modules/gatsby-theme-carbon/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
