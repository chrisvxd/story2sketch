# story2sketch 💎

[![NPM](https://img.shields.io/npm/v/story2sketch.svg)](https://www.npmjs.com/package/story2sketch) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

Convert [Storybook](https://storybook.js.org) stories into [Sketch](https://www.sketchapp.com) symbols.

> Uses the amazing [`html-sketchapp`](https://github.com/html-sketchapp/html-sketchapp). Only supports web.

## Quickstart

Firstly, get [Sketch](https://sketchapp.com) and [npm](https://nodejs.org/en/download/). Then install [`asketch2sketch.sketchplugin`](https://github.com/html-sketchapp/html-sketchapp/releases/download/v4.4.1/asketch2sketch-4-4-1.sketchplugin.zip) into Sketch:

<img src="https://i.imgur.com/9eDm6NQ.png" width="450" alt="Installing Sketch plugin" title="Installing Sketch plugin" />

Install `story2sketch`:

```sh
npm i story2sketch -g
```

Run `story2sketch`, pointing towards a Storybook iframe URL. You can find an existing iframe URL in Storybook by clicking 'Open canvas in new tab':

![Open canvas in new tab](https://i.imgur.com/Vo87WSM.png)

See [configuration](#configuration) for more options, or if you have a lot of stories.

```sh
story2sketch --url https://localhost:9001/iframe.html --output stories.asketch.json
```

Import the generated file into Sketch via `Plugins > From *Almost* Sketch to Sketch` in Sketch menu bar.

![Using sketch plugin](https://i.imgur.com/aA94aNN.png)

Success!

### Storybook 3.x

If you're using Storybook 3.3 or above (but not Storybook 4 or above), you'll want to [take full control of your Storybook webpack.config.js](https://storybook.js.org/configurations/custom-webpack-config/#full-control-mode) if you haven't already done so, adding:

```js
module.exports = (storybookBaseConfig, configType) => {
  const newConfig = {
    ...storybookBaseConfig
  };

  // Add this:
  // Export bundles as libraries so we can access them on page scope.
  newConfig.output.library = "[name]";

  return newConfig;
};
```

Manually export the `getStorybook` function in your `./config/storybook/config.js` file:

```js
import { getStorybook } from "@storybook/react";

...

export { getStorybook }
```

Run story2sketch:

```sh
story2sketch --url https://localhost:9001/iframe.html --output stories.asketch.json
```

## Why?

As stated by [`react-sketchapp`](https://github.com/airbnb/react-sketchapp), it's complicated to manage assets in a design system. Many teams building design systems or component libraries already produce Sketch files for distributing designs and use [Storybook](https://storybook.js.org) to prototype and present the developed components. It can become difficult to keep designs up to date with the latest components, with designers ever playing catchup. `story2sketch` generates a Sketch file from your components via Storybook, so your Sketch designs always stay up to date.

<a name="configuration"><a/>

## Configuration

You can configure `story2sketch` using [the API](#api) via the CLI, configuring your `package.json` or adding a `story2sketch.config.js` file.

### CLI

Simply call `story2sketch` with options from the [API](#api).

```sh
$ story2sketch --stories all --output dist/great-ui.asketch.json
```

### package.json

Add the following to your package.json:

```json
{
  "story2sketch": {
    "stories": "all",
    "output": "dist/great-ui.asketch.json"
  }
}
```

### story2sketch.config.js

Create a file called `story2sketch.config.js` on the root of your project:

```js
module.exports = {
  output: "dist/great-ui.asketch.json",
  stories: "all"
};
```

<a name="api"></a>

## API

| Parameter           | Explanation                                                                                                                                                                    | Input Type        | Default                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ----------------------------------------------------------------------------------- |
| output              | Specifies the filename for the generated asketch.json file or a folder when outputBy === 'kind'.                                                                               | string            | `"dist/stories.asketch.json"`                                                       |
| input               | The location of Storybook's generated iframe.html. Use this over `url` if possible for performance.                                                                            | string            | `"dist/iframe.html"`                                                                |
| url                 | Storybook iframe URL. Will end in `iframe.html`. Prefer `input` for performance if possible.                                                                                   | string            | `"http://localhost:9001/iframe.html"`                                               |
| stories             | Stories to extract from Storybook. You should probably override the default.                                                                                                   | object/string     | `"all"`                                                                             |
| concurrency         | Number of headless Chrome tabs to run in parallel. Defaults to number of threads available on your machine.                                                                    | integer           | dynamic                                                                             |
| symbolGutter        | Gutter to place between symbols in Sketch.                                                                                                                                     | integer           | `100`                                                                               |
| viewports           | Viewport configuration. Will be arranged left-to-right by width. Try to avoid changing the key, as this is used to identify the symbol.                                        | object            | Mobile viewport (320px wide) and desktop viewport (1920px wide). See example below. |
| querySelector       | Query selector to select your node on each page. Uses `document.querySelectorAll`.                                                                                             | string            | `"#root"`                                                                           |
| verbose             | Verbose logging output.                                                                                                                                                        | boolean           | `false`                                                                             |
| fixPseudo           | Attempt to insert real elements in place of pseudo-elements                                                                                                                    | boolean           | `false`                                                                             |
| puppeteerOptions    | Options to be passed directly to `puppeteer.launch`. See [puppeteer docs](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions) for usage. | object            | `{}`                                                                                |
| removePreviewMargin | Remove preview margin from the iframe body.                                                                                                                                    | boolean           | `true`                                                                              |
| layoutBy            | Group symbols in the sketch output by the "kind" or "group" key                                                                                                                | "kind" \| "group" | null                                                                                |
| outputBy            | Write multiple sketch files by "kind" or the "group" key                                                                                                                       | "kind" \| "group" | null                                                                                |

## Example configurations

### Basic

Automatically detect the stories, outputting two viewports for each story in a single Sketch file as symbols.

```js
module.exports = {
  output: "dist/great-ui.asketch.json",
  input: "dist/iframe.html", // Same as default
  pageTitle: "great-ui"
};
```

### Manual stories

Manually define stories to have granular control over what stories are output. This might help if you're getting empty output, since some stories may break story2sketch.

```js
module.exports = {
  stories: [
    {
      kind: "Buttons/Button",
      stories: [
        {
          name: "Button"
        }
      ]
    },
    {
      kind: "Buttons/ButtonGroup",
      stories: [
        {
          name: "Default",
          displayName: "Horizontal"
        },
        {
          name: "Vertical"
        }
      ]
    },
    {
      kind: "Table",
      stories: [
        {
          name: "Table"
        }
      ]
    }
  ]
};
```

### Custom viewports

Output symbols based on custom viewports:

```js
module.exports = {
  viewports: {
    narrow: {
      width: 320,
      height: 1200,
      symbolPrefix: "Mobile/"
    },
    standard: {
      width: 1920,
      height: 1200,
      symbolPrefix: "Desktop/"
    }
  }
};
```

### Split output into multiple files based on kind

Outputs one file for each Storybook "kind". Useful if managing large component libraries, allowing you to distribute smaller files.

```js
module.exports = {
  output: "dist", // Define output directory. File names are defined by "kind"
  outputBy: "kind" // Also supports "group", see below.
};
```

### Layout based on kind

Renders the sketch layout by kind, but keeps them in one file.

```js
module.exports = {
  layoutBy: "kind" // Also supports "group", see below.
};
```

### Split output into multiple files based on custom group

This example outputs two files based on a custom grouping: `dist/Buttons.asketch.json` and `dist/Data.asketch.json`.

```js
module.exports = {
  output: "dist",
  outputBy: "group",
  stories: [
    {
      group: "Buttons",
      kind: "Buttons/Button",
      stories: [
        {
          name: "Button"
        }
      ]
    },
    {
      group: "Buttons",
      kind: "Buttons/ButtonGroup",
      stories: [
        {
          name: "Default",
          displayName: "Horizontal"
        },
        {
          name: "Vertical"
        }
      ]
    },
    {
      group: "Data",
      kind: "Table",
      stories: [
        {
          name: "Table"
        }
      ]
    }
  ]
};
```

## Continuous Integration

If you want `story2sketch` to run in a CI environment you might have to add the following configuration to puppeteer in your `story2sketch.config.js`.

```js
module.exports = {
  puppeteerOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  ...
};
```

<a name="questions"><a/>

## Questions

### Why does my stuff look bad?

If your stuff looks bad, either it's not supported by [`html-sketchapp`](https://github.com/html-sketchapp/html-sketchapp) yet (see [support here](https://github.com/html-sketchapp/html-sketchapp/wiki/What's-supported%3F)), or you need to [configure story2sketch](#configuration).

### Why don't you use `react-sketchapp` instead of `html-sketchapp`?

[`react-sketchapp`](https://github.com/airbnb/react-sketchapp) only supports React Native, or forces you to use React Native component naming conventions. [`html-sketchapp`](https://github.com/html-sketchapp/html-sketchapp) supports good ol' fashioned HTML, and doesn't care what web framework you're using.

### Can I use this on anything other than Storybook?

Not yet, but we have plans to add support for multiple and custom adaptors.
