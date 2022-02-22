function flatten(objArr) {
  let array = [];
  for (let obj of objArr) {
    let object = {};
    for (let [key, value] of Object.entries(obj)) {
      if (Object.prototype.toString.call(value) == "[object Object]") {
        for (let [k, v] of Object.entries(value)) {
          object[k] = v;
        }
      } else {
        object[key] = value;
      }
    }
    array.push(object);
  }
  return array;
}

module.exports = flatten;
