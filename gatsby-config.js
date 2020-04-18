const pathPrefix = process.env.TRAVIS_BRANCH === 'master' ? '/' : (process.env.PATH_PREFIX || '/');

module.exports = {
  siteMetadata: {
    title: 'IBM Garage Cloud Native Toolkit',
    description: 'Cloud Native Toolkit to enable development with IBM Cloud and Red Hat OpenShift',
    keywords: 'ibm,garage,cloud,native,toolkit,devops,patterns,terraform,tekton,argodcd,sonarqube,artifactory,openshift,iks,kubernetes',
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
        trackingId: "UA-153689700-1",
        head: true
      },
    }

  ]
};
