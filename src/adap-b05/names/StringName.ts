import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

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
        let clone: Name = new StringName(newName, this.getDelimiterCharacter());
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
        let component: string = this.name.slice(startIndex, endIndex + 1);
        return component;
    }

    public setComponent(i: number, c: string) {
        this.assertValidIndex(i, true);
        let old: Name = this.clone();
        let preLength: number = this.getNoComponents();
        let startIndex: number = this.getComponentStartIndex(i);
        let endIndex: number = this.getComponentEndIndex(i);
        this.name = this.name.slice(0, startIndex) + c + this.name.slice(endIndex + 1);
        this.assertCorrectComponent(i, c, old);
        this.assertCorrectLengthPost(preLength, old);
    }

    public insert(i: number, c: string) {
        this.assertValidIndex(i, false);
        let preLength: number = this.getNoComponents();
        let old: Name = this.clone();
        if (i === 0) {
            this.name = c + this.getDelimiterCharacter() + this.name;
        } else if (i === this.getNoComponents()) {
            this.name = this.name + this.getDelimiterCharacter() + c;
        } else {
            let startIndex: number = this.getComponentStartIndex(i);
            this.name = this.name.slice(0, startIndex) + c + this.getDelimiterCharacter() + this.name.slice(startIndex);
        }
        this.noComponents++;
        this.assertCorrectLengthPost(preLength + 1, old);
        this.assertCorrectComponent(i, c, old);
    }

    public append(c: string) {
        let preLength: number = this.getNoComponents();
        let old: Name = this.clone();
        this.name += this.getDelimiterCharacter() + c;
        this.noComponents++;
        this.assertCorrectLengthPost(preLength + 1, old);
        this.assertCorrectComponent(preLength, c, old);
    }

    public remove(i: number) {
        this.assertValidIndex(i, true);
        let preLength: number = this.getNoComponents();
        let old: Name = this.clone();
        let startIndex: number = this.getComponentStartIndex(i);
        let endIndex: number = this.getComponentEndIndex(i);
        if (i === this.getNoComponents() - 1) {
            this.name = this.name.slice(0, startIndex - 1) + this.name.slice(endIndex + 2);  
        } else {
            this.name = this.name.slice(0, startIndex) + this.name.slice(endIndex + 2);
        }
        this.noComponents--;
        this.assertCorrectLengthPost(preLength - 1, old);
    }

    public assertCorrectLengthPost(l: number, old: Name) {
        if (this.getNoComponents() != l) {
            this.revert(old);
            MethodFailedException.assert(false, "incorrect Name length post method");
        }
    }
    
    public assertCorrectComponent(index: number, component: string, old: Name) {
        if (this.getComponent(index) !== component) {
            this.revert(old);
            MethodFailedException.assert(false, "incorrect component post method");
        }
    }

    public revert(to: Name) {
        this.delimiter = to.getDelimiterCharacter();
        this.name = to.asDataString();
        this.noComponents = to.getNoComponents();
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