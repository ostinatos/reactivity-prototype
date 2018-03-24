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

// watcher watches for a non-exist property.
// even if banana is added to foods in runtime, this watcher will not be notified.
// because foods.banana has not been "reactify"
let bananaWatcher = new Watcher(
  () => foods.banana,
  (newVal, oldVal) => {
    console.debug("i've got banana's new val: ", newVal);
  }
)
