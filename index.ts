import {Writable} from 'stream';

const stdout = process.stdout;
const stderr = process.stderr;


interface WritableInput {
    both?: Writable[],
    stdout?: Writable[],
    stderr?: Writable[]
}


const defaultInput = {};


export default function (input: WritableInput = defaultInput) {

    const _stdout = input.stdout || [];
    const _stderr = input.stderr || [];
    const both = input.both || [];

    const stdoutWrite = stdout.write;

    stdout.write = function () {

        for (let i = 0; i < _stdout.length; i++) {
            let writable = _stdout[i];
            writable.write.apply(writable, arguments);
        }

        for (let i = 0; i < both.length; i++) {
            let writable = both[i];
            writable.write.apply(writable, arguments);
        }

        return stdoutWrite.apply(stdout, arguments);
    };


    const stderrWrite = stderr.write;

    stderr.write = function () {

        for (let i = 0; i < _stderr.length; i++) {
            let writable = _stderr[i];
            writable.write.apply(writable, arguments);
        }

        for (let i = 0; i < both.length; i++) {
            let writable = both[i];
            writable.write.apply(writable, arguments);
        }

        return stderrWrite.apply(stderr, arguments);
    }

};