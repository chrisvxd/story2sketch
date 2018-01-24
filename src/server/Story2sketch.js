/* eslint-disable no-console*/

import puppeteer from "puppeteer";
import fs from "fs";
import chalk from "chalk";
import ProgressBar from "progress";

import getStorybook from "./getStorybook";
import PagePool from "./PagePool.js";

const defaultConcurrency = 4;
const defaultSymbolGutter = 100;

const defaultNarrowViewport = { width: 320, height: 1200 };
const defaultStandardViewport = { width: 1920, height: 1200 };

export default class Story2sketch {
  constructor({
    output = `${process.cwd()}/dist/stories.asketch.json`,
    url = "http://localhost:9001/iframe.html",
    concurrency = defaultConcurrency,
    pageTitle = "Stories",
    symbolGutter = defaultSymbolGutter,
    narrowViewport = defaultNarrowViewport,
    standardViewport = defaultStandardViewport,
    querySelector = "*",
    verbose = false,
    stories
  }) {
    this.output = output;
    this.url = url;
    this.concurrency = concurrency;
    this.pageTitle = pageTitle;
    this.symbolGutter = symbolGutter;
    this.narrowViewport = narrowViewport;
    this.standardViewport = standardViewport;
    this.querySelector = querySelector;
    this.stories = stories;
    this.verbose = verbose;
  }

  reset() {
    this.narrowSymbols = [];
    this.standardSymbols = [];
    this.offset = 0;
    this.widestNarrowSymbol = 0;
    this.storyCount = 0;
    this.sketchPage = {};
  }

  async init() {
    this.browser = await puppeteer.launch();

    if (!this.stories || this.stories === "all") {
      if (this.verbose) {
        console.log(chalk.gray("Detecting stories..."));
      }

      this.stories = await getStorybook(this.browser, this.url);
    }

    this.reset();

    this.pagePool = await this.createPagePool();

    this.progressBar = new ProgressBar(
      "[:bar] :percent (:current/:total) :etas remaining",
      {
        total: this.storyCount,
        story: "",
        complete: "#"
      }
    );

    this.sketchPage = await this.getSketchPage();

    console.log(`Processing ${this.storyCount} stories...`);
  }

  // NB The only reason this needs to run in chrome is because html-sketchapp
  // uses imports/exports and therefore won't compile for node. html-sketchapp
  // either needs to compile down, or we can webpack the server bundle.
  async getSketchPage() {
    if (this.verbose) {
      console.log(chalk.gray("Getting sketch page..."));
    }

    const page = await this.browser.newPage();

    await page.goto(this.url, {
      waitUntil: "networkidle2"
    });

    await page.addScriptTag({
      path: `${__dirname}/../browser/page2layers.bundle.js`
    });

    const params = JSON.stringify({
      title: this.pageTitle,
      width: 1920,
      height: 5000
    });

    const sketchPage = await page.evaluate(`
      page2layers
      .getPage(${params})
    `);

    return sketchPage;
  }

  async createPagePool() {
    const pagePool = new PagePool(this.browser, this.concurrency);

    await pagePool.init();

    for (const { kind, stories } of this.stories) {
      for (const story of stories) {
        this.storyCount += 1;

        pagePool.queue(async page => {
          const {
            narrowSymbol,
            standardSymbol
          } = await this.getSymbolsForStory({
            page,
            kind,
            story
          });

          narrowSymbol.frame.y = this.offset;
          standardSymbol.frame.y = this.offset;

          this.offset +=
            Math.max(standardSymbol.frame.height, narrowSymbol.frame.height) +
            this.symbolGutter;

          this.widestNarrowSymbol = Math.max(
            narrowSymbol.frame.width,
            this.widestNarrowSymbol
          );

          this.narrowSymbols.push(narrowSymbol);
          this.standardSymbols.push(standardSymbol);
        });
      }
    }

    return pagePool;
  }

  async getSymbolsForStory({ page, kind, story }) {
    const builtUrl = `${this.url}?selectedKind=${encodeURIComponent(
      kind
    )}&selectedStory=${encodeURIComponent(story.name)}`;

    await page.goto(builtUrl, {
      waitUntil: "networkidle2"
    });

    await page.addScriptTag({
      path: `${__dirname}/../browser/page2layers.bundle.js`
    });

    await page.setViewport(this.narrowViewport);

    const name = `${kind}/${story.displayName || story.name}`;

    const narrowParams = JSON.stringify({
      name: `📱 ${name}`,
      querySelector: this.querySelector
    });

    const standardParams = JSON.stringify({
      name: `🖥 ${name}`,
      querySelector: this.querySelector
    });

    // JSON.parse + JSON.stringify hack was originally used until
    // https://github.com/GoogleChrome/puppeteer/issues/1510 was fixed, but
    // it still results in better performance.
    const narrowSymbolJson = await page.evaluate(`
      page2layers
      .getSymbol(${narrowParams})
      .then(result => JSON.stringify(result))
    `);

    await page.setViewport(this.standardViewport);

    const standardSymbolJson = await page.evaluate(`
      page2layers
      .getSymbol(${standardParams})
      .then(result => JSON.stringify(result))
    `);

    const narrowSymbol = JSON.parse(narrowSymbolJson);
    const standardSymbol = JSON.parse(standardSymbolJson);

    // Override existing randomly generated ids for fixed symbol reference in sketch.
    narrowSymbol.symbolID = `${name}:narrow`;
    standardSymbol.symbolID = `${name}:standard`;

    if (this.verbose) {
      console.log(
        `${chalk.green("✓")} ${chalk.gray(`Exported`)} ${chalk.bold(`${name}`)}`
      );
    } else {
      this.progressBar.tick({
        processed: this.narrowSymbols.length + 1,
        story: chalk.bold(name)
      });
    }

    return {
      narrowSymbol,
      standardSymbol
    };
  }

  async execute() {
    process.on("SIGINT", () => {
      this.browser.close();

      this.exited = true;

      process.exit();
    });

    await this.pagePool.execute().catch(error => {
      // Suppress errors if user exited process.
      if (!this.exited) {
        console.error(error);
      }
    });

    for (const narrowSymbol of this.narrowSymbols) {
      this.sketchPage.layers.push(narrowSymbol);
    }

    for (const standardSymbol of this.standardSymbols) {
      standardSymbol.frame.x = this.widestNarrowSymbol + this.symbolGutter;
      this.sketchPage.layers.push(standardSymbol);
    }

    fs.writeFileSync(this.output, JSON.stringify(this.sketchPage));

    console.log(
      chalk.green(
        `Success! ${
          this.narrowSymbols.length
        } stories written to ${chalk.white.bold(this.output)}`
      )
    );

    this.browser.close();
    process.exit();
  }
}
