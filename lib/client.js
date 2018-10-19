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
  this._log(`query: ${this.query}`);

  const gqClient = new GraphQLClient(this.url, {
    headers: this.headers
  });

  const schema = await this._getSchema(gqClient);
  if (!schema) throw "can't get schema";

  const queryTypeName = schema.queryType.name;
  if (!queryTypeName) throw "can't get query type name";
  this._log(`query type name: ${queryTypeName}`);

  const queryType = this._findTypeByName(schema.types, queryTypeName);
  if (!queryType) throw "can't get query type";

  const rqQueryName = this._parseQueryName();
  this._log(`query name: ${rqQueryName}`);

  const queryObject = this._findTypeByName(queryType.fields, rqQueryName);
  if (!queryObject) throw `can't find query ${rqQueryName}`;

  const responseType = this._findResponseType(queryObject.type);
  if (!responseType) throw `can't find response type for query ${rqQueryName}`;
  this._log(`response type: ${responseType}`);
};

proto._getSchema = async function(gqClient) {
  this._log("getting schema");
  const data = await gqClient.request(queries.schemaQuery);
  return data.__schema;
};

proto._findTypeByName = function(types, name) {
  if (types) {
    const found = types.filter(type => {
      return type.name === name;
    });
    return found.length === 1 ? found[0] : undefined;
  }
};

proto._findResponseType = function(type) {
  if (type) {
    if (type.name) return type.name;
    if (type.ofType) return this._findResponseType(type.ofType);
  }
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
