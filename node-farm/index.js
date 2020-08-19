const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceData = require("./modules/replaceData");

const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const replacedData = dataObj
      .map((obj) => replaceData(templateCard, obj))
      .join("");
    let output = templateOverview.replace("{%PRODUCT_CARDS%}", replacedData);
    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const product = dataObj[query.id];
    let output = replaceData(templateProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
    res
      .writeHead(200, {
        "Content-Type": "application/json",
      })
      .end(data);
  } else {
    res
      .writeHead(404, {
        "Content-Type": "text/html",
      })
      .end("<h1>Page not found!<h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on port 3000");
});
