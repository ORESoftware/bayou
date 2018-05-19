'use strict';

import {Writable} from 'stream';

const flattenDeep = function (a: Array<any>): Array<any> {
  return a.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
};

const stdout = process.stdout;
const stderr = process.stderr;

export interface WritableInput {
  both?: Writable | Writable[],
  stdout?: Writable | Writable[],
  stderr?: Writable | Writable[]
}

const defaultInput = {};

export default function (input: WritableInput = defaultInput) {

  const _stdout = flattenDeep([input.stdout]).filter(Boolean);
  const _stderr = flattenDeep([input.stderr]).filter(Boolean);
  const both = flattenDeep([input.both]).filter(Boolean);

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