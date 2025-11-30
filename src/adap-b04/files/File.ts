import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        this.assertViableOperation(FileState.OPEN);
        // do something
    }

    public read(noBytes: number): Int8Array {
        this.assertFileOpen();
        // read something
        return new Int8Array();
    }

    public close(): void {
        this.assertViableOperation(FileState.CLOSED)
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    private assertViableOperation(state: FileState): void {
        IllegalArgumentException.assert(state !== this.doGetFileState(), "illegal operation");
        IllegalArgumentException.assert(this.doGetFileState() !== FileState.DELETED, "operation not possible on deleted file");
    }

    private assertFileOpen(): void {
        IllegalArgumentException.assert(this.doGetFileState() === FileState.OPEN, "file needs to be open to be read");
    }

}