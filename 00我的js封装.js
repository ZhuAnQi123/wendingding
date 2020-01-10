// --------------随机生成#号后3位或6位字母数字随机组成的随机颜色；-----------------------------------------------
// 例如#f32 或者 #ab23df
function getcolor() {
    // var n = arguments[0];
    var arr = [3, 6];
    var indexr = parseInt(Math.random() * 2);
    var n = arr[indexr];

    var str = '123456789abcdef';
    var color = '#';
    for (var i = 0; i < n; i++) {
        var index = parseInt(Math.random() * str.length);
        color += str[index];
    }
    return color;
}
// -----------------------------------------------------------------------------------------------------------

// -面试题----记住要优化！减循环次数--冒泡排序升序排序，随便输入几个参数如mp(2,4,1,5,1)自动排序以数组方式输出----
function mp(arr) {
    // var arr = [];
    // for (var i = 0; i < arguments.length; i++) {
    //     arr.push(arguments[i]);
    // }
    for (var i = 0; i < arr.length - 1; i++) { //外循环-1是因为执行完倒数第一次时第一个不需要再和第二比较了 之前已经比较过了，比如2和4比较过已经是升序数组了 2不需要在和谁比较了
        for (var j = 0; j < arr.length - 1 - i; j++) {//-1是应为控制j的下标，最后一个已经和前一个比了，-i是应为每执行一次循环最后一个数字最大，无需比较，每循环比较完一轮。循环次数减1即减i
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
// ---------------------------------------------------------------------------------------------------------

// ------------------------得到一个[min - max]的随机整数------------------------------------------------------
function rannum(min, max) {
    //得到一个min到max之间的随机数：极限的时候,Math.random()为零的时候，最小的时候;Math.random()是1的时候是最大的时候
    return parseInt(Math.random() * (max - min + 1)) + min;
}
// ---------------------------------------------------------------------------------------------------------

// ------数组去重----这个方法会改变原数组----------------------------------------------------------------------------------------
function qc1(arr) {//改变原数组---注意！！
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1)
                j--;//splice删除数组某个数后 原来数组会改变 下标减一才能不会改变数组继续遍历，splice有 1删除 2插入 3替换 功能！
            }
        }
    }

    return arr;
}
//数组去重 ----不会改变原数组-----------------------------------------------------------------------------------
function qc2(arr) {//不改变原数组 放在新的数组输出！！注意-
    var temp = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (temp.indexOf(arr[i]) == -1) {
            temp.push(arr[i]);
        }
    }
    return temp;
}
// ----------------------------------------------------------------------------------------------------------
// 统计字符串中某字符出现字数----------------------------------------------------------------------------------
function strzs(str, num) {
    var n = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] == num) {
            n++;
        }
    }
    return n;
}
// -----------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------
// 时间单位数添0 如 7时转为 07时---------------------------------------------------------------------------------
function tian0(num) {
    if (num <= 9) {
        return '0' + num;
    } else {

        return '' + num;
    }
}
// ----------------------------------------------------------------------------------------------------------
// --返回一个当前可用格式时间字符串如2019-12-06 10:45:01------------------------------------------------------------------------------------------------------------
function returntime() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hours = time.getHours();
    var min = time.getMinutes();
    var sces = time.getSeconds();
    return timer = `${year}-${tian0(month)}-${tian0(day)} ${tian0(hours)}:${tian0(min)}:${tian0(sces)}`;
}
// -----------------------返回一个时间数组[年，月，日，时，分，秒，星期，星期数字]--------------------
function timearr() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hours = time.getHours();
    var min = time.getMinutes();
    var sces = time.getSeconds();
    var weekarr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var week = time.getDay();
    return [year, tian0(month), tian0(day), tian0(hours), tian0(min), tian0(sces), weekarr[week], week];
}

// ---------------------------------------------------------------------------------------------------------------
// ---距离当前时间差-------返回天时分秒---传入时间参数
function timecha(endtime) {
    var startime = Date.now();
    var endtime = new Date(endtime).getTime();
    var msscha = endtime - startime;
    let time = msscha / 1000;
    let day = Math.floor(time / 60 / 60 / 24);
    let hour = Math.floor(time / 60 / 60) % 24;
    let minute = Math.floor(time / 60) % 60;
    let second = Math.floor(time) % 60;
    return `${day}天${hour}时${minute}分${second}秒`
}
// -----------------------------------------------------------------------------------------
// -----url对象转化成字符串一般用于页面跳转！列表页跳详情页---------------------------------------------
function objtostr(obj) {
    //var o = {name:"zs",age:10};
    //name=zs&age=10;
    var arr = [];
    for (var key in obj) {
        arr.push(`${key}=${obj[key]}`);
    }
    return arr.join("&")
}
// ------------------------------------------------------------------------------------------------
// ------------url字符串转化成对象---用于页面跳转------------详情页
function strtoobj(str) {
    /* name=zs&age=19&address=广州 */
    var obj = {};
    var arr1 = str.split("&"); /* ["name=zs","age=19"] */
    for (var i = 0, len = arr1.length; i < len; i++) {
        var arr2 = arr1[i].split("="); //["name","zs"]
        obj[arr2[0]] = arr2[1];
    }
    return obj;
}
// ----------------------------------------------------------------------------------------------
/* ---------------------------封装获取标签样式的方法(兼容性) --currentStyle是对象不是方法------------------------------*/
function getstyle(ele, key) {
    if (window.getComputedStyle) {//注意点：getComputedStyle该方法存在兼容性问题，在IE老版本的浏览器中不能使用这个方法，ele.currentStyle属性 */
        return window.getComputedStyle(ele)[key];
    } else {
        return ele.currentStyle[key];
    }
}
// --------------------------------------------------------------------
// ------事件添加和执行参数：节点 事件类型 没有参数和括号的函数名--方法优点：事件可以同时进行不会覆盖--------
// 不封装的写法oBtn.addEventListener("click", function () {
// console.log("---click1---");/* 语法：节点.addEventListener(type,handler) */
// })-----------------------------------------
function addeven(ele, type, handler) {
    if (ele.addEventListener) {
        ele.addEventListener(type, handler);
    } else if (ele.attachEvent) {
        /* 检查是否使IE浏览器 */
        ele.attachEvent("on" + type, handler);
    } else {
        ele["on" + type] = handler;
    }
}
// --------------------------------------------------------------------------------
// ------Cookie操作封装----还有获得所有key 清空所有功能---------------------------------------------------------------
let cookie = (function () {

    function get(key) {
        //"age=19; name=zs" ==> {name:"zs",age:19} 
        let str = document.cookie;
        let o = {};
        let arr = str.split("; "); //["name=zs","age=19","username=rick"];
        arr.forEach(ele => {
            let data = ele.split("="); //["name","zs"];
            let key = data[0];
            let val = data[1];
            o[key] = val; //o.name = "zs" | o.age = 19;
        });
        return o[key];
    }

    function set(key, val, day) {
        if (!day) {
            /* 默认有效期 */
            document.cookie = `${key}=${val}`
        } else {
            /* 设置有效期 */
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = `${key}=${val};expires=` + date;
        }
    }

    function getallkey() {
        let str = document.cookie;
        let arr = str.split("; ");
        let keys = [];
        arr.forEach(ele => {
            let data = ele.split("="); //["name","zs"];
            let key = data[0];
            keys.push(key);
        });
        return keys;
    }

    function remove(key) {
        set(key, null, -1);
    }

    function clear() {
        let keys = getallkey(); // ["username", "phone"]
        keys.forEach(ele => remove(ele));
    }

    return { get, set, getallkey, remove, clear };
})()
// -----------------------------------------------------------------------------------------------------------------