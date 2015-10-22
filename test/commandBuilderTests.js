'use strict';

var expect = require("chai").expect;
var commandBuilder = require('../commandBuilder.js');

describe("CommandBuilder", function() {
    describe("#setBuildType", function() {
        it("Should return the mcs --debug flag when debug is passed in", function() {
            var result = commandBuilder.setBuildType('debug')
            expect(result).to.equal('--debug');
        });

        it("Should return the empty string when release is passed in", function() {
            var result = commandBuilder.setBuildType('release')
            expect(result).to.equal('');
        })
    })
})