import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
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
        let s2: string = this.toString();
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

    public concat(other: Name): void {
        for (let i: number = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

    abstract clone(): Name;

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;
}