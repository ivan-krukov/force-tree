var newick = {
  flatten: function(A) {
    return A.reduce(function (flat, to_flatten) {
        return flat.concat(Array.isArray(to_flatten) ? flatten(to_flatten) : to_flatten);
    }, []);
  },
  to_json: function(s) {
    var ancestors = [];
    var tree = {index: 0};
    var tokens = s.split(/\s*(;|\(|\)|,|:)\s*/);
    var idx = 1;
    for (var i=0; i<tokens.length; i++) {
      var token = tokens[i];
      switch (token) {
        case '(': // new branchset
        var subtree = {index: idx++, parent: tree};
        tree.children = [subtree];
        ancestors.push(tree);
        tree = subtree;
        break;
        case ',': // another branch
        var subtree = {index: idx++, parent: ancestors[ancestors.length-1]};
        ancestors[ancestors.length-1].children.push(subtree);
        tree = subtree;
        break;
        case ')': // optional name next
        tree = ancestors.pop();
        break;
        case ':': // optional length next
        break;
        default:
        var x = tokens[i-1];
        if (x == ')' || x == '(' || x == ',') {
          tree.name = token;
        } else if (x == ':') {
          tree.length = parseFloat(token);
        }
      }
    }
    return tree;
  },
  traverse: function(tree) {
    var traversal = [];
    function walk(node) {
      if (node.children !== undefined) {
       for (var i = 0; i < node.children.length; i++) {
          traversal.push(node.children[i]);
          walk(node.children[i]);
        }
      }
    }
    walk(tree);
    return traversal;
  },
  to_link_node: function(tree) {
    var nodes = [{
      label: "root",
      index: 0
    }];
    var links = [];
    var traversal = newick.traverse(tree);
    console.log(traversal);

    for (var i = 0; i < traversal.length; i++) {
      var node = traversal[i];
      var name = node.name !== undefined ? node.name : "";
      nodes.push({
        label: name,
        // index: node.index
      });
      links.push({
        source: node.parent.index,
        target: node.index,
        value: node.length
      });
    }
    return {nodes: nodes, links: links};
  },
};
