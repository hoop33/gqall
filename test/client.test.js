const client = require('../lib/client');

test('blank query should parse to blank name', () => {
  var c = new client('', '');
  expect(c._parseQueryName()).toBe('');
});

test('query with no parentheses should parse to itself', () => {
  var c = new client('', 'foo');
  expect(c._parseQueryName()).toBe('foo');
});

test('query with parentheses should parse to part before paren', () => {
  var c = new client('', 'foo(id: "bar")');
  expect(c._parseQueryName()).toBe('foo');
});

test('verbose should default to false', () => {
  var c = new client();
  expect(c.verbose).toBeFalsy();
});

test('verbose should be false when set to false', () => {
  var c = new client();
  c.setVerbose(false);
  expect(c.verbose).toBeFalsy();
});

test('verbose should be true when set to true', () => {
  var c = new client();
  c.setVerbose(true);
  expect(c.verbose).toBeTruthy();
});

test('addHeader should throw when undefined', () => {
  let c = new client();
  expect(() => {
    c.addHeader();
  }).toThrow('header not valid');
});

test('addHeader should throw when null', () => {
  let c = new client();
  expect(() => {
    c.addHeader(null);
  }).toThrow('header not valid');
});

test('addHeader should throw when empty', () => {
  let c = new client();
  expect(() => {
    c.addHeader('');
  }).toThrow('header not valid');
});

test('addHeader should throw when no colons', () => {
  let c = new client();
  expect(() => {
    c.addHeader('foobar');
  }).toThrow('header not valid');
});

test('addHeader should add header when properly formatted', () => {
  let c = new client();
  c.addHeader('foo:bar');
  expect(c.headers['foo']).toBe('bar');
});
