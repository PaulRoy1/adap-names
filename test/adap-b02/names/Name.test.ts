import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b03/names/Name";
import { AbstractName } from "../../../src/adap-b03/names/AbstractName";
import { StringName } from "../../../src/adap-b03/names/StringName";
import { StringArrayName } from "../../../src/adap-b03/names/StringArrayName";

describe("Basic function tests", () => {
  it("Constructor text", () => {
    let n: StringName = new StringName("");
    expect(n.isEmpty()).toBe(false);
    expect(n.getNoComponents()).toBe(1);
    n.append("abc");
    expect(n.asString()).toBe(".abc");
  });
});

describe("Basic function tests", () => {
  it("tests isEmpty StringName -> false", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    expect(n.isEmpty()).toBe(false);
  });
  it("tests isEmpty StringName -> true", () => {
    let n: Name = new StringName("abc");
    n.remove(0);
    expect(n.isEmpty()).toBe(true);
  });
  it("tests isEmpty StringArrayName -> false", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(n.isEmpty()).toBe(false);
  });
  it("tests isEmpty StringArrayName -> false", () => {
    let n: Name = new StringArrayName([]);
    expect(n.isEmpty()).toBe(true);
  });
});

describe("Basic function tests", () => {
  it("tests getNoComponents StringName 1", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    expect(n.getNoComponents()).toBe(4);
  });
  it("tests getNoComponents StringName 2", () => {
    let n: Name = new StringName("");
    n.remove(0);
    expect(n.getNoComponents()).toBe(0);
  });
  it("tests getNoComponents StringName 3", () => {
    let n: Name = new StringName("oss.cs.fau.de", "#");
    expect(n.getNoComponents()).toBe(1);
  });
  it("tests getNoComponents StringArrayName 1", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(n.getNoComponents()).toBe(4);
  });
  it("tests getNoComponents StringArrayName 2", () => {
    let n: Name = new StringArrayName([]);
    expect(n.getNoComponents()).toBe(0);
  });
});

describe("Basic function tests", () => {
  it("tests getComponent StringName 1", () => {
    let n: StringName = new StringName("oss.cs.fau.de");
    expect(n.getComponent(1)).toBe("cs");
    expect(n.getComponent(3)).toBe("de");
  });
  it("tests getComponent StringName 2", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    let errorMsg: string = "";
    try {
      n.getComponent(4)
    } catch (e: any) {
      errorMsg = e.message;
    }
    expect(errorMsg).toBe("index out of range");
  });
  it("tests getComponent StringName 3", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    let errorMsg: string = "";
    try {
      n.getComponent(-1)
    } catch (e: any) {
      errorMsg = e.message;
    }
    expect(errorMsg).toBe("index out of range");
  });
  it("tests getComponent StringArrayName 1", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(n.getComponent(2)).toBe("fau");
  });
  it("tests getComponent StringArrayName 2", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    let errorMsg: string = "";
    try {
      n.getComponent(4)
    } catch (e: any) {
      errorMsg = e.message;
    }
    expect(errorMsg).toBe("index out of range");
  });
  it("tests getComponent StringArrayName 3", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    let errorMsg: string = "";
    try {
      n.getComponent(-1)
    } catch (e: any) {
      errorMsg = e.message;
    }
    expect(errorMsg).toBe("index out of range");
  });
});

describe("Basic function tests", () => {
  it("tests setComponent StringName 1", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.setComponent(2, "abc");
    expect(n.asString()).toBe("oss.cs.abc.de");
  });
  it("tests setComponent StringName 2", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.setComponent(0, "abc");
    expect(n.asString()).toBe("abc.cs.fau.de");
  });
  it("tests setComponent StringName 3", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.setComponent(3, "abc");
    expect(n.asString()).toBe("oss.cs.fau.abc");
  });
  it("tests setComponent StringName 4", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    let errorMsg: string = "";
    try {
      n.setComponent(4, "abc");
    }
    catch(e:any) {
      errorMsg = e.message
    }
    expect(errorMsg).toBe("index out of range");
  });
  it("tests setComponent StringArrayName 1", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.setComponent(2, "abc");
    expect(n.asString()).toBe("oss.cs.abc.de");
  });
  it("tests setComponent StringArrayName 2", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.setComponent(0, "abc");
    expect(n.asString()).toBe("abc.cs.fau.de");
  });
  it("tests setComponent StringArrayName 3", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.setComponent(3, "abc");
    expect(n.asString()).toBe("oss.cs.fau.abc");
  });
  it("tests setComponent StringArrayName 4", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    let errorMsg: string = "";
    try {
      n.setComponent(4, "abc");
    }
    catch(e:any) {
      errorMsg = e.message;
    }
    expect(errorMsg).toBe("index out of range");
  });
});

describe("Basic function tests", () => {
  it("tests insert StringName 1", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.insert(0, "abc");
    expect(n.asString()).toBe("abc.oss.cs.fau.de")
  });
  it("tests insert StringName 2", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.insert(1, "abc");
    expect(n.asString()).toBe("oss.abc.cs.fau.de")
  });
  it("tests insert StringName 3", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.insert(4, "abc");
    expect(n.asString()).toBe("oss.cs.fau.de.abc")
  });
  it("tests insert StringName 4", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    let errorMsg: string = "";
    try {
      n.insert(5, "abc");
    } catch (e: any) {
      errorMsg = e.message;
    }
    expect(errorMsg).toBe("index out of range");
  });
  it("tests insert StringArrayName 1", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.insert(0, "abc");
    expect(n.asString()).toBe("abc.oss.cs.fau.de")
  });
  it("tests insert StringArrayName 2", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.insert(1, "abc");
    expect(n.asString()).toBe("oss.abc.cs.fau.de")
  });
  it("tests insert StringArrayName 3", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.insert(4, "abc");
    expect(n.asString()).toBe("oss.cs.fau.de.abc")
  });
  it("tests insert StringArrayName 4", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    let errorMsg: string = "";
    try {
      n.insert(5, "abc");
    } catch (e: any) {
      errorMsg = e.message;
    }
    expect(errorMsg).toBe("index out of range");
  });
});

describe("Basic function tests", () => {
  it("test append String", () => {
    let n: Name = new StringName("oss.fau.de");
    n.append("cs");
    expect(n.asString()).toBe("oss.fau.de.cs");
  });
  it("test append, Array", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test remove String 1", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
  it("test remove String 2", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(3);
    expect(n.asString()).toBe("oss.cs.fau");
  });
  it("test remove String 3", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(2);
    expect(n.asString()).toBe("oss.cs.de");
  });
  it("tests remove String 4", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    let errorMsg: string = "";
    try {
      n.remove(5);
    } catch (e: any) {
      errorMsg = e.message;
    }
    expect(errorMsg).toBe("index out of range");
  });
  it("test remove Array 1", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
  it("test remove Array 2", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(3);
    expect(n.asString()).toBe("oss.cs.fau");
  });
  it("test remove Array 2", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(2);
    expect(n.asString()).toBe("oss.cs.de");
  });
  it("tests remove String 4", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    let errorMsg: string = "";
    try {
      n.remove(5);
    } catch (e: any) {
      errorMsg = e.message;
    }
    expect(errorMsg).toBe("index out of range");
  });
});

describe("Basic function tests", () => {
  it("test concat String", () => {
    let n1: Name = new StringName("oss.cs.fau.de");
    let n2: Name = new StringName("abc-def-ghi", "-");
    n1.concat(n2);
    expect(n1.asString()).toBe("oss.cs.fau.de.abc.def.ghi");
  });
  it("test concat Array", () => {
    let n1: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    let n2: Name = new StringArrayName(["abc", "def", "ghi"], "-")
    n1.concat(n2);
    expect(n1.asString()).toBe("oss.cs.fau.de.abc.def.ghi");
  });
});

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
});

describe("Basic StringArrayName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
});

describe("Basic function test", () => {
  it("isEqual and getHashCode test 1", () => {
    let n1: Name = new StringName("oss.cs.fau.de", ".");
    let n2: Name = new StringArrayName(["oss", "cs", "fau", "de"], ".");
    expect(n1.isEqual(n2)).toBe(true);
    expect(n1.getHashCode() === n2.getHashCode()).toBe(true);
  });
  it("isEqual and HashCode test 2", () => {
    let n1: Name = new StringName("oss.cs.fau.de", ".");
    let n2: Name = new StringName("oss.cs.fau.de", "-");
    expect(n1.isEqual(n2)).toBe(false);
    expect(n1.getHashCode() === n2.getHashCode()).toBe(true);
  });
  it("isEqual and HashCode test 3", () => {
    let n1: Name = new StringName("oss.cs.fau.de", "-");
    let n2: Name = new StringArrayName(["oss", "cs", "fau", "de"], ".");
    expect(n1.isEqual(n2)).toBe(false);
    expect(n1.getHashCode() === n2.getHashCode()).toBe(true);
  });
  it("isEqual and HashCode test 4", () => {
    let n1: Name = new StringName("oss-cs-fau-de", "-");
    let n2: Name = new StringArrayName(["oss", "cs", "fau", "de"], ".");
    expect(n1.isEqual(n2)).toBe(false);
    expect(n1.getHashCode() === n2.getHashCode()).toBe(false);
  });
});

describe("Basic function test", () => {
  it("clone test String", () => {
    let n1: Name = new StringName("oss.cs.fau.de", ".");
    let n2 = n1.clone();
    expect(n1.isEqual(n2)).toBe(true);
  });
  it("clone test Array", () => {
    let n1: Name = new StringArrayName(["oss", "cs", "fau", "de"], ".");
    let n2 = n1.clone();
    expect(n1.isEqual(n2)).toBe(true);
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss#fau#de", '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    let n: Name = new StringName("oss.cs.fau.de", '#');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});
