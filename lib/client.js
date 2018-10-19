const {request} = require('graphql-request');

const client = function(url, query) {
  this.url = url;
  this.query = query;
  return this;
};

const proto = client.prototype;

proto.parseQueryName = function() {
  return this.query.split('(', 1)[0];
};

module.exports = client;
