var f
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
  if (is_solved[(contest) + (index)] == 1 || is_solved[(contest) + '_' + (index)])
	 return 1;
  else
    return 0;
}

function choose(l, r) {
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
  if (a.length == 0) {
    f = 0;
    return;
  }
  i = Math.floor(Math.random() * (a.length))
  //	for (var i = 0; i < a.length; i++) {
  	//	document.getElementById('all').innerHTML += '<tr> <td> ' + parseInt(i + 1) +  '</td> <td> <a href = "' + "https://codeforces.com/problemset/problem/" + a[i] + '/' + b[i] + '">' + name[i] + "</a> </tr> </td>"
      con = a[i]
      ind = b[i]
	//}
}

var link
var body
var num = 1
var con
var ind
function add() {
    a = []
    b = []
    c = []
    d = []
    for (var i = 1; i <= num; i++) {
        var plat = document.getElementById('plat' + i).value;
        var contest = document.getElementById('contest' + i).value;
        var index = document.getElementById('index' + i).value;
        var rate = document.getElementById('rate' + i).value;
        a.push(plat)
        b.push(contest)
        c.push(index)
        d.push(rate)
    }
    num++
    document.getElementById('problems').innerHTML += '<br>  <input id="plat' + num + '" type="text" placeholder="cf | ac"> &nbsp;&nbsp;<input id="rate' + num + '" type="text" placeholder="rate : e.g. 1000"> &nbsp;&nbsp;<input id="contest' + num + '" type="text" placeholder="contest:e.g. 1234,abc166"> &nbsp;&nbsp; <input id="index' + num + '" type="text" placeholder="index : e.g. a , b">  &nbsp; '
    for (var i = 1; i < num; i++) {
        document.getElementById('plat' + i).value = a[i - 1];
        document.getElementById('contest' + i).value = b[i - 1];
        document.getElementById('index' + i).value = c[i - 1];
        document.getElementById('rate' + i).value = d[i - 1];
    }
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
    
function submit() {
    link = "../"
    a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    for (var i = 0; i < 20; i++) {
        var x = Math.floor(Math.random() * 36);
        link += a[x]
    }
    createCookie("body", "", -300);
    body = '<head><link rel="stylesheet" type="text/css" href="/style.css"><title>UpSolve</title></head><h3><div class="w3-bar w3-black w3-card" ><br><a href="/" class="w3-bar-item">UpSolve</a>&nbsp;&nbsp;<a href="/cf" class="w3-bar-item">CodeForces</a>&nbsp;&nbsp;<a href="/ac" class="w3-bar-item">AtCoder</a>&nbsp;&nbsp;<a href="/contests/create" class="w3-bar-item">Create New Contest</a>&nbsp;&nbsp;<font id="hi" class="w3-bar-item"></font><font id="username" class="w3-bar-item"><a href="/login">Login</a></font>&nbsp;&nbsp;<font id="logout" class="w3-bar-item"></font><br></div></h3><br>'
    body += " <br> Created by : "
    var handle = window.localStorage.getItem('cf')
    if (handle == undefined || handle == "undefined" || handle == -1 || handle == null || handle == '<a href="/login"> Login </a>') {
        body += "(anonymous)"
    }else {
        body += handle
    }
    body += "<br><table><tr><th>Number</th><th>Problem</th></tr>"
    f = 1;
    a = []
    b = []
    c = []
    d = []
    for (var i = 1; i <= num; i++) {
        body += '<tr id="pro' + i + '"><td>' + i + '</td><td>';
        var plat = document.getElementById('plat' + i).value;
        var contest =  document.getElementById('contest' + i).value;
        var index =  document.getElementById('index' + i).value;
        var rate =  document.getElementById('rate' + i).value;
        if (parseInt(rate)) {
            choose(parseInt(rate), parseInt(rate))
            contest = con
            index = ind
            if (plat == "ac") {
                alert('random for ac is not supported now :(')
                return;
            }
        }
        if (plat == "ac") {
            body += "<a href='" + 'https://atcoder.jp/contests/' + contest + '/tasks/' + contest + '_' + index + "'>" + contest + '_' + index + '</a>'
        } else if (plat == "cf") {
            body += "<a href='" + 'https://codeforces.com/problemset/problem/' + contest + '/' + index + "'>" + contest + index + '</a>'
        } else {
            f = 0;
        }
        a.push(plat)
        b.push(contest)
        c.push(index)
        d.push(rate)
        body += "</td></tr>";
    }
    body += "</table>"
    if (f == 0) {
        alert('something is wrong please with your inputs check again')
        return;
    }
    for (var i = 1; i <= num; i++) {
        body += "<p hidden id='plat" + i + "'>"
        body += a[i - 1]
        body += "</p>"
        body += "<p hidden id='contest" + i + "'>"
        body += b[i - 1]
        body += "</p>"
        body += "<p hidden id='index" + i + "'>"
        body += c[i - 1]
        body += "</p>"
    }
    body += '<script src="/js.js"></script>'
    body += '<script>start()</script>'
  createCookie("body", body, 1);
window.location.replace("create.php?link=" + link);
}