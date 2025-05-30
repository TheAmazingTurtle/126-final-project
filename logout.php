<?php
session_start();
require('DBConnector.php');
session_unset();
session_destroy();
exit();
?>