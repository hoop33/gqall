#!/usr/bin/env node

const yargs = require("yargs");

yargs
  .usage(
    "$0 <url> <query>",
    "run a GraphQL query",
    yargs => {
      yargs.positional("url", {
        describe: "the GraphQL endpoint",
        type: "string"
      });
      yargs.positional("query", {
        describe: "the GraphQL query",
        type: "string"
      });
    },
    yargs => {
      console.log(`running query ${yargs.url}`);
    }
  )
  .alias("h", "help")
  .alias("v", "version")
  .option("V", {
    alias: "verbose",
    default: false,
    type: "boolean",
    describe: "verbose mode",
    global: true
  })
  .wrap(yargs.terminalWidth())
  .strict()
  .showHelpOnFail(true).argv;

process.on("unhandledRejection", error => {
  console.log(error.stack); // eslint-disable-line
});
