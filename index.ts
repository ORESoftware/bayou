'use strict';

const flattenDeep = require('lodash/flattenDeep');
import {Writable} from 'stream';

const stdout = process.stdout;
const stderr = process.stderr;


interface WritableInput {
    both?: Writable | Writable[],
    stdout?: Writable | Writable[],
    stderr?: Writable | Writable[]
}


const defaultInput = {};


export default function (input: WritableInput = defaultInput) {

    const _stdout = flattenDeep(input.stdout || []);
    const _stderr = flattenDeep(input.stderr || []);
    const both = flattenDeep(input.both || []);

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