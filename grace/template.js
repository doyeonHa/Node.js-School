const http = require('http');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// index.ejs에 넘겨줄 data
const index = {
  name: 'HDY',
  here: '미림'
};

// food.ejs에 넘겨줄 data
// const food = "음식";
// const drink = "요거트 스무디";
// const like = "좋아";

const food = ["케이크", "요거트 스무디", "도넛"];

const server = http.createServer(function(req, res) {
  console.log(req.url);
  // 초기값 설정
  res.setHeader('Content-Type', 'text/html');
  if (req.url === '/') {
    // renderFile(ejs 대상경로, ejs에 넘겨줄 데이터, 이후에 실행할 callback)
    ejs.renderFile(path.join(__dirname, 'template', 'index.ejs'),
    {name: index.name, here: index.here})
    .then((data) => res.end(data)); // 데이터를 넘겨받은 ejs코드(data)를 클라이언트에게 보낸다.
  } else if(req.url === '/food') {
    ejs.renderFile(path.join(__dirname, 'template', 'food.ejs'),
    {food}) // {food : food}
    .then((data) => res.end(data));
  } else {
    fs.createReadStream(path.join(__dirname, 'html', '404.html')).pipe(res);
  }
});

server.listen(3333);
