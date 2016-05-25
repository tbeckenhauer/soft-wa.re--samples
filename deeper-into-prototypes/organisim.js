"use strict";

var Organisim = function (dnaSequence) {
  this.dna = dnaSequence;
  this.clone = function (cloneDna) {
    return Object.setPrototypeOf({
      dna: cloneDna || this.dna
    }, this);
  };
  this.mutate = function () {
    return this.dna + 'a';
  };
  this.cloneAndMutate = function (cloneDna) {
    return this.clone();
  };
}

var utils = {
  getRandomWholeNumber: function (maxValue) {
    var isInputValid = function (input) {
      return  (input <= -1) ||
              (input === null);
    }
    if(isInputValid(maxValue)) {
      throw 'bad input';
    } else {
      return parseInt(Math.random() * maxValue);
    }
  }
}
