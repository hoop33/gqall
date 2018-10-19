# gqall

> A CLI for running a GraphQL query and requesting all fields

[![License](https://img.shields.io/npm/l/gqall.svg)](https://github.com/hoop33/gqall/blob/master/package.json)

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
