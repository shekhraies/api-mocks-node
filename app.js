var http = require("http");
var finalhandler = require("finalhandler");
var Router = require("router");

const _ = require("lodash");

// create the router and server
var router = new Router();
var server = http.createServer(function onRequest(req, res) {
  router(req, res, finalhandler(req, res));
});

// register a route and add all methods
router.route("/").all(function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      message: "Demo mocks api",
      apis: ["/v1/users", "/v1/cities"],
    })
  );
});

// register a route and add all methods
router.route("/*").all(function (req, res) {
  getResponse(req, res);
});

// make our http server listen to connections
server.listen(3000);

// Methods
function getResponse(req, res) {
  try {
    let routeArr = req.url.split("/");
    let mockFile = _.get(routeArr, "[2]", false);
    let searchString = _.get(routeArr, "[3]", false);

    if (mockFile) {
      const data = require("./mocks/" + mockFile + ".json");

      if (req.method === _.get(data, "request.method", false)) {
        let body = _.get(data, "response.body", false);
        if (_.startsWith(req.url, _.get(data, "request.path", ""))) {
          if (searchString) {
            let result = body.find((t) => t.id == searchString);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
          } else {
            // this is GET /pet/:id
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(body));
          }
        } else {
          printMessage(req, res, "Invalid url!");
        }
      } else {
        printMessage(req, res, "Invalid method!");
      }
    } else {
      printMessage(req, res, "Invalid file request!");
    }
  } catch (error) {
    printMessage(req, res, "Invalid request!");
  }
}

function printMessage(req, res, message) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: message }));
}
