const client = require('../lib/client');

test('blank query should parse to blank name', () => {
  var c = new client('', '');
  expect(c.parseQueryName()).toBe('');
});

test('query with no parentheses should parse to itself', () => {
  var c = new client('', 'foo');
  expect(c.parseQueryName()).toBe('foo');
});

test('query with parentheses should parse to part before paren', () => {
  var c = new client('', 'foo(id: "bar")');
  expect(c.parseQueryName()).toBe('foo');
});
