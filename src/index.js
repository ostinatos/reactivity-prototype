import Watcher from "./reactivity/watcher";

let foods = { apple: 5 };

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
