var http = require("http");
var finalhandler = require("finalhandler");
var Router = require("router");

const _ = require("lodash");

/**
 * create the router and server
 */
var router = new Router();
var server = http.createServer(function onRequest(req, res) {
  router(req, res, finalhandler(req, res));
});

/**
 * Root route handler
 */
router.route("/").all(function (req, res) {
  const testFolder = "./mocks/";
  const fs = require("fs");

  let apis = [];
  fs.readdir(testFolder, (err, files) => {
    if (err) {
      printError(res, "Invalid file path.");
    } else {
      files.forEach((file) => {
        apis.push("/v1/" + _.replace(file, ".json", ""));
      });

      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message: "Demo mocks api",
          apis: apis,
          code: 1,
        })
      );
    }
  });
});

/**
 * Api route handler
 */
router.route("/*").all(function (req, res) {
  getResponse(req, res);
});

/**
 * make our http server listen to connections
 */
server.listen(3000);

/**
 *
 * @description : Get Response as JSON
 *
 * @param {*} req
 * @param {*} res
 */
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
            if (result) {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(result));
            } else {
              printError(res, "Record not found!");
            }
          } else {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(body));
          }
        } else {
          printError(res, "Invalid url!");
        }
      } else {
        printError(res, "Invalid method!");
      }
    } else {
      printError(res, "Invalid file request!");
    }
  } catch (error) {
    printError(res, "Invalid request!");
  }
}

/**
 * @description : Print error output in json
 *
 * @param {*} res
 * @param {*} errorMessage
 */
function printError(res, errorMessage) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: errorMessage, code: 2 }));
}
