module.exports = {
  siteMetadata: {
    title: `Pinged | Get updates on your favorite projects`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/pages/assets/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`
    }
  ],
}
