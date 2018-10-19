#!/usr/bin/env node

const yargs = require("yargs");
const Client = require("./lib/client");

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
      const c = new Client(yargs.url, yargs.query);
      c.setVerbose(yargs.verbose);
      yargs.header &&
        yargs.header.forEach(header => {
          try {
            c.addHeader(header);
          } catch (err) {
            console.log(err);
          }
        });
      c.run()
        .then(response => {
          console.log(JSON.stringify(response, undefined, 2));
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
  .alias("h", "help")
  .alias("v", "version")
  .option("V", {
    alias: "verbose",
    default: false,
    type: "boolean",
    describe: "verbose mode"
  })
  .option("H", {
    alias: "header",
    type: "array",
    describe: "HTTP header in key:value format"
  })
  .wrap(yargs.terminalWidth())
  .strict()
  .showHelpOnFail(true).argv;

process.on("unhandledRejection", error => {
  console.log(error.stack); // eslint-disable-line
});
