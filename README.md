# gqall

> A CLI for running a GraphQL query and requesting all fields

[![License](https://img.shields.io/npm/l/gqall.svg)](https://github.com/hoop33/gqall/blob/master/package.json)

## Overview

A common GraphQL question is how to easily request *all* fields to be returned -- something like:

```
query {
  hero {
    *
  }
}
```

Here's an example of the question, and why no way to do that exists: <https://www.prisma.io/forum/t/include-all-fields-of-a-type-in-a-graphql-query/352>

During development and testing, however, such functionality would be useful. Imagine, for example, you have a GraphQL mutation to update a complex entity. To test that mutation, you want to grab some data, make some changes, and then call the mutation with the updated data. Even with the code completion of something like GraphiQL, this can be kind of painful to type in your query to get the entire record to update.

That's why I've created `gqall`, a CLI that lets you specify the GraphQL endpoint and just the name of the query, and it will indeed return all fields. This should ease development and testing your GraphQL mutations!

## Installation

```sh
$ npm install gqall
```

## Usage

`gqall` takes two parameters:

1. The URL of your GraphQL endpoint
2. The GraphQL query to run (just the name and the parameters -- *not* the fields to return!)

It then prints to standard out the results of the query, including all the fields that you didn't have to specify.

### Examples

These are some working examples, thanks to [FakerQL](https://medium.com/@notrab/fakerql-is-ultimate-graphql-endpoint-for-fake-data-bd83f4cd6ad1):

```sh
$ gqall https://fakerql.com/graphql "allPosts(count:1)"
{
  "allPosts": [
    {
      "id": "cjngkb52m00ta28100t8qvier",
      "title": "Table",
      "body": "Et deleniti animi. Possimus natus vero quisquam omnis deleniti.",
      "published": false,
      "createdAt": "Tue Mar 13 2018 20:21:15 GMT+0000 (UTC)",
      "author": {
        "id": "cjngkb52o00tb28100b0rtxig",
        "firstName": "Anabel",
        "lastName": "Klocko",
        "email": "Jimmie78@yahoo.com",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/mattlat/128.jpg"
      }
    }
  ]
}
```

```sh
$ gqall https://fakerql.com/graphql 'User(id: "me")'
{
  "User": {
    "id": "me",
    "firstName": "Jeffrey",
    "lastName": "Stroman",
    "email": "Alva46@hotmail.com",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/salvafc/128.jpg"
  }
}
```

You can also pass headers using the `-H/--header` flag. You can pass multiples.

```sh
$ gqall -H "Authorization:Basic ..." https://example.com/graphql 'human(id: "1000")'
{
  ...
}
```

You can also get help by passing the `-h` flag.

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
