import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test getComponent", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    expect(n.getComponent(1)).toBe("fau");
  });
});

describe("Basic function tests", () => {
  it("test setComponent", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    n.setComponent(2, "abc")
    expect(n.asString()).toBe("oss.cs.abc.de");
  });
});

describe("Basic function tests", () => {
  it("test getNoComponents", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.getNoComponents()).toBe(4);
  });
});

describe("Basic function tests", () => {
  it("test remove", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    n.remove(2)
    expect(n.asString()).toBe("oss.cs.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Escape caharcter extravaganza", () => {
  it("test asString", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.d\\e"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Escape caharcter extravaganza", () => {
  it("test asDataString", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.d\\e"], '#');
    expect(n.asDataString()).toBe("oss.cs.fau.d\\e");
    n.append("abc");
    expect(n.asDataString()).toBe("oss.cs.fau.d\\e.abc");
  });
});