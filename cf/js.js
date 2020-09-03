var cf_cachehandle = window.localStorage.getItem('cf');
var ac_cachehandle = window.localStorage.getItem('ac');
if (cf_cachehandle != '' && cf_cachehandle != undefined && cf_cachehandle != null && cf_cachehandle != -1 && cf_cachehandle != "undefined") {
    document.getElementById('username').innerHTML = cf_cachehandle
    document.getElementById('hi').innerHTML = "Hi "
    document.getElementById('logout').innerHTML = "<a href='/logout'> Logout </a>"
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

function start() {
        
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
  });
}

function solved(handle, contest, index) {
  //console.log(contest + index, is_solved[(contest) + (index)])
  if (is_solved[(contest) + (index)] == 1)
	 return 1;
  else
    return 0;
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
