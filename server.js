const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')


//function that creates the aiPick for RPS 
const compRPS = {
  pick: function() {
    const aiPick = Math.floor(Math.random()*3);
    if (aiPick ==0){
      return "rock";
    } else if (aiPick ==1){
      return "paper";
    } else {
      return "scissor";
    }
  }
};


const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  // else if (page == '/otherpage') {
  //   fs.readFile('otherpage.html', function(err, data) {
  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.write(data);
  //     res.end();
  //   });
  // }
  // else if (page == '/otherotherpage') {
  //   fs.readFile('otherotherpage.html', function(err, data) {
  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.write(data);
  //     res.end();
  //   });
  // }

  // amazon.com/?=rubber+duck   :facepalm: 
  else if (page == '/api') {
    const userPick = params.pick;
    const aiPick = compRPS.pick();
    res.writeHead(200, {'Content-Type': 'application/json'});
    let result;
    if ((userPick === 'rock' && aiPick === 'scissors') || (userPick === 'paper' && aiPick === 'rock') || (userPick === 'scissors' && aiPick === 'paper')) {
      result = 'You Win';
    } else if (userPick === aiPick) {
      result = 'You Tied';
    } else {
      result = 'You Lose';
    }
    const response = {
      userPick: userPick,
      aiPick: aiPick,
      gifs: result
    };
   
    res.end(JSON.stringify(response));
  }
  
    // if('student' in params){
    //   if(params['student']== 'leon'){
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     const objToJson = {
    //       name: "leon",
    //       status: "Boss Man",
    //       currentOccupation: "Baller"
    //     }
    //     res.end(JSON.stringify(objToJson));
    //   }//student = leon
    //   else if(params['student'] != 'leon'){
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     const objToJson = {
    //       name: "unknown",
    //       status: "unknown",
    //       currentOccupation: "unknown"
    //     }
    //     res.end(JSON.stringify(objToJson));
    //   }//student != leon
    // }//student if
  //else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
