<?php
header('Content-Type: text/html');
include 'DBConnector.php';

if (__FILE__ === realpath($_SERVER['SCRIPT_FILENAME'])) {
    header('HTTP/1.0 403 Forbidden');
    exit('This file cannot be accessed directly.');
}


$CB_high_scores_query = "SELECT user_name, rating_CB, CB_highest_score 
                        FROM user 
                        WHERE CB_highest_score > 0
                        ORDER BY CB_highest_score DESC;";

$CB_high_scores_result = $conn->query($CB_high_scores_query);
$CB_rank = 1;

if ($CB_high_scores_result->num_rows > 0) {
    // output data of each row
    while($row = $CB_high_scores_result->fetch_assoc()) {
        echo "<tr>".
            "<td align='center'>".$CB_rank++."</td>".
            "<td align='center'>".htmlspecialchars($row["user_name"])."</td>".
            "<td align='center'>".$row["rating_CB"]."</td>".
            "<td align='center'>".$row["CB_highest_score"]."</td>".
            "</tr>";
    }
   
} else {
    echo "<tr>".
            "<td align='center'>-----</td>".
            "<td align='center'>-----</td>".
            "<td align='center'>-----</td>".
            "<td align='center'>-----</td>".
            "</tr>";
}

$conn->close();
?>
 