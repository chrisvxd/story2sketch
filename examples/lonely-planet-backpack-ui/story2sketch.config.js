module.exports = {
  output: `backpack-ui.asketch.json`,
  url: "https://lonelyplanet.github.io/backpack-ui/iframe.html",
  logo: "small",
  concurrency: 4,
  symbolGutter: 100,
  pageTitle: "backpack-ui",
  viewports: {
    narrow: {
      width: 320,
      height: 1200,
      symbolPrefix: "Mobile/"
    },
    middle: {
      width: 768,
      height: 1200,
      symbolPrefix: "Tablet/"
    },
    standard: {
      width: 1920,
      height: 1200,
      symbolPrefix: "Desktop/"
    }
  },
  querySelector: ".Card",
  // querySelector: "[class*='rmq']",
  stories: [
    {
      kind: "Cards",
      stories: [
        {
          name: "Card - basic"
        },
        {
          name: "Card - price"
        }
      ]
    }
    // {
    //   kind: "Profile header",
    //   stories: [
    //     {
    //       name: "Default"
    //     }
    //   ]
    // },
    // {
    //   kind: "Flyout",
    //   stories: [
    //     {
    //       name: "Small"
    //     }
    //   ]
    // },
    // {
    //   kind: "Promoted guidebook",
    //   stories: [
    //     {
    //       name: "default"
    //     }
    //   ]
    // },
    // {
    //   kind: "Social share",
    //   stories: [
    //     {
    //       name: "Using SocialShareContainer"
    //     }
    //   ]
    // },
    // {
    //   kind: "Spotlight zone",
    //   stories: [
    //     {
    //       name: "Default"
    //     }
    //   ]
    // },
    // {
    //   kind: "Tabbed nav",
    //   stories: [
    //     {
    //       name: "Default"
    //     }
    //   ]
    // },
    // {
    //   kind: "Thumbnail list",
    //   stories: [
    //     {
    //       name: "Light"
    //     },
    //     {
    //       name: "Dark"
    //     }
    //   ]
    // },
    // {
    //   kind: "Travel alert",
    //   stories: [
    //     {
    //       name: "Default"
    //     }
    //   ]
    // }
  ]
};
