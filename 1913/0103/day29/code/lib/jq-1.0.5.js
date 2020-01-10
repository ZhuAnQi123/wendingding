/* 001-外层是闭包(立即执行函数) */
(function() {
    /* 002-默认开启严格模式 */
    "use strict";

    /* 003-设置当前框架的版本号 */
    let version = "1.0.0";

    /* 004-声明jQuery工厂函数 */
    let jQuery = function(selector) {

        /* 构造函数：jQuery.fn.init */
        /* 返回：jQuery.fn.init构造函数创建出来的实例对象 */
        return new jQuery.fn.init(selector);
    }

    /* 005-设置jQuery的原型对象 */
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function(selector) {

            /* 如果参数为假 */
            if (!selector) {
                return this;
            }
            /* 如果参数是函数 */
            if (typeof selector == "function") {
                document.addEventListener("DOMContentLoaded", selector)
            }
            /* 如果参数是字符串 */
            else if (typeof selector == "string") {
                /* 标签字符串 "<div>测试</div>" "<a>"*/
                if (selector.charAt(0) == "<" && selector.charAt(selector.length - 1) == ">" && selector.length >= 3) {
                    let ele = document.createElement("div");
                    ele.innerHTML = selector;
                    [].push.apply(this, ele.children)
                }
                /* 选择器字符串  "div"  ".box"*/
                else {
                    [].push.apply(this, document.querySelectorAll(selector));
                }
            }
            /* 如果参数是数组或者是伪数组 */
            else if (Array.isArray(selector) || typeof selector == "object" && selector != null && "length" in selector && selector.length - 1 in selector) {
                //把selector中所有的元素依次添加到this中并且更新length
                [].push.apply(this, selector);
            } else {
                this[0] = selector;
                this.length = 1;
            }

        },
        eq(index) {
            return $(this.get(index));
        },
        get(index) {
            return index >= 0 ? this[index] : this[this.length + index];
        },
        first() {
            return this.eq(0);
        },
        last() {
            return this.eq(-1);
        },
        toArray() {
            return [].slice.call(this);
        }
    }

    /* 工具方法的处理 */
    var Tool = {
        isString: function(str) {
            return typeof str == "string";
        },
        isFunction: function(fn) {
            return typeof fn == "function";
        },
        isObject: function(obj) {
            return typeof obj == "object" && obj != null;
        },
        isHTMLSting: function(htmlStr) {
            return htmlStr.charAt(0) == "<" && htmlStr.charAt(htmlStr.length - 1) == ">" && htmlStr.length >= 3
        },
        isArray: function(arr) {
            if (Array.isArray) {
                return Array.isArray(arr);
            } else {
                return Object.prototype.toString.call(arr) == "[object Array]";
            }
        },
        isLikeArray: function(likeArr) {
            return typeof isObject(likeArr) && "length" in likeArr && likeArr.length - 1 in likeArr;
        }
    };
    // window.Tool = Tool;
    // jQuery.Tool = Tool;  $.Tool.xxx();

    // jQuery.isString = Tool.isString;
    // jQuery.isArray  = Tool.isArray;
    // jQuery.isFunction = Tool.isFunction;
    /* 封装 */
    jQuery.extend = function(o) {
        for (let key in o) {
            jQuery[key] = o[key];
        }
    }
    jQuery.extend(Tool);




    /* 006-设置原型对象共享(为了让init的实例对象可以访问jQuery原型成员) */
    jQuery.fn.init.prototype = jQuery.fn;

    /* 007-把jQuery和$暴露出去 */
    window.jQuery = window.$ = jQuery;
})();