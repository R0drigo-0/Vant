<?php
function get_words()
{
    include_once("../model/connect_db.php");
    $querry_params = str_replace("[", "(", $_POST["id"]);
    $querry_params = str_replace("]", ")", $querry_params);

    $columns = mysqli_query($conn, "SELECT * FROM `words` WHERE id in" . $querry_params);
    $row = mysqli_fetch_all($columns);
    $json_row = json_encode($row);
    return $json_row;
}
