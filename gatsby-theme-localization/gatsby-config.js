module.exports = ({ intlPlugin = {} }) => ({
  plugins: [
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        ...intlPlugin
      }
    }
  ]
})
