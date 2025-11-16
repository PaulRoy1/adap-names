import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        if (delimiter != null) {
            this.delimiter = delimiter;
        }
        this.name = source;
        let noComponents: number = 1;
        for (let i: number = 0; i < source.length; i++) {
            if (source.charAt(i) === this.delimiter) {

                noComponents++;
            }
        }
        this.noComponents = noComponents;
    }

    public asString(delimiter: string = this.delimiter): string {
        let s: string = this.unmask();
        return s;
    }

    public asDataString(): string {
        return this.name;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0 ? true : false;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        this.assertValidIndex(x);
        let component: string = ""
        let currComponent: number = 0;
        for (let i: number = 0; i < this.name.length; i++) {
            if (this.name.charAt(i) === this.getDelimiterCharacter()) {
                currComponent++;
                continue;
            }
            if (currComponent === x) {
                component += this.name.charAt(i);
            }
        }
        return component;
    }

    public setComponent(n: number, c: string): void {
        this.assertValidIndex(n);
        let startIndex: number = this.getComponentStartIndex(n);
        let endIndex: number = this.getComponentEndIndex(n);
        this.name = this.name.slice(0, startIndex) + c + this.name.slice(endIndex + 1);
    }

    public insert(n: number, c: string): void {
        this.assertValidIndexLax(n);
        if (n === 0) {
            this.name = c + this.getDelimiterCharacter() + this.name;
        } else if (n === this.getNoComponents()) {
            this.name = this.name + this.getDelimiterCharacter() + c;
        } else {
            let startIndex: number = this.getComponentStartIndex(n);
            this.name = this.name.slice(0, startIndex) + c + this.getDelimiterCharacter() + this.name.slice(startIndex);
        }
        this.noComponents++;
    }

    public append(c: string): void {
        this.name += this.getDelimiterCharacter() + c;
        this.noComponents++;
    }

    public remove(n: number): void {
        this.assertValidIndex(n);
        let startIndex: number = this.getComponentStartIndex(n);
        let endIndex: number = this.getComponentEndIndex(n);
        if (n === this.getNoComponents() - 1) {
            this.name = this.name.slice(0, startIndex - 1) + this.name.slice(endIndex + 2);  
        } else {
            this.name = this.name.slice(0, startIndex) + this.name.slice(endIndex + 2);
        }
        this.noComponents--;
    }

    public concat(other: Name): void {
        for (let i: number = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
        this.noComponents += other.getNoComponents();
    }

    private assertValidIndex(i: number): void {
        if (i >= this.getNoComponents() || i < 0) {
            throw new Error("index out of range");
        }
    }

    private assertValidIndexLax(i: number): void {
        if (i > this.getNoComponents() || i < 0) {
            throw new Error("index out of range");
        }
    }

    private unmask(): string {
        let s: string = "";
        let removedPrevious: boolean = false;
        for (let i: number = 0; i < this.name.length; i++) {
            if (this.name.charAt(i) === "\\" && !removedPrevious) {
                removedPrevious = true;
                continue;
            } else if (removedPrevious) {
                removedPrevious = false;
            }
            s += this.name.charAt(i);
        }
        return s;
    }

    /**
     * @returns the index of the character at the start of component n
     * "oss.cs.fau.de" n = 1 => 4
     */
    private getComponentStartIndex(n: number): number {
        this.assertValidIndex(n);
        let currentComponent: number = 0;
        for (let i: number = 0; i < this.name.length; i++) {
            if (currentComponent === n) {
                return i;
            }
            if (this.name.charAt(i) === this.getDelimiterCharacter()) {
                currentComponent++;
            }
        }
        return -1;
    }

    /**
     * @returns the index of the character at the end of component n
     * "oss.cs.fau.de" n = 1 => 5
     */
    private getComponentEndIndex(n: number): number {
        this.assertValidIndex(n);
        let currentComponent: number = 0;
        let foundComponent: boolean = n === 0 ? true : false;
        for (let i: number = 0; i < this.name.length; i++) {
            if (this.name.charAt(i) === this.getDelimiterCharacter()) {
                currentComponent++;
                if (foundComponent) {
                    return i - 1;
                } else if (currentComponent === n) {
                    foundComponent = true;
                }
            }
        }
        return this.name.length - 1;
    }

}