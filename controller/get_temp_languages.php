<?php
include_once("../model/select_words.php");
if (isset($_POST["language"])) {
    echo (get_words());
} else {
    throw new ErrorException("Not valid language");
}
