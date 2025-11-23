import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        let noComponents: number = 1;
        for (let i: number = 0; i < source.length; i++) {
            if (source.charAt(i) === this.delimiter) {
                noComponents++;
            }
        }
        this.noComponents = noComponents;
    }

    public clone(): Name {
        let newName: string = ("." + this.name).slice(1);
        return new StringName(newName, this.getDelimiterCharacter());
    }

    public asDataString(): string {
        return this.name;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        this.assertValidIndex(i);
        let startIndex: number = this.getComponentStartIndex(i);
        let endIndex: number = this.getComponentEndIndex(i);
        let component: string = this.name.slice(startIndex, endIndex + 1);
        return component;
    }

    public setComponent(i: number, c: string) {
        this.assertValidIndex(i);
        let startIndex: number = this.getComponentStartIndex(i);
        let endIndex: number = this.getComponentEndIndex(i);
        this.name = this.name.slice(0, startIndex) + c + this.name.slice(endIndex + 1);
    }

    public insert(i: number, c: string) {
        this.assertValidIndexLax(i);
        if (i === 0) {
            this.name = c + this.getDelimiterCharacter() + this.name;
        } else if (i === this.getNoComponents()) {
            this.name = this.name + this.getDelimiterCharacter() + c;
        } else {
            let startIndex: number = this.getComponentStartIndex(i);
            this.name = this.name.slice(0, startIndex) + c + this.getDelimiterCharacter() + this.name.slice(startIndex);
        }
        this.noComponents++;
    }

    public append(c: string) {
        this.name += this.getDelimiterCharacter() + c;
        this.noComponents++;
    }

    public remove(i: number) {
        this.assertValidIndex(i);
        let startIndex: number = this.getComponentStartIndex(i);
        let endIndex: number = this.getComponentEndIndex(i);
        if (i === this.getNoComponents() - 1) {
            this.name = this.name.slice(0, startIndex - 1) + this.name.slice(endIndex + 2);  
        } else {
            this.name = this.name.slice(0, startIndex) + this.name.slice(endIndex + 2);
        }
        this.noComponents--;
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