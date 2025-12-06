import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        to.assertNoDuplicateChild(this);
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        this.assertNameNotEmpty();
        return this.baseName;
    }

    public rename(bn: string): void {
        this.assertValidName(bn, this);
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        let foundNodes: Set<Node> = new Set();
        this.doFindNodes(bn, foundNodes);
        return foundNodes;
    }

    public doFindNodes(bn: string, foundNodes: Set<Node>): void {
        if (this.getBaseName() === bn) {
            foundNodes.add(this);
        }
    }

    private assertNameNotEmpty(): void {
        ServiceFailureException.assert(this.baseName.length > 0, "name must not be empty", new InvalidStateException(""));
    }

    private assertValidName(bn: string, node: Node): void {
        IllegalArgumentException.assert(bn.length > 0, "name must not be empty");
        this.parentNode.assertNoDuplicateNamesOfSameType(bn, node);
    }

}
