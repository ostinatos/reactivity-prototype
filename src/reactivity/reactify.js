import Dep from './dep'
/**
 * reactify pass-in obj
 * 
 * @param {any} obj 
 */
function walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i], obj[keys[i]]);
    }
}

/**
 * make the specific property reactive.
 * 
 * @param {any} obj 
 * @param {any} key 
 * @param {any} val 
 */
function defineReactive(obj, key, val) {
    // also make children reactive
    if (val != null && typeof val === 'object') {
        walk(val);
    }

    // create new Dep instance (observable) for current property
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            // call depend(), so that current evaluating watcher instance will be added as subscriber to current observable.
            dep.depend();
            // just return the param of defineReactive
            return val;
        },
        set: function reactiveSetter(newVal){
            // assign new value to val
            val = newVal;
            // trigger notify(), so that subscribers of dep will be notify of the change.
            dep.notify();
        }
    })

}

export {walk};