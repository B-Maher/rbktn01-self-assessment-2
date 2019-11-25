/**
 *
 * Implement a `map` method on this Tree class, using pseudoclassical instantiation.
 *
 * Map accepts a mapping function as its only argument. It traverses the tree,
 * passing each node's value into the mapping function, and generates a new
 * tree containing the results.
 *
 * So `map` should return a tree with the same structure, and different values,
 * but it should NOT modify the tree that was passed in.
 *
 * Example:
 *   var root1 = new Tree(1);
 *   var branch2 = root1.addChild(2);
 *   var branch3 = root1.addChild(3);
 *   var leaf4 = branch2.addChild(4);
 *   var leaf5 = branch2.addChild(5);
 *   var leaf6 = branch3.addChild(6);
 *   var leaf7 = branch3.addChild(7);
 *   var newTree = root1.map(function (value) {
 *     return value * 2;
 *   })
 *  newTree.value // 2
 *  newTree.children[0].value // 4
 *  newTree.children[1].value // 6
 *  newTree.children[0].children[1].value // 10
 *  newTree.children[1].children[1].value // 14
 *  root1.value // still 1
 */

var Tree = function(value) {
  this.value = value;
  this.children = [];
};

Tree.prototype.addChild = function(value) {
  //intentiate the child and push it to the children array
  this.children.push(new Tree(value));
  //return the child
  return new Tree(value);
};

Tree.prototype.map = function(cb, from, to) {
  //create the new tree that will be returned
  var root = new Tree(cb(this.value));
  function innerFunction(cb, from, to) {
    //check if the current node has any children
    if (from.children.length) {
      //loop over the children
      for (var i = 0; i < from.children.length; i++) {
        //add the children to the new tree after applying the call back function
        to.addChild(cb(from.children[i].value));
        //repeat the steps using recursion
        innerFunction(cb, from.children[i], to.children[i]);
      }
    }
  }
  //call the recursion function to do all the steps
  innerFunction(cb, this, root);
  //return the new tree
  return root;
};
