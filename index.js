"use strict";
var stdout = process.stdout;
var stderr = process.stderr;
var defaultInput = {};
function default_1(input) {
    if (input === void 0) { input = defaultInput; }
    var _stdout = input.stdout || [];
    var _stderr = input.stderr || [];
    var both = input.both || [];
    var stdoutWrite = stdout.write;
    stdout.write = function () {
        for (var i = 0; i < _stdout.length; i++) {
            var writable = _stdout[i];
            writable.write.apply(writable, arguments);
        }
        for (var i = 0; i < both.length; i++) {
            var writable = both[i];
            writable.write.apply(writable, arguments);
        }
        return stdoutWrite.apply(stdout, arguments);
    };
    var stderrWrite = stderr.write;
    stderr.write = function () {
        for (var i = 0; i < _stderr.length; i++) {
            var writable = _stderr[i];
            writable.write.apply(writable, arguments);
        }
        for (var i = 0; i < both.length; i++) {
            var writable = both[i];
            writable.write.apply(writable, arguments);
        }
        return stderrWrite.apply(stderr, arguments);
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;