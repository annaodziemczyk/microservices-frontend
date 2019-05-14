(function (){
  'use strict';

  var express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express(),
    middleware = require('express-formidable');

  var fs = require('fs');

  app.use(middleware());

  app.post("/newProduct", function(req,res){
    console.log(req.fields);
    req.fields["file"] = fs.createReadStream(req.files["image"].path);

    request.post({
      url:     endpoints.catalogueProductUrl,
      encoding: 'binary',
      formData: req.fields,
    }, function(error, response, body){
      console.log(body);
    });

  });

  app.get("/getProducts", function (req, res, next) {
    var x = endpoints.catalogueProductUrl ;//+ req.url.toString();
    console.log("getProducts "+x);
    helpers.simpleHttpRequest(x
     , res, next);
    /*request.get(x, function(error, response, body) {
      if (error) return next(error);

      var products = JSON.parse(body);
      for (var i = 0; i < products.length; i++) {
        var path = 'public/images/' + products[i].image;

        try {
          if (!fs.existsSync(path)) {
            request('http://localhost:3002/catalogue/images/' + products[i].image)
                .pipe(fs.createWriteStream('public/images/' + products[i].image));
          }
        } catch(err) {
          console.error(err)
        }

      }
      helpers.respondSuccessBody(res, body);
    }.bind({res: res}));*/

  });

  app.get("/tags", function(req, res, next) {
    helpers.simpleHttpRequest(endpoints.tagsUrl, res, next);
  });

  module.exports = app;
}());
