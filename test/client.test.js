const Client = require("../lib/client");

test("blank query should parse to blank name", () => {
  const c = new Client("", "");
  expect(c._parseQueryName()).toBe("");
});

test("query with no parentheses should parse to itself", () => {
  const c = new Client("", "foo");
  expect(c._parseQueryName()).toBe("foo");
});

test("query with parentheses should parse to part before paren", () => {
  const c = new Client("", 'foo(id: "bar")');
  expect(c._parseQueryName()).toBe("foo");
});

test("verbose should default to false", () => {
  const c = new Client();
  expect(c.verbose).toBeFalsy();
});

test("verbose should be false when set to false", () => {
  const c = new Client();
  c.setVerbose(false);
  expect(c.verbose).toBeFalsy();
});

test("verbose should be true when set to true", () => {
  const c = new Client();
  c.setVerbose(true);
  expect(c.verbose).toBeTruthy();
});

test("addHeader should throw when undefined", () => {
  const c = new Client();
  expect(() => {
    c.addHeader();
  }).toThrow("header not valid");
});

test("addHeader should throw when null", () => {
  const c = new Client();
  expect(() => {
    c.addHeader(null);
  }).toThrow("header not valid");
});

test("addHeader should throw when empty", () => {
  const c = new Client();
  expect(() => {
    c.addHeader("");
  }).toThrow("header not valid");
});

test("addHeader should throw when no colons", () => {
  const c = new Client();
  expect(() => {
    c.addHeader("foobar");
  }).toThrow("header not valid");
});

test("addHeader should add header when properly formatted", () => {
  const c = new Client();
  c.addHeader("foo:bar");
  expect(c.headers["foo"]).toBe("bar");
});

test("findTypeByName should return undefined when types is undefined", () => {
  const c = new Client();
  expect(c._findTypeByName(undefined, "foo")).toBeUndefined();
});

test("findTypeByName should return undefined when types is null", () => {
  const c = new Client();
  expect(c._findTypeByName(null, "foo")).toBeUndefined();
});

test("findTypeByName should return undefined when types is empty", () => {
  const c = new Client();
  expect(c._findTypeByName([], "foo")).toBeUndefined();
});

test("findTypeByName should return undefined when type has no name", () => {
  const c = new Client();
  expect(c._findTypeByName([{}], "foo")).toBeUndefined();
});

test("findTypeByName should return undefined when type is not found", () => {
  const c = new Client();
  expect(
    c._findTypeByName(
      [
        {
          name: "bar"
        }
      ],
      "foo"
    )
  ).toBeUndefined();
});

test("findTypeByName should return type when type is found", () => {
  const c = new Client();
  expect(
    c._findTypeByName(
      [
        {
          name: "foo"
        }
      ],
      "foo"
    ).name
  ).toBe("foo");
});

test("findTypeByName should return type and handle no-names when type is found", () => {
  const c = new Client();
  expect(
    c._findTypeByName(
      [
        {},
        {
          name: "foo"
        }
      ],
      "foo"
    ).name
  ).toBe("foo");
});

test("findResponseType should return undefined when type is undefined", () => {
  const c = new Client();
  expect(c._findResponseType()).toBeUndefined();
});

test("findResponseType should return undefined when type is null", () => {
  const c = new Client();
  expect(c._findResponseType(null)).toBeUndefined();
});

test("findResponseType should return undefined when type is empty", () => {
  const c = new Client();
  expect(c._findResponseType({})).toBeUndefined();
});

test("findResponseType should return undefined when type has no response type", () => {
  const c = new Client();
  expect(
    c._findResponseType({
      ofType: {
        ofType: {
          ofType: {}
        }
      }
    })
  ).toBeUndefined();
});

test("findResponseType should return first name when type has name", () => {
  const c = new Client();
  expect(
    c._findResponseType({
      name: "foo",
      ofType: {
        ofType: {
          ofType: {
            name: "bar"
          }
        }
      }
    })
  ).toBe("foo");
});

test("findResponseType should return name when type has name", () => {
  const c = new Client();
  expect(
    c._findResponseType({
      ofType: {
        ofType: {
          ofType: {
            name: "bar"
          }
        }
      }
    })
  ).toBe("bar");
});
