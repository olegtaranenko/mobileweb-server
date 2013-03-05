// find a more complete pushState server here https://gist.github.com/1359650/516c8cceca852d4f2ed380960a67a6bee7b23773
var fs = require("fs"),
  express = require("express"),
  url = require("url"),
  path = require("path"),
  app = express(),
  pub_dir = path.join(__dirname, 'client'),
  less_dir = path.join(pub_dir, 'less'),
  css_dir = pub_dir;

var lessMiddleware = require('less-middleware');


app.configure(function() {
  app.use(express.cookieParser('my special salt'));
  app.use(setCookieTimestamp);
  app.use(lessMiddleware({
    src: less_dir,
    dest: css_dir,
    prefix: 'css',
    compress: false,
    debug: false
  }));
  app.use(express.static(pub_dir));
});


app.put('/api/v0/threads/:id', function(req, res) {
  var id = req.params.id;
  res.send({success: true});
});

app.listen(8001);


// reset timestamp only by reading threads list
function setCookieTimestamp (req, res, next) {
  var reqUrl = req.url,
    baseUrl = url.parse(reqUrl).pathname,
    parsed = baseUrl.split('/'),
    api = (parsed[1] == 'api') && (parsed[3] == 'threads.json') && (req.method == 'GET') ;

  if (api) {
    var dt = new Date(),
      ts = dt.getTime(); // in millis

//    console.log('reset last visited cookie', ts);
    res.cookie('lastvisited', ts);
  }
  next();
}
