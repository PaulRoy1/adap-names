import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b06/names/Name";
import { AbstractName } from "../../../src/adap-b06/names/AbstractName";
import { StringName } from "../../../src/adap-b06/names/StringName";
import { StringArrayName } from "../../../src/adap-b06/names/StringArrayName";

describe("Basic function tests", () => {
  it("Constructor test", () => {
    let n1: Name = new StringName("oss.cs.fau.de", ".");
    let n2: Name = new StringArrayName(["oss", "cs", "fau", "de"], ".");
    expect(n1.isEmpty()).toBe(false);
    expect(n1.isEqual(n2)).toBe(true);
    n2 = n2.remove(2);
    expect(n2.asString()).toBe("oss.cs.de");
    expect(n1.isEqual(n2)).toBe(false);
    n1 = n1.remove(3);
    expect(n1.asString()).toBe("oss.cs.fau");
    expect(n1.isEqual(n2)).toBe(false);
    n2 = n2.append("fau");
    expect(n2.asString()).toBe("oss.cs.de.fau");
    expect(n1.isEqual(n2)).toBe(false);
    n1 = n1.insert(2, "de");
    expect(n2.asString()).toBe("oss.cs.de.fau");
    expect(n1.isEqual(n2)).toBe(true);
    n1 = n1.concat(n2);
    expect(n1.asString()).toBe("oss.cs.de.fau.oss.cs.de.fau");
    n1 = n1.setComponent(3, "abc");
    expect(n1.asString()).toBe("oss.cs.de.abc.oss.cs.de.fau");
  });
});
