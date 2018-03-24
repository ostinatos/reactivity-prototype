import { pushTarget, popTarget } from "./dep";
/*
Watcher
act as an observer. 
 */
class Watcher {
  constructor(getter, callback) {
    if (!getter || !callback) {
      console.error(`getter and callback for watcher is missing.`);
      return;
    }
    this.getter = getter;
    this.callback = callback;

    /* 
    assign initial value for watcher,
    meanwhile, current watcher will add as subscriber to dependant property,
    by following actions:
    add watcher to stack
    call reactive getter of dependant property
        add watcher to subscriber
    pop watcher from stack
     */
    this.value = this.get();
    // call callback for initial value
    this.callback(this.value, null);
  }

  /*
    ??? why get() 
     */
  get() {
    // push current watcher instance to watcher stack
    pushTarget(this);

    // invoke getter, which will call reactive getter registered on target property
    const value = this.getter();

    // pop current watcher instance from watcher stack
    popTarget();
    return value;
  }

  /**
   * add current watcher as dependency to
   * add current watcher as subscriber for pass-in Dep instance (observable)
   * @param {Dep} dep Dep instance, namely observable
   * @memberof Watcher
   */
  addDep(dep) {
    dep.addSubscriber(this);
  }

  /* 
    will be called when observable get changed.
     */
  update() {
    // invoke get to get the new value.
    const value = this.get();
    // store the old value.
    const oldValue = this.value;
    this.value = value;

    this.callback(value, oldValue);
  }
}

export default Watcher;
