<?php
include_once("model/connect_db.php");
if ($columns = mysqli_query($conn, "show COLUMNS from words")) {
    $row = mysqli_fetch_all($columns);

    $languages = array();
    for ($i = 1; $i < count($row); $i++)
        $languages[] = $row[$i][0];
}
