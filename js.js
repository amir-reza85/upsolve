var cf_cachehandle = window.localStorage.getItem('cf');
var ac_cachehandle = window.localStorage.getItem('ac');
var name
if (cf_cachehandle != '' && cf_cachehandle != undefined && cf_cachehandle != null && cf_cachehandle != -1 && cf_cachehandle != "undefined") {
    document.getElementById('username').innerHTML = cf_cachehandle
    name = cf_cachehandle;
    document.getElementById('hi').innerHTML = "Hi "
    document.getElementById('logout').innerHTML = "<a href='/logout'> Logout </a>"
}else {
    name = "(anonymous)"
}
function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  else {
    expires = "";
  }
  document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}
   

function send() {
    var body = ""
    body += "<hr>"
    body += "<h4>" + name + "</h4>";
    body += "<hr>"
    body += document.getElementById('com').value
    body += "<hr>"
    createCookie("body", body, "100000");
    window.location.replace("create.php");
}

function nothing() {
    return;
}

function comment() {
    document.getElementById('new').href = "javascript:nothing()"
    window.scrollTo(0,document.body.scrollHeight);
    document.getElementById('discuss').innerHTML += "<pre>     </pre>"
    document.getElementById('discuss').innerHTML += name;
    document.getElementById('discuss').innerHTML += "<br>"
    document.getElementById('discuss').innerHTML += "<textarea id='com'></textarea><br>"
    document.getElementById('discuss').innerHTML += "<button onclick='send()'>Post</button>"
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
function rjson(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
var handle
var x

var is_solved = {}
var dd = [];
var ff = [];

function solved(handle, contest, index) {
    contest = String(contest)
    index = String(index)
  //console.log(contest + index, is_solved[(contest) + (index)])
  if (is_solved[(contest) + (index)] == 1 || is_solved[(contest) + '_' + (index)] || is_solved[(contest.toUpperCase()) + '_' + (index.toUpperCase())] || is_solved[(contest.toLowerCase()) + '_' + (index.toLowerCase())] || is_solved[(contest) + (index.toLowerCase())] || is_solved[(contest) + (index.toUpperCase())])
	 return 1;
  else
    return 0;
}

function gr () {
for (var i = 1; i < 10000000; i++) {
    if(document.getElementById('plat' + i) == undefined)
        break;
    var plat = document.getElementById('plat' + i).innerHTML
    if (plat != "ac" && plat != "cf")
        break;
    var contest = document.getElementById('contest' + i).innerHTML
    var index = document.getElementById('index' + i).innerHTML
    if (solved("-1", contest, index))  {
        document.getElementById('pro' + i).style = "background-color: green;"
    }
}
}


function start() {
           handle = ac_cachehandle
    rjson("https://kenkoooo.com/atcoder/atcoder-api/results?user=" + handle, function(text){
      d = []
      f = []
      var hh = JSON.parse(text);  
      for (var i = 0; i < hh.length; i++) {
        if (hh[i]["result"] == "AC") {
          is_solved[(hh[i]["problem_id"])] = 1
          //console.log(contest + index, is_solved[(contest) + (index)])
          //console.log (is_solved[parseInt(hh["result"][i]["problem"]["contestId"])][(hh["result"][i]["problem"]["index"])])
      }
      dd = d
      ff = f
      }
  });

    handle = document.getElementById('username').innerHTML
    rjson("https://codeforces.com/api/problemset.problems", function(text){
    var y = JSON.parse(text);
    x = y
});
    rjson("https://codeforces.com/api/user.status?handle=" + handle, function(text){
      d = []
      f = []
      var hh = JSON.parse(text);  
      for (var i = 0; i < hh["result"].length; i++) {
        if (hh["result"][i]["verdict"] == "OK") {
          is_solved[(hh["result"][i]["problem"]["contestId"]) + (hh["result"][i]["problem"]["index"])] = 1
          var contest = (hh["result"][i]["problem"]["contestId"])
          var index = (hh["result"][i]["problem"]["index"])
          //console.log(contest + index, is_solved[(contest) + (index)])
          //console.log (is_solved[parseInt(hh["result"][i]["problem"]["contestId"])][(hh["result"][i]["problem"]["index"])])
      }
      dd = d
      ff = f
      }
      gr()
  });
}

function choose(l, r) {
    document.getElementById('all').innerHTML = "<tr> <th> Number </th> <th> Problem </th> </tr>"
  var a = []
  var b = []
  var name = []
  var res = x["result"]["problems"]
  for (var i = 0; i < res.length; i++) {
    if (parseInt(res[i]["rating"]) >= l && parseInt(res[i]["rating"]) <= r && solved(handle,parseInt(res[i]["contestId"]), res[i]["index"]) == 0) {
      //console.log(res[i]["contestId"], res[i]["index"])
      a.push(res[i]["contestId"])
      b.push(res[i]["index"])
      name.push(res[i]["name"])
    }
  }
  //i = Math.floor(Math.random() * (a.length))
  	for (var i = 0; i < a.length; i++) {
  		document.getElementById('all').innerHTML += '<tr> <td> ' + parseInt(i + 1) +  '</td> <td> <a href = "' + "https://codeforces.com/problemset/problem/" + a[i] + '/' + b[i] + '">' + name[i] + "</a> </tr> </td>"
	}
}
