import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { RootNode } from "./RootNode";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.assertNoDuplicateChild(cn);
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    public doFindNodes(bn: string, foundNodes: Set<Node>): void {
        if (this.getFullName().toString() === "") {
            // no op
        } else if (this.getBaseName() === bn) {
            foundNodes.add(this);
        }
        this.childNodes.forEach(child => {
            child.doFindNodes(bn, foundNodes);
        })
    }

    public assertNoDuplicateChild(child: Node): void {
        IllegalArgumentException.assert(!this.childNodes.has(child), "child already exists => cannot be added");
    }

    public assertNoDuplicateNamesOfSameType(name: string, node: Node): void {
        this.childNodes.forEach((child) => {
            if (child.getBaseName() === name) {
                IllegalArgumentException.assert(child.constructor != node.constructor, "name with same type already exists in directory");
            }
        })
    }

}