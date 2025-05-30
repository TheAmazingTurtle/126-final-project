<?php
session_start();
require('DBConnector.php');
session_unset();
session_destroy();
http_response_code(200);
exit();
?>