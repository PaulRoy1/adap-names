import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    private readonly delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.assertValidDelimiter(delimiter);
        this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        this.assertValidDelimiter(delimiter);
        let s: string = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            s += this.unmask(this.getComponent(i));
            if (i < this.getNoComponents() - 1) {
                s+= delimiter;
            }
        }
        return s;
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        let s: string = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            s += this.getComponent(i);
            if (i < this.getNoComponents() - 1) {
                s+= this.delimiter;
            }
        }
        return s;
    }

    public isEqual(other: Name): boolean {
        if (this.getDelimiterCharacter() != other.getDelimiterCharacter()) {
            return false;
        } else if (this.getNoComponents() != other.getNoComponents()) {
            return false;
        }
        let s1: string = this.toString();
        let s2: string = other.toString();
        return s1 === s2;
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i: number = 0; i < s.length; i++) {
            let c: number = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    private unmask(str: string): string {
        let s: string = "";
        let removedPrevious: boolean = false;
        for (let i: number = 0; i < str.length; i++) {
            if (str.charAt(i) === "\\" && !removedPrevious) {
                removedPrevious = true;
                continue;
            } else if (removedPrevious) {
                removedPrevious = false;
            }
            s += str.charAt(i);
        }
        return s;
    }

    public concat(other: Name): Name {
        let newName = this.clone();
        for (let i: number = 0; i < other.getNoComponents(); i++) {
            newName = newName.append(other.getComponent(i));
            let currIndex: number = this.getNoComponents() + i;
            newName.assertCorrectIntermediateState(currIndex + 1, currIndex, other.getComponent(i));
        }
        newName.assertCorrectLengthPost(this.getNoComponents() + other.getNoComponents());
        return newName;
    }

    public assertValidIndex(i: number, strict: boolean): void {
        if (strict) {
            IllegalArgumentException.assert(i < this.getNoComponents() && i >= 0, "index out of range");
        } else {
            IllegalArgumentException.assert(i <= this.getNoComponents() && i >= 0, "index out of range");
        }
    }

    public assertValidDelimiter(delimiter: string) {
        IllegalArgumentException.assert(delimiter.length === 1, "invalid delimiter");
    }

    public assertCorrectClone(name: Name) {
        MethodFailedException.assert(this.getDelimiterCharacter() === name.getDelimiterCharacter(), "cloning failed");    
        MethodFailedException.assert(this.getNoComponents() === name.getNoComponents(), "cloning failed");
        for (let i: number = 0; i < this.getNoComponents(); i++) {
            MethodFailedException.assert(this.getComponent(i) === name.getComponent(i), "cloning failed");
        }
    }

    public assertCorrectIntermediateState(length: number, index: number, component: string): void {
        InvalidStateException.assert(this.getNoComponents() === length, "concating created invalid state");
        InvalidStateException.assert(this.getComponent(index) === component, "concating created invalid state");
        
    }

    abstract clone(): Name;

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): Name;

    abstract insert(i: number, c: string): Name;
    abstract append(c: string): Name;
    abstract remove(i: number): Name;

    abstract assertCorrectLengthPost(l: number): void;
    abstract assertCorrectComponent(index: number, component: string): void;
}