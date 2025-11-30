import { describe, it, expect } from "vitest";

import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";
import { Name } from "../../../src/adap-b04/names/Name";
import { AbstractName } from "../../../src/adap-b04/names/AbstractName";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";

describe("Asserting not null or undefined", () => {
  it("test asserIsNotNullOrUndefined", async () => {    
    const m: string = "null or undefined";

    IllegalArgumentException.assert("hurray!" != null);
    expect(() => IllegalArgumentException.assert(false, m)).toThrow(new IllegalArgumentException(m));

    MethodFailedException.assert("hurray!" != null);
    expect(() => MethodFailedException.assert(false, m)).toThrow(new MethodFailedException(m));

    InvalidStateException.assert("hurray!" != null);
    expect(() => InvalidStateException.assert(false, m)).toThrow(new InvalidStateException(m));
  });
  it("test preconditions met Constructor", () => {
    expect(() => new StringName("oss.cs.fau.de", "aa")).toThrow(new IllegalArgumentException("invalid delimiter"));
    expect(() => new StringArrayName(["oss", "cs", "fau", "de"], "ab")).toThrow(new IllegalArgumentException("invalid delimiter"));
  });
  it("text preconditions met getComponent", () => {
    let n1: Name = new StringName("oss.cs.fau.de");
    let n2:Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(() => n1.getComponent(5)).toThrow(new IllegalArgumentException("index out of range"));
    expect(() => n2.getComponent(5)).toThrow(new IllegalArgumentException("index out of range"));
  });
  it("text preconditions met setComponent", () => {
    let n1: Name = new StringName("oss.cs.fau.de");
    let n2:Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(() => n1.setComponent(5, "a")).toThrow(new IllegalArgumentException("index out of range"));
    expect(() => n2.setComponent(5, "a")).toThrow(new IllegalArgumentException("index out of range"));
  });
  it("text preconditions met insert", () => {
    let n1: Name = new StringName("oss.cs.fau.de");
    let n2:Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(() => n1.insert(5, "a")).toThrow(new IllegalArgumentException("index out of range"));
    expect(() => n2.insert(5, "a")).toThrow(new IllegalArgumentException("index out of range"));
  });
  it("text preconditions met remove", () => {
    let n1: Name = new StringName("oss.cs.fau.de");
    let n2:Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(() => n1.remove(5)).toThrow(new IllegalArgumentException("index out of range"));
    expect(() => n2.remove(5)).toThrow(new IllegalArgumentException("index out of range"));
  });
  //How am i supposed to write tests which fail postcondition/invariant checks if methods are implemented correctly?
  //Other tests are already written in adap-b02
});
