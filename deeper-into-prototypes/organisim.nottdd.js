"use strict";

var Organisim = function (dnaSequence) {

  this.dna = dnaSequence;

  this.clone = function () {
    return new Organisim(this.mutateDna(this.dna));
  }

  this.mutateDna = function (dna) {
    var bitMap = {
      '0': 'a',
      '1': 'c',
      '2': 't',
      '3': 'g',
    }
    var bitToMutate = this.getRandomInt(dna.length);
    var bitToMutateWith = bitMap[this.getRandomInt(3)];

    return this.replaceCharAt(dna, bitToMutateWith, bitToMutate);
  }

  this.replaceCharAt = function(oldString, character, index) {
    return oldString.substr(0, index) + character + oldString.substr(index + 1);
  }

  this.getRandomInt = function(maxValue) {
    return parseInt(Math.random() * maxValue);
  }

}
var org = new Organisim('actt');
var newOrg = org.clone();
