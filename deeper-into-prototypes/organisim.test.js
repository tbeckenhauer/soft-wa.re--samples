var itShould = function (behavior, test) {
  return function (it) {
    try {
      if(test()) {
        //everything went fine
      } else {
        throw "Test Failed";
      }
    } catch (error) {
      console.error(it + ' should ' + behavior);
    }
  }
}

var describe = function (it, shoulds) {
  shoulds.forEach(function (should) {
    should(it);
  });
};

describe('organisim', [
  itShould('exist', function () {
    return !!(Organisim);
  })
]);

describe('organisim.clone', [
  itShould('have a clone method', function () {
    var org = new Organisim();
    return !!(org.clone);
  }),
  itShould('store the first argument on dna', function () {
    var firstArg = 'firstArg';
    var org = new Organisim(firstArg);
    return firstArg === org.dna;
  }),
  itShould('clone itself with the clone method', function () {
    var org = new Organisim();
    var orgClone = org.clone();
    return Object.getPrototypeOf(orgClone) === org;
  }),
  itShould('clone itself with the first argument of clone', function () {
    var orgFirstArg = 'aaaa';
    var orgCloneFirstArg = 'bbbb';
    var org = new Organisim(orgFirstArg);
    var orgClone = org.clone(orgCloneFirstArg);

    return orgClone.dna === orgCloneFirstArg;
  })
]);

describe('organisim.mutate', [
  itShould('have a mutate method', function () {
    var org = new Organisim();
    return !!(org.mutate);
  }),
  itShould('sometimes produce an organisim that has a different dna', function () {
    var tryToProduceNewDna = function () {
      /*
      A loop would have been fine, and In production I would use a loop with
      maximumNumberOfTries, but I had fun blowing through the stack.
      Interestingly when I wrote it with tail call optimization it still blew
      through the stack. so I am missing something... Either Chrome doesn't
      have TCO enabled by default or Chrome still accounts for the StackSize
      */
      var org = new Organisim();
      var newDna = org.mutate();
      if (org.dna !== newDna) {
        return true;
      } else {
        return tryToProduceNewDna();
      }
    };
    return tryToProduceNewDna();
  }),
]);

describe('organisim.cloneAndMutate', [
  itShould('have a cloneAndMutate method', function () {
    var org = new Organisim();
    return !!(org.cloneAndMutate);
  }),
  itShould('call clone', function () {
    var org = new Organisim();
    var fakeCloneWasCalled = false;
    org.clone = function () {
      fakeCloneWasCalled = true;
    }
    org.cloneAndMutate();
    return fakeCloneWasCalled;
  }),
])

describe('utils', [
  itShould('exist', function () {
    return !!(utils);
  })
])

describe('utils.getRandomWholeNumber', [
  itShould('exist', function () {
    return !!(utils.getRandomWholeNumber);
  }),

  itShould('throw an exception for each bad input', function () {
    var badInputs = [-1, null];
    var processBadInputs = function (badInput) {
      try {
        var exceptionThrown = false;
        utils.getRandomWholeNumber(badInput);
      } catch (e) {
        exceptionThrown = true;
      } finally {
        return exceptionThrown;
      }
    }

    var wereExceptionsThrown = badInputs.map(processBadInputs);

    var wasAnExceptionThrownForAllBadInputs = wereExceptionsThrown.reduce(function (previousTest, currentTest) {
      return previousTest && currentTest;
    })

    return wasAnExceptionThrownForAllBadInputs;
  }),

  itShould('call Math.random', function () {
    var goodInput = 4;
    var wasCalled = false;
    var fakeMathRandom = function (){
      wasCalled = true;
    }
    var originalMathRandom = Math.random;
    Math.random = fakeMathRandom;
    var randomValue = utils.getRandomWholeNumber(goodInput);
    Math.random = originalMathRandom;
    return wasCalled;
  }),

  itShould('return an interger for good input', function () {
    var goodInput = 1;
    var randomValue = utils.getRandomWholeNumber(goodInput);
    return Number.isInteger(randomValue);
  }),

  itShould('not return zero everytime', function () {
    var timesZero = 0;
    var timesNotZero = 0;
    var tallyOutput = function (input) {
      if (0 === utils.getRandomWholeNumber(input)) {
        timesZero += 1;
      } else {
        timesNotZero += 1;
      }
    }
    var isZeroNotReturnedEverytime = function () {
      return timesZero < timesNotZero;
    }

    for (var tries = 1; tries < 100; tries++) {
      var convientGoodInput = tries;
      tallyOutput(convientGoodInput);
    }
    return isZeroNotReturnedEverytime();
  })

])
