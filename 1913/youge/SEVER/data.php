<?php

 $slideData=file_get_contents("./slide.json");
 $leftData=file_get_contents("./left.json");
 $detailData=file_get_contents("./details.json");

echo "[$slideData,$leftData,$detailData]";
?>
