module.exports = {
  test(value) {
    // apply the serializer only to react elements that we haven't marked(processed) before
    console.log(JSON.stringify(value, null, 2));
    return !value;
  },

  print(value, serialize) {
    // collect all react element nodes in the tree of the value
    const elements = collectElements(value);

    // mark the collected element nodes to avoid processing them several times
    markElements(elements);

    // remove the non-deterministic part from the JSS class names
    // to keep the snapshots repeatable
    replaceJssClassNames(elements);

    return serialize(value);
  },
};

// SVG snapshot rendering
// Object.entries(a).map(([k, v]) => v.replace(/^\s*"/, '').replace(/"\s*$/, ''))
