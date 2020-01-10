function get(options) {
    options.type = "get";
    ajax(options);
}

function post(options) {
    options.type = "post";
    ajax(options);
}

function ajax(options) {
    let { type, url, data, success, error, time } = options; //对象的解构语法，定义里面的每个值
    time = time || 1000;
    let xhr = new XMLHttpRequest;
    if (type == "get") {
        url = url + obj2QueryStringFormat(data);//后面要加随机数的
        url = encodeURI(url); //中文转码的处理
        xhr.open("get", url, true);
        xhr.send();
    } else if (type == "post") {
        xhr.open("post", url, true);
        //下面这句代码只能写在特定的这一行
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(obj2QueryString(data));
    }
    //请求超时的弹窗
    let timer = setTimeout(() => {
        //直接调用的取消请求的方法
        xhr.abort();
        alert("请求超时");
    }, time);

    //监听网络请求状态
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            //4-请求已经完成，服务器已经返回响应
            clearTimeout(timer);
            if (xhr.status == 200) {
                success(xhr);
            } else {
                error(xhr);
            }
        }
    }
}

function obj2QueryStringFormat(o) {
    if (o == null) return "?t=" + Math.random();
    return "?" + obj2QueryString(o);
}

function obj2QueryString(o) {
    let arr = [];
    for (const key in o) {
        if (o.hasOwnProperty(key)) {
            const val = o[key];
            arr.push(`${key}=${val}`);
        }
    }
    return arr.join("&");
}