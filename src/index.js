import Watcher from "./reactivity/watcher";
import { walk } from "./reactivity/reactify"

// this is the data we need to watch
let foods = {
  apple: 5, basket: {
    apple: "apple in a basket"
  }
};

// make it global so that we can toy with it.
window.foods = foods;

// make it reactive.
walk(foods);

// define a watcher.
// every time foods.apple changes, this watcher will get notified.
let appleWatcher = new Watcher(
  () => foods.apple,
  (newVal, oldVal) => {
    console.debug(
      "apple has been changed!",
      "new value: ",
      newVal,
      ", old value:",
      oldVal
    );
  }
);

// watcher watches for a non-exist ROOT-LEVEL property.
// even if banana is added to foods in runtime, this watcher will not be notified.
// because foods.banana has not been "reactify"
let bananaWatcher = new Watcher(
  () => foods.banana,
  (newVal, oldVal) => {
    console.debug("i've got banana's new val: ", newVal);
  }
)

// watcher for existing nested property
let basketAppleWatcher = new Watcher(() => foods.basket.apple, (newVal, oldVal) => {
  console.debug("existing apple in the basket, new value: ", newVal, " old value: ", oldVal);
})

// watcher for non-existing nested property
let basketBananaWatcher = new Watcher(() => foods.basket.banana, (newVal, oldVal) => {
  console.debug("non-exisiting banana in the basket, new value: ", newVal, " old value: ", oldVal);
})


// test case for array
let foodArray = ["apple", "banana", "orange"]
walk(foodArray);
window.foodArray = foodArray;

let arrayWatcher = new Watcher(
  () => foodArray[0],
  (newVal, oldVal) => {
    console.debug(
      "array[0] has been changed!",
      "new value: ",
      newVal,
      ", old value:",
      oldVal
    );
  }
);