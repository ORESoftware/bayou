/// <reference types="node" />
import { Writable } from 'stream';
export interface WritableInput {
    both?: Writable | Writable[];
    stdout?: Writable | Writable[];
    stderr?: Writable | Writable[];
}
export default function (input?: WritableInput): void;
