module.exports = {
  siteMetadata: {
    title: 'IBM Garage Cloud Native Toolkit',
    description: 'Cloud Native Toolkit to enable development with IBM Cloud and RedHat',
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
    }

  ],
  pathPrefix: "/ibm-garage-developer-guide",
};
