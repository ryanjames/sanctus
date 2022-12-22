module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /graphics/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/config/typographyBase`,
        omitGoogleFont: true,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `iaub6mj1r3p0`,
        accessToken: `WgEpb3m0ALcdz8ouzQ0o6l-_N3oZZfYYHF5ooorGC-M`,
        downloadLocal: true,
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `keyKlOXsPPK17LujD`,
        concurrency: 5,
        tables: [
          {
            baseId: `appMlZDjXXmJYrF6k`,
            tableName: `Tracks`,
            // tableView: `YOUR_TABLE_VIEW_NAME`, // optional
            // queryName: `OPTIONAL_NAME_TO_IDENTIFY_TABLE`, // optionally default is false - makes all records in this table a separate node type, based on your tableView, or if not present, tableName, e.g. a table called "Fruit" would become "allAirtableFruit". Useful when pulling many airtables with similar structures or fields that have different types. See https://github.com/jbolda/gatsby-source-airtable/pull/52.
            // mapping: { `CASE_SENSITIVE_COLUMN_NAME`: `VALUE_FORMAT` }, // optional, e.g. "text/markdown", "fileNode"
            tableLinks: [`Moods`, `Energy`, `Playlists`], // optional, for deep linking to records across tables.
            createSeparateNodeType: false, // boolean, default is false, see the documentation on naming conflicts for more information
            separateMapType: false, // boolean, default is false, see the documentation on using markdown and attachments for more information
          },
          {
            baseId: `appMlZDjXXmJYrF6k`,
            tableName: `Moods`,
          },
          {
            baseId: `appMlZDjXXmJYrF6k`,
            tableName: `Energies`,
          },
          {
            baseId: `appMlZDjXXmJYrF6k`,
            tableName: `Playlists`,
            tableLinks: [`Playlist_Tracks`],
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
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
