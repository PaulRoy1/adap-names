import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        this.components = source;
        if (delimiter != null) {
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        let s: string = ""
        for (let i: number = 0; i < this.getNoComponents(); i++) {
            s += this.unmask(this.getComponent(i));
            if (i < this.getNoComponents() - 1) {
                s += this.delimiter;
            }
        }
        return s;
    }

    public asDataString(): string {
        let s: string = "";
                for (let i: number = 0; i < this.getNoComponents(); i++) {
                    s += this.getComponent(i);
                    if (i < this.getNoComponents() - 1) {
                        s += DEFAULT_DELIMITER;
                    }
                }
                return s;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        if (this.components.length === 0) {
            return true;
        }
        return false;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.assertValidIndex(i);
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        this.assertValidIndex(i);
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if (i > this.components.length || i < 0) {
            throw new Error("index out of range");
        }
        let n: string[] = [];
        let index = 0;
        while (index < i) {
            n.push(this.getComponent(index))
            index++;
        }
        n.push(c);
        while (index < this.getNoComponents()) {
            n.push(this.components[index]);
            index++;
        }
        this.components = n;
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        this.assertValidIndex(i);
        let n: string[] = [];
        for (let index = 0; index < this.getNoComponents(); index++) {
            if (index == i) {
                continue;
            }
            n.push(this.components[index])
        }
        this.components = n;
    }

    public concat(other: Name): void {
        for (let i: number = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

    private assertValidIndex(i: number): void {
        if (i > this.getNoComponents() - 1 || i < 0) {
            throw new Error("index out of range");
        }
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

}