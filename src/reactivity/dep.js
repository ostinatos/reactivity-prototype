/* 
Dep
act as an observable.
every property will have a Dep instance associated with it.
*/
class Dep {
  constructor() {
    // NOTICE: this is a SET, so that no duplicate subscriber will be added.
    this.subscribers = new Set();
  }

  /**
   * add watcher instance to subscriber list.
   *
   * @param {Watcher} watcher instance of Watcher class
   * @memberof Dep
   */
  addSubscriber(watcher) {
    this.subscribers.add(watcher);
  }

  /**
   * see if there is any watcher depends on current observable,
   * if yes, add target watcher instance to subscriber list of current observable.
   * 
   * @memberof Dep
   */
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  /**
   * notify subscribers of update
   * through calling update method on every subscriber(Watcher instance)
   *
   * @memberof Dep
   */
  notify() {
    this.subscribers.forEach(subscriber => {
      subscriber.update();
    });
  }
}

// static 
Dep.target = null;
const targetStack = [];

// NOTICE: targetStack is not necessary for prototyping reactivity.
// but in vue production code (currently 2.5.17), targetStack is used.
function pushTarget(_target){
    // push to stack
    // if(Dep.target){
    //     targetStack.push(_target);
    // }

    // set current target 
    Dep.target = _target;
}

function popTarget(){
    // Dep.target = targetStack.pop();
    Dep.target = null;
}

export {pushTarget, popTarget}
export default Dep;