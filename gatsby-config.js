const pathPrefix = process.env.PATH_PREFIX || '/';

module.exports = {
  siteMetadata: {
    title: 'IBM Garage Cloud Native Toolkit',
    description: 'Cloud Native Toolkit to enable development with IBM Cloud and RedHat',
    keywords: 'gatsby,theme,carbon',
  },
  pathPrefix,
  plugins: [
    {
      resolve: 'gatsby-theme-carbon',
      options: {
        isSearchEnabled: true,
        repository: {
          baseUrl:
            'https://github.com/ibm-garage-cloud/ibm-garage-developer-guide',
          subDirectory: '/',
        },
      },
    },
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

  ]
};
