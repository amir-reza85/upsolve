var cf_cachehandle = window.localStorage.getItem('cf');
var ac_cachehandle = window.localStorage.getItem('ac');
if (ac_cachehandle != '' && ac_cachehandle != undefined && ac_cachehandle != null && ac_cachehandle != -1 && ac_cachehandle != "undefined") {
    document.getElementById('username').innerHTML = ac_cachehandle
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
var x
var is_solved = {}
var handle
function start() {
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
      //var res = x["result"]["problems"]
    //for (var i = 0; i < res.length; i++) {
  //  is_solved[(res[i]["contestId"]) + (res[i]["index"])] = 0
  //}
   handle = document.getElementById('username').innerHTML
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



rjson("https://kenkoooo.com/atcoder/resources/merged-problems.json", function(text){
    var y = JSON.parse(text);
    x = y
  //  console.log(x)
});
}
var sub


var dd = [];
var ff = [];

function solved(handle, contest, index) {
  //console.log(contest + index, is_solved[(contest) + (index)])
  if (is_solved[(contest)] == 1)
	 return 1;
  else
    return 0;
}


function choose(l, r) {
    document.getElementById('all').innerHTML = "<tr> <th> Number </th> <th> Problem </th> </tr>"
	//console.log(x);
//	console.log(x)
  var a = []
  var b = []
  var name = []
  var res = x
  for (var i = 0; i < res.length; i++) {
    if (parseInt(res[i]["point"]) >= l && parseInt(res[i]["point"]) <= r && solved(handle,(res[i]["id"]), "") == 0) {
      //console.log(res[i]["contestId"], res[i]["index"])
      a.push(res[i]["contest_id"])
      b.push(res[i]["id"])
      name.push(res[i]["title"])
    }
  }
  for (var i = 0; i < a.length; i++) {
  		document.getElementById('all').innerHTML += '<tr> <td> ' + parseInt(i + 1) +  '</td> <td> <a href = "' + "https://atcoder.jp/contests/" + a[i] + '/tasks/' + b[i] + '">' + name[i] + "</a> </tr> </td>"
	}
}
