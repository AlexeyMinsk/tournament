<?php
header('Content-Type', 'application/json; charset=utf-8');
$postData = file_get_contents('php://input');
file_put_contents('tournament.html', $postData );