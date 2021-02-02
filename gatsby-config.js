require(`dotenv`).config({
    path: `.env`,
});

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

module.exports = {
    siteMetadata: {
        // Used for the title template on pages other than the index site
        siteTitle: `Hue5`,
        // Default title of the page
        siteTitleAlt: `Hue5`,
        // Can be used for e.g. JSONLD
        siteHeadline: `Hue5`,
        // Will be used to generate absolute URLs for og:image etc.
        siteUrl: `https://minimal-blog.lekoarts.de`,
        // Used for SEO
        siteDescription: `Learning every moment`,
        // Will be set on the <html /> tag
        siteLanguage: `kr`,
        // Used for og:image and must be placed inside the `static` folder
        siteImage: `/banner.jpg`,
        // Twitter Handle
        author: `@hyes5_`,
    },
    plugins: [
        {
            resolve: `@lekoarts/gatsby-theme-minimal-blog`,
            // See the theme's README for all available options
            options: {
                navigation: [
                    {
                        title: `Blog`,
                        slug: `/blog`,
                    },
                    {
                        title: `About`,
                        slug: `/about`,
                    },
                ],
                externalLinks: [
                    {
                        name: `Github`,
                        url: `https://github.com/hyesungoh/`,
                    },
                    {
                        name: `Instagram`,
                        url: `https://www.instagram.com/hyes5_/`,
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.GOOGLE_ANALYTICS_ID,
            },
        },
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Hue5`,
                short_name: `Hue5-blog`,
                description: `Learning every moment`,
                start_url: `/`,
                background_color: `#fff`,
                theme_color: `#C5CFDA`,

                display: `standalone`,
                icons: [
                    {
                        src: `/android-chrome-192x192.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                    },
                    {
                        src: `/android-chrome-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    },
                ],
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-netlify`,
        shouldAnalyseBundle && {
            resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
            options: {
                analyzerMode: `static`,
                reportFilename: `_bundle.html`,
                openAnalyzer: false,
            },
        },
    ].filter(Boolean),
};
