# gqall

> A CLI for running a GraphQL query and requesting all fields

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gqall.svg)](https://npmjs.org/package/gqall)
[![CircleCI](https://circleci.com/gh/hoop33/gqall/tree/master.svg?style=shield)](https://circleci.com/gh/hoop33/gqall/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/hoop33/gqall?branch=master&svg=true)](https://ci.appveyor.com/project/hoop33/gqall/branch/master)
[![Codecov](https://codecov.io/gh/hoop33/gqall/branch/master/graph/badge.svg)](https://codecov.io/gh/hoop33/gqall)
[![Downloads/week](https://img.shields.io/npm/dw/gqall.svg)](https://npmjs.org/package/gqall)
[![License](https://img.shields.io/npm/l/gqall.svg)](https://github.com/hoop33/gqall/blob/master/package.json)

<!-- toc -->

## Installation

```sh
$ npm install gqall
```

## Usage

`gqall` takes two parameters:

1. The URL of your GraphQL endpoint
2. The GraphQL query to run

### Examples

```sh
$ gqall https://example.com/graphql 'human(id: "1000")'
```

```sh
$ gqall -H "Authorization: Basic ..." https://example.com/graphql 'human(id: "1000")'
```

## FAQ

* How do you pronounce `gqall`?
  * Unless someone comes up with something better, "JEE - call"

## Contributing

Please note that this project is released with a [Contributor Code of Conduct](http://contributor-covenant.org/). By participating in this project you agree to abide by its terms. See [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) file.

Contributions are welcome! Please open pull requests.

## Credits

`gqall` uses the following open source libraries -- thank you!

* [yargs](http://yargs.js.org/)
* [graphql-request](https://github.com/prisma/graphql-request)

## License

Copyright © 2018 Rob Warner

Licensed under the [MIT License](https://hoop33.mit-license.org/)
