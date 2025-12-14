import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringName extends AbstractName {

    private readonly name: string = "";
    private readonly noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        let noComponents: number = 1;
        for (let i: number = 0; i < source.length; i++) {
            if (source.charAt(i) === this.getDelimiterCharacter()) {
                noComponents++;
            }
        }
        this.noComponents = noComponents;
    }

    public clone(): Name {
        const newName: string = ("." + this.name).slice(1);
        const clone: Name = new StringName(newName, this.getDelimiterCharacter());
        this.assertCorrectClone(clone);
        return clone;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        this.assertValidIndex(i, true);
        let startIndex: number = this.getComponentStartIndex(i);
        let endIndex: number = this.getComponentEndIndex(i);
        const component: string = this.name.slice(startIndex, endIndex + 1);
        return component;
    }

    public setComponent(i: number, c: string): Name {
        this.assertValidIndex(i, true);
        let startIndex: number = this.getComponentStartIndex(i);
        let endIndex: number = this.getComponentEndIndex(i);
        const newComponents: string = this.name.slice(0, startIndex) + c + this.name.slice(endIndex + 1);
        const ret: Name = new StringName(newComponents, this.getDelimiterCharacter());
        ret.assertCorrectComponent(i, c);
        ret.assertCorrectLengthPost(this.getNoComponents());
        return ret;
    }

    public insert(i: number, c: string): Name {
        this.assertValidIndex(i, false);
        let newComponents: string;
        if (i === 0) {
            newComponents = c + this.getDelimiterCharacter() + this.name;
        } else if (i === this.getNoComponents()) {
            newComponents = this.name + this.getDelimiterCharacter() + c;
        } else {
            let startIndex: number = this.getComponentStartIndex(i);
            newComponents = this.name.slice(0, startIndex) + c + this.getDelimiterCharacter() + this.name.slice(startIndex);
        }
        const ret: Name = new StringName(newComponents, this.getDelimiterCharacter());
        ret.assertCorrectLengthPost(this.getNoComponents() + 1);
        ret.assertCorrectComponent(i, c);
        return ret;
    }

    public append(c: string): Name {
        const newComponents: string = this.name + this.getDelimiterCharacter() + c;
        const ret: Name = new StringName(newComponents, this.getDelimiterCharacter());
        ret.assertCorrectLengthPost(this.getNoComponents() + 1);
        ret.assertCorrectComponent(this.getNoComponents(), c);
        return ret;
    }

    public remove(i: number): Name {
        this.assertValidIndex(i, true);
        let startIndex: number = this.getComponentStartIndex(i);
        let endIndex: number = this.getComponentEndIndex(i);
        let newComponents: string;
        if (i === this.getNoComponents() - 1) {
            newComponents = this.name.slice(0, startIndex - 1) + this.name.slice(endIndex + 2);  
        } else {
            newComponents = this.name.slice(0, startIndex) + this.name.slice(endIndex + 2);
        }
        const ret: Name = new StringName(newComponents, this.getDelimiterCharacter());
        ret.assertCorrectLengthPost(this.getNoComponents() - 1);
        return ret;
    }

    public assertCorrectLengthPost(l: number) {
        if (this.getNoComponents() != l) {
            MethodFailedException.assert(false, "incorrect Name length post method");
        }
    }
    
    public assertCorrectComponent(index: number, component: string) {
        if (this.getComponent(index) !== component) {
            MethodFailedException.assert(false, "incorrect component post method");
        }
    }

    /**
     * @returns the index of the character at the start of component n
     * "oss.cs.fau.de" n = 1 => 4
     */
    private getComponentStartIndex(n: number): number {
        this.assertValidIndex(n, true);
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
        this.assertValidIndex(n, true);
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