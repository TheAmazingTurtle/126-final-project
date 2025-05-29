<?php
session_start();
require('DBConnector.php');

if (__FILE__ === realpath($_SERVER['SCRIPT_FILENAME'])) {
    header('HTTP/1.0 403 Forbidden');
    exit('This file cannot be accessed directly.');
}

session_unset();
session_destroy();
http_response_code(200);
exit();
?>