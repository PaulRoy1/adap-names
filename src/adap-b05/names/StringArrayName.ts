import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source;
    }

    public clone(): Name {
        let newComponents: string[] = [];
        for (let i: number = 0; i < this.components.length; i++) {
            newComponents.push(this.components[i]);
        }
        let clone: Name = new StringArrayName(newComponents, this.getDelimiterCharacter());
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

    public setComponent(i: number, c: string) {
        this.assertValidIndex(i, true);
        let old: Name = this.clone();
        let preLength: number = this.getNoComponents();
        this.components[i] = c;
        this.assertCorrectComponent(i, c, old);
        this.assertCorrectLengthPost(preLength, old);
    }

    public insert(i: number, c: string) {
        this.assertValidIndex(i, false);
        let preLength = this.getNoComponents();
        let old: Name = this.clone();
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
        this.assertCorrectComponent(i, c, old);
        this.assertCorrectLengthPost(preLength + 1, old);
    }

    public append(c: string) {
        let preLength = this.getNoComponents();
        let old: Name = this.clone();
        this.components.push(c);
        this.assertCorrectComponent(preLength, c, old);
        this.assertCorrectLengthPost(preLength + 1, old);
    }

    public remove(i: number) {
        this.assertValidIndex(i, true);
        let preLength = this.getNoComponents();
        let old: Name = this.clone();
        let n: string[] = [];
        for (let index = 0; index < this.getNoComponents(); index++) {
            if (index == i) {
                continue;
            }
            n.push(this.components[index])
        }
        this.components = n;
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
        let components: string[] = [];
        for (let i: number = 0; i < to.getNoComponents(); i++) {
            components.push(to.getComponent(i));
        }
        this.components = components;
    }
}