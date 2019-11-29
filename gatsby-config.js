module.exports = {
  siteMetadata: {
    title: 'IBM Garage for Cloud Developer Tools',
    description: 'Developer Tools ',
    keywords: 'gatsby,theme,carbon',
  },
  plugins: ['gatsby-theme-carbon',
      'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'data',
        path: './src/data'
      },
    },
  ],
  pathPrefix: "/ibm-garage-developer-guide",
};
