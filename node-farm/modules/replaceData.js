const slugify = require("slugify");

module.exports = (template, obj) => {
  let output = template;
  output = output.replace(
    /{%SLUG%}/g,
    slugify(obj.productName, { replacement: "-", lower: true })
  );
  output = output.replace(/{%ID%}/g, obj.id);
  output = output.replace(/{%PRODUCTNAME%}/g, obj.productName);
  output = output.replace(/{%IMAGE%}/g, obj.image);
  output = output.replace(/{%FROM%}/g, obj.from);
  output = output.replace(/{%NUTRIENTS%}/g, obj.nutrients);
  output = output.replace(/{%QUANTITY%}/g, obj.quantity);
  output = output.replace(/{%PRICE%}/g, obj.price);
  if (!obj.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  output = output.replace(/{%DESCRIPTION%}/g, obj.description);
  return output;
};
