class Manager {
    constructor(data) {
        this.data = data;
        this.root = null;
        this.timmer = null;
        this.num = 0;//这是一个全局的下标
        this._pics = null;
        this._picsWidth = 700;
        this.flag = null;
        this.len = this.data.length;
        this.highlight = null;
    }
    init() {
        this.buidpage();
        this.automove();
        this.btnclickmove();
        this.enterEvent();
        this.highlightControl();
    }
    buidpage() {
        this.root = document.createElement('div');
        this.root.className = 'slider';
        let innerpic = this.data.map((ele, index) => `<li class="slider-box-item"><img src="${ele}"></li>`).join('');
        let banner = `<ul class="slider-box">${innerpic}</ul>`;
        let sidebtn = '<div class="slider-control"><span class="prev">&lt;</span> <span class="next">&gt;</span></div>'
        let spot = '<ol class="slider-nav"><li class="slider-nav-item active">1</li><li class="slider-nav-item">2</li><li class="slider-nav-item">3</li><li class="slider-nav-item">4</li><li class="slider-nav-item">5</li><li class="slider-nav-item">6</li></ol>'
        this.root.innerHTML = banner + sidebtn + spot;
        document.body.appendChild(this.root);
        this._pics = this.root.querySelectorAll('.slider-box-item');
        this.highlight = this.root.querySelector('.slider-nav').children;
        this.flag = this.root.querySelector('.slider-box')
    }

    //封装起next和prev的函数
    next() {
        this.num++;
        if (this.num > this.len) {
            this.num = 0;
        }
        this.flag.style.left = - this.num * this._picsWidth + 'px';


        //小圆点跟着轮播图切换。拿到self.num赋给高亮的下标【这两句也可以封装】
        Array.from(this.highlight).forEach((ele => ele.classList.remove("active")));
        this.highlight[this.num].classList.add("active");
    }
    prev() {
        this.num--;
        if (this.num < 0) {
            this.num = this.len;
        }
        this.flag.style.left = - this.num * this._picsWidth + 'px';


        Array.from(this.highlight).forEach((ele => ele.classList.remove("active")));
        this.highlight[this.num].classList.add("active");
    }

    //开启定时器实现切换
    automove() {
        this.timmer = setInterval(
            () => this.next()

            , 1000)
    }

    //鼠标移入停止定时器,移出又开始
    enterEvent() {
        this.flag.onmouseenter = () => clearInterval(this.timmer);
        this.flag.onmouseleave = () => this.automove();
        // console.log(this.num);
    }


    //点击左右切换
    btnclickmove() {
        let _prev = this.root.querySelector('.prev');
        let _next = this.root.querySelector('.next');
        _prev.onclick = () =>
            this.prev()

        _next.onclick = () =>
            this.next()
    }


    //下面的小圆点功能
    highlightControl() {
        // this.highlight = this.root.querySelector('.slider-nav').children;
        let self = this;

        for (let i = 0; i < this.highlight.length; i++) {

            this.highlight[i].onclick = function () {
                //下面的小圆点点击之后上面跟着切换
                for (let j = 0; j < this.highlight.length; j++) {
                    this.highlight[j].classList.remove('active')
                }
                this.highlight[i].classList.add('active')
                self.num = i;
                // console.log(this.flag);这里的this不是指向对象而是highlight[i]
                self.flag.style.left = - self.num * self._picsWidth + 'px';
            }

        }

    }
}