import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringArrayName extends AbstractName {

    private readonly components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source;
    }

    public clone(): Name {
        const newComponents: string[] = [];
        for (let i: number = 0; i < this.components.length; i++) {
            newComponents.push(this.components[i]);
        }
        const clone: Name = new StringArrayName(newComponents, this.getDelimiterCharacter());
        this.assertCorrectClone(clone);
        return clone;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.assertValidIndex(i, true);
        return this.components[i];
    }

    public setComponent(i: number, c: string): Name {
        this.assertValidIndex(i, true);
        const newComponents: string[] = this.cloneComponents();
        newComponents[i] = c;
        const ret: Name = new StringArrayName(newComponents, this.getDelimiterCharacter());
        ret.assertCorrectComponent(i, c);
        ret.assertCorrectLengthPost(this.getNoComponents());
        return ret;
    }

    public insert(i: number, c: string): Name {
        this.assertValidIndex(i, false);
        const newComponents: string[] = [];
        for (let index: number = 0; index < this.getNoComponents(); index++) {
            if (index === i) {
                newComponents.push(c);
            }
            newComponents.push(this.getComponent(index));
        }
        if (i === this.getNoComponents()) {
            newComponents.push(c);
        }
        const ret: Name =  new StringArrayName(newComponents, this.getDelimiterCharacter());
        ret.assertCorrectComponent(i, c);
        ret.assertCorrectLengthPost(this.getNoComponents() + 1);
        return ret;
    }

    public append(c: string): Name {
        const newComponents: string[] = this.cloneComponents();
        newComponents.push(c);
        const ret: Name = new StringArrayName(newComponents, this.getDelimiterCharacter());
        ret.assertCorrectComponent(this.getNoComponents(), c);
        ret.assertCorrectLengthPost(this.getNoComponents() + 1);
        return ret;
    }

    public remove(i: number): Name {
        this.assertValidIndex(i, true);
        const newComponents: string[] = [];
        for (let index: number = 0; index < this.getNoComponents(); index++) {
            if (index === i) {
                continue;
            }
            newComponents.push(this.getComponent(index));
            
        }
        const ret: Name = new StringArrayName(newComponents, this.getDelimiterCharacter());
        ret.assertCorrectLengthPost(this.getNoComponents() - 1);
        return ret;
    }

    private cloneComponents(): string[] {
        const newComponents: string[] = [];
        for (let index: number = 0; index < this.getNoComponents(); index++) {
            newComponents.push(this.getComponent(index));
            
        }
        return newComponents;
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
}