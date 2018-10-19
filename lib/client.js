const { GraphQLClient } = require("graphql-request");
const queries = require("./queries");

const client = function(url, query) {
  this.url = url;
  this.query = query;
  return this;
};

const proto = client.prototype;

proto.setVerbose = function(verbose) {
  this.verbose = verbose;
};

proto.addHeader = function(header) {
  if (header) {
    let parts = header.split(":", 2);
    if (parts.length !== 2) {
      throw "header not valid: " + header;
    }

    this.headers = this.headers || {};
    this.headers[parts[0]] = parts[1];
  } else {
    throw "header not valid";
  }
};

proto.run = async function() {
  this._log(`url: ${this.url}`);
  const gqClient = new GraphQLClient(this.url, {
    headers: this.headers
  });

  const schema = await this._getSchema(gqClient);

  const queryType = schema.queryType.name;
  this._log(`query type: ${queryType}`);
};

proto._getSchema = async function(gqClient) {
  this._log("getting schema");
  const data = await gqClient.request(queries.schemaQuery);
  return data.__schema;
};

proto._parseQueryName = function() {
  return this.query.split("(", 1)[0];
};

proto._log = function(msg) {
  if (this.verbose) {
    console.log(msg);
  }
};

module.exports = client;
