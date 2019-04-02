#!/usr/bin/env node

/* eslint-disable no-console */

import { argv } from "yargs";
import cosmiconfig from "cosmiconfig";
import Story2sketch from "./Story2sketch";
import findUp from "find-up";
import path from "path";
import chalk from "chalk";
import logoAscii from "./logoAscii";

// Ensure paths are absolute, not relative
const absolute = p => (p && p[0] !== "/" ? path.join(process.cwd(), p) : p);

const tidyConfig = config => {
  const newConfig = { ...config };

  newConfig.input = absolute(newConfig.input);
  newConfig.output = absolute(newConfig.output);
  newConfig.outputByKind = absolute(newConfig.outputByKind);

  // Convert input file to URL if defined
  if (newConfig.input) {
    newConfig.url = `file://${newConfig.input}`;
  }

  return newConfig;
};

const announce = config => {
  if (config.logo === "small") {
    console.log(chalk.blue.bold("💎  story2sketch"));
  } else {
    console.log(chalk.yellow.bold(logoAscii));
  }

  if (config.verbose) {
    console.log(chalk.gray(`${chalk.bold("Input URL:")} ${config.url}}`));
    console.log(chalk.gray(`${chalk.bold("Output File:")} ${config.output}\n`));
  }
};

const explorer = cosmiconfig("story2sketch");

explorer
  .load()
  .then(async packageConfig => {
    const configPath = findUp.sync("story2sketch.config.js");
    let fileConfig = {};

    if (configPath) {
      fileConfig = require(configPath);
    }

    const mergedConfig = tidyConfig({
      ...fileConfig,
      ...(packageConfig || { config: {} }).config,
      ...argv
    });

    announce(mergedConfig);

    const story2sketch = new Story2sketch(mergedConfig);

    await story2sketch.init();
    await story2sketch.execute();
  })
  .catch(parsingError => {
    throw parsingError;
  });
