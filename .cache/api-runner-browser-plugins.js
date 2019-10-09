module.exports = [{
      plugin: require('/Users/mjperrins/projects/cat/guide/node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mjperrins/projects/cat/guide/node_modules/gatsby-plugin-lunr/gatsby-browser.js'),
      options: {"plugins":[],"languages":[{"name":"en","plugins":[null]}],"fields":[{"name":"title","store":true,"attributes":{"boost":30}},{"name":"keywords"},{"name":"path","store":true},{"name":"description","store":true},{"name":"content"}],"resolvers":{"SitePage":{}}},
    },{
      plugin: require('/Users/mjperrins/projects/cat/guide/node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[{"resolve":"/Users/mjperrins/projects/cat/guide/node_modules/gatsby-remark-images","id":"3626c0e0-58d4-5046-b0e5-cb7731a052f2","name":"gatsby-remark-images","version":"3.1.26","pluginOptions":{"plugins":[]},"nodeAPIs":[],"browserAPIs":["onRouteUpdate"],"ssrAPIs":["onRenderBody"]}],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-unwrap-images"},{"resolve":"gatsby-remark-smartypants"},{"resolve":"gatsby-remark-images","options":{"maxWidth":1152,"linkImagesToOriginal":false,"quality":75,"withWebp":false}},{"resolve":"gatsby-remark-responsive-iframe"},{"resolve":"gatsby-remark-copy-linked-files"}],"remarkPlugins":[null],"defaultLayouts":{"default":"/Users/mjperrins/projects/cat/guide/node_modules/gatsby-theme-carbon/src/templates/Default.js","home":"/Users/mjperrins/projects/cat/guide/node_modules/gatsby-theme-carbon/src/templates/Homepage.js"}},
    },{
      plugin: require('/Users/mjperrins/projects/cat/guide/node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mjperrins/projects/cat/guide/node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Carbon Design Gatsby Theme","short_name":"Gatsby Theme Carbon","start_url":"/","background_color":"#ffffff","theme_color":"#0f62fe","display":"browser","icon":"/Users/mjperrins/projects/cat/guide/node_modules/gatsby-theme-carbon/src/images/favicon.png"},
    },{
      plugin: require('/Users/mjperrins/projects/cat/guide/node_modules/gatsby-theme-carbon/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/mjperrins/projects/cat/guide/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
