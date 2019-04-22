module.exports = {
  output: "example.asketch.json",
  layoutBy: "group",
  input: "dist/iframe.html",
  concurrency: 2,
  symbolGutter: 200,
  stories: [
    {
      kind: "basic",
      group: "primary",
      stories: [
        {
          name: "with text"
        },
        {
          name: "with pseudo element"
        }
      ]
    },
    {
      kind: "advanced",
      group: "primary",
      stories: [
        {
          name: "with text"
        }
      ]
    },
    {
      kind: "extra",
      group: "secondary",
      stories: [
        {
          name: "with text"
        }
      ]
    }
  ],
  pageTitle: "great-ui",
  fixPseudo: true
};
