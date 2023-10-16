<!DOCTYPE html>

<script src="view/js/lang.js"></script>
<script src="view/js/cookie.js"></script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vant</title>
    <link rel="stylesheet" href="view/css/main.css">
</head>

<body>
    <script src="view/js/theme.js"></script>
    <div class="all" id="all">
        <div class=" top" id="top">
            <div class="optionsGame" id="optionsGame">
                <nav class="statisticsBox" id="statisticsBox">
                    <img src="view/assets/leaderboard_FILL1_wght400_GRAD0_opsz40.svg" alt="statistics" class="statistics" id="statistics">
                </nav>
                <nav class="optionBox" id="optionBox">
                    <img src="view/assets/settings_FILL1_wght400_GRAD0_opsz40.svg" alt="settings" class="settings" id="settings">
                </nav>
            </div>
            <div class="titleBox">
                <h1 class="unselectable title" id="title">Vant</h1>
            </div>
            <div class="roundBox" id="roundBox" style="display:none">
                <h3 class="unselectable round" id="round">0</h3>
            </div>
        </div>
        <div id="main" class="main">
            <ul class="select" id="select">

                <?php
                //Creo que es mejor ponerlo manualmente, de esa manera saldria mas barato el hosting. Ya que la cantidad de idiomas no es una cosa que cambie frecuentemente y entonces si se tiene que cambiar se puede hacer manualmente.
                require("controller/get_langagues.php");
                for ($i = 0; $i < count($languages); $i++) {
                    echo ("<li class='unselectable " . $i . "'id='language'>");
                    echo ($languages[$i]);
                    echo ("</li>");
                }
                ?>
            </ul>
        </div>
    </div>

</body>
<script src="view/js/time.js"></script>
<script src="view/js/words.js"></script>
<script src="view/js/random.js"></script>
<script src="view/js/render.js"></script>
<script src="view/js/remove.js"></script>
<script src="view/js/sanitize.js"></script>
<script src="view/js/main.js"></script>

</html>