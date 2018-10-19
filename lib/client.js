const { request } = require("graphql-request");

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

proto._parseQueryName = function() {
  return this.query.split("(", 1)[0];
};

module.exports = client;
