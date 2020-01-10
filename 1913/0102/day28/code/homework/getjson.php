<?php

# 01-加载JSON文件中的数据
$json = file_get_contents("./data.json");




// # 02-把JSON数据原样返回
echo $json;
?>