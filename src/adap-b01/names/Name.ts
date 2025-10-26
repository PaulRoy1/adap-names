export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    /** Expects that all Name components are properly masked */
    //@methodtype constructor-method
    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter != null) {
            this.delimiter = delimiter;
        }
    }

    /**
     * Returns a human-readable representation of the Name instance using user-set special characters
     * Special characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    //@methodtype conversion-method
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

    /** 
     * Returns a machine-readable representation of Name instance using default special characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The special characters in the data string are the default characters
     */
    //@methodtype conversion-method
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

    /** Returns properly masked component string */
    //@methodtype get-method
    public getComponent(i: number): string {
        this.assertValidIndex(i);
        return this.components[i];
    }

    /** Expects that new Name component c is properly masked */
    //@methodtype set-method
    public setComponent(i: number, c: string): void {
        this.assertValidIndex(i);
        this.components[i] = c;
    }

     /** Returns number of components in Name instance */
     //@methodtype get-method
     public getNoComponents(): number {
        return this.components.length;
    }

    /** Expects that new Name component c is properly masked */
    //@methodtype command-method
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

    /** Expects that new Name component c is properly masked */
    //@methodtype command-method
    public append(c: string): void {
        this.components.push(c);
    }

    //@methodtype command-method
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

    //@methodtype assertion-method
    private assertValidIndex(i: number): void {
        if (i > this.getNoComponents() - 1 || i < 0) {
            throw new Error("invalid Index");
        }
    }

    //@methodtype command-method
    private unmask(str: string): string {
        let s: string = "";
        for (let i: number = 0; i < str.length; i++) {
            if (str.charAt(i) === "\\") {
                continue;
            }
            s += str.charAt(i);
        }
        return s;
    }

}
