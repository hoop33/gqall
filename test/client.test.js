const client = require("../lib/client");

test("blank query should parse to blank name", () => {
  const c = new client("", "");
  expect(c._parseQueryName()).toBe("");
});

test("query with no parentheses should parse to itself", () => {
  const c = new client("", "foo");
  expect(c._parseQueryName()).toBe("foo");
});

test("query with parentheses should parse to part before paren", () => {
  const c = new client("", 'foo(id: "bar")');
  expect(c._parseQueryName()).toBe("foo");
});

test("verbose should default to false", () => {
  const c = new client();
  expect(c.verbose).toBeFalsy();
});

test("verbose should be false when set to false", () => {
  const c = new client();
  c.setVerbose(false);
  expect(c.verbose).toBeFalsy();
});

test("verbose should be true when set to true", () => {
  const c = new client();
  c.setVerbose(true);
  expect(c.verbose).toBeTruthy();
});

test("addHeader should throw when undefined", () => {
  const c = new client();
  expect(() => {
    c.addHeader();
  }).toThrow("header not valid");
});

test("addHeader should throw when null", () => {
  const c = new client();
  expect(() => {
    c.addHeader(null);
  }).toThrow("header not valid");
});

test("addHeader should throw when empty", () => {
  const c = new client();
  expect(() => {
    c.addHeader("");
  }).toThrow("header not valid");
});

test("addHeader should throw when no colons", () => {
  const c = new client();
  expect(() => {
    c.addHeader("foobar");
  }).toThrow("header not valid");
});

test("addHeader should add header when properly formatted", () => {
  const c = new client();
  c.addHeader("foo:bar");
  expect(c.headers["foo"]).toBe("bar");
});
