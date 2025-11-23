import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

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
        return new StringArrayName(newComponents, this.delimiter);
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

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.assertValidIndex(i);
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        this.assertValidIndex(i);
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        this.assertValidIndexLax(i);
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

    public append(c: string) {
        this.components.push(c);
    }

    public remove(i: number) {
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

    private assertValidIndexLax(i: number): void {
        if (i > this.getNoComponents() || i < 0) {
            throw new Error("index out of range");
        }
    }
    
    private assertValidIndex(i: number): void {
        if (i > this.getNoComponents() - 1 || i < 0) {
            throw new Error("index out of range");
        }
    }
}