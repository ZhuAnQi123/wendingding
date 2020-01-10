<?php
# 获取参数
# 如果是GET请求，那么就通过$_GET对象来获取
# 如果是POST请求，那么就通过$_POST对象来获取参数
# print_r($_GET);

print_r($_FILES);




move_uploaded_file($_FILES["fileName"]["tmp_name"],"./img/123.png");

?>