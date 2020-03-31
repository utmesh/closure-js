/*CLOSURE means that an inner function always has access to the vars and parameters of its
 outer function, even after the outer function has returned.*/

//InnerFunction() can access outerVariable even if it will be executed separately.

function OuterFunction() {
  var outerVariable = 100;

  function InnerFunction() {
    alert(outerVariable);
  }
  return InnerFunction;
}
var innerFunc = OuterFunction();
innerFunc();

/**return InnerFunction; returns InnerFunction from OuterFunction when you call OuterFunction().
 *  A variable innerFunc reference the InnerFunction() only, not the OuterFunction(). So now,
 * when you call innerFunc(), it can still access outerVariable which is declared in
 * OuterFunction(). This is called Closure. */

/**
 * important characteristic of closure is that outer variables can keep their STATES between
 * multiple calls. Remember, inner function does not keep the separate copy of outer variables
 * but it REFERENCE outer variables, that means value of the outer variables will be CHANGED
 * if you change it using inner function.
 */

function Counter() {
  var counter = 0;
  function IncreaseCounter() {
    return (counter += 1);
  }
  return IncreaseCounter;
}
var counter = Counter();
alert(counter()); //1
alert(counter()); //2

//Clousre is valid in multiple levels of inner functions

function Counter1() {
  var counter = 0;

  setTimeout(function() {
    var innerCounter = 0;
    counter += 1;
    alert("counter =" + counter);

    setTimeout(function() {
      counter += 1;
      innerCounter += 1;
      alert("counter = " + counter + ", innerCounter =" + innerCounter);
    }, 500);
  }, 1000);
}

Counter1();

//Uses: hiding implementation detail in JS, useful to create private variables or functions

var counter1 = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };
})();

alert(counter1.value()); //0
counter1.increment();
counter1.increment();
alert(counter1.value()); //2
counter1.decrement();
alert(counter1.value()); //1

/**
 * increment(), decrement() and value() becomes public function because they are included in
 * return object.
 * changeBy() becomes private function because it is not returned and only used internally by
 * increment() and decrement()
 */
