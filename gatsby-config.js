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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: "UA-153689700-1",
      },
    },
  ],
  pathPrefix: "/ibm-garage-developer-guide-staging",
};
