module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-dropbox`,
      options: {
        accessToken: `sl.AoQBP_9jbiSp5dvUvziiHy_DiPNfRtWXxEFtHsBb3B7hgG4nR_cvbrkuhIQdArwafILBnaALs5xxVdODMvg0FpFHTFyaFA6XChkiiDFBTL8QHq-yNpq3lArL1TP-1Hkr7yt01Jc`,
        extensions: ['.mp3'],
        path: '/Ryan/DK Library 256 mp3s',
        recursive: false,
        createFolderNodes: false,
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `keyuqb1sfM9ZUvsS0`,
        concurrency: 5,
        tables: [
          {
            baseId: `appc9QlhzusUzuTvp`,
            tableName: `Tracks`,
            // tableView: `YOUR_TABLE_VIEW_NAME`, // optional
            // queryName: `OPTIONAL_NAME_TO_IDENTIFY_TABLE`, // optionally default is false - makes all records in this table a separate node type, based on your tableView, or if not present, tableName, e.g. a table called "Fruit" would become "allAirtableFruit". Useful when pulling many airtables with similar structures or fields that have different types. See https://github.com/jbolda/gatsby-source-airtable/pull/52.
            // mapping: { `CASE_SENSITIVE_COLUMN_NAME`: `VALUE_FORMAT` }, // optional, e.g. "text/markdown", "fileNode"
            tableLinks: [`Vibes`, `Genres`, `Playlists`, `Parent`], // optional, for deep linking to records across tables.
            createSeparateNodeType: false, // boolean, default is false, see the documentation on naming conflicts for more information
            separateMapType: false, // boolean, default is false, see the documentation on using markdown and attachments for more information
          },
          {
            baseId: `appc9QlhzusUzuTvp`,
            tableName: `Vibes`,
            tableLinks: [`Tracks`], // optional, for deep linking to records across tables.
          },
          {
            baseId: `appc9QlhzusUzuTvp`,
            tableName: `Genres`,
            tableLinks: [`Tracks`], // optional, for deep linking to records across tables.
          },
          {
            baseId: `appc9QlhzusUzuTvp`,
            tableName: `Playlists`,
            tableLinks: [`Tracks`], // optional, for deep linking to records across tables.
          },
          {
            baseId: `appc9QlhzusUzuTvp`,
            tableName: `Features`,
            tableLinks: [`Tracks`, `Vibes`, `Genres`], // optional, for deep linking to records across tables.
          },
        ],
      },
    },
    
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
