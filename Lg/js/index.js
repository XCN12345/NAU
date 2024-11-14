window.addEventListener('load', function() {
    // 1.获取元素
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2.鼠标经过显示，鼠标离开隐藏 左右小箭头
    focus.addEventListener('mouseenter', function() {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    })
    focus.addEventListener('mouseleave', function() {
            arrowl.style.display = 'none';
            arrowr.style.display = 'none';
            timer = setInterval(function() {
                //手动调用事件
                arrowr.click();
            }, 1500);
        })
        // 3.动态生成小圆圈  有几张图片，生成几个
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('index', i);
        //把li插入ol里面
        ol.appendChild(li);
        // 4.小圆圈的排他思想   直接绑定事件
        li.addEventListener('click', function() {
            //干掉所有人  清除所有的li 的current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //剩下我自己  当前的小li 设置current类名
            this.className = 'current';
            //5. 点击小圆圈 移动图片 移动的是整体的盒子  ul
            // ul 的移动距离 小圆圈的索引号 乘以 图片宽度。注意为负值
            // 当我们点击了某个li 就拿到当前li的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个li 就要把这个li的索引号给num
            num = index;
            // 当我们点击了某个li 就要把这个li的索引号给circle
            circle = index;
            // console.log(focusWidth);
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个li设置类名为 current
    ol.children[0].className = 'current';
    // 6.克隆第一张图片 放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7.点击图片右侧按钮，图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrowr.addEventListener('click', function() {
            if (flag) {
                flag = false; //关闭节流阀
                // 如果走到了最后复制的一张图片 此时我们的 ul要快速的复原 left改为0
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                // 8.点击右侧按钮 小圆圈跟着一起变化 可以在声明一个变量控制小圆圈的播放
                circle++;
                // 如果circle==ol.children.length 说明走到最后我们克隆的这张图片了 我们就复原
                if (circle == ol.children.length) {
                    circle = 0;
                }
                circleChange();
            }
        })
        // 9.左侧按钮
    arrowl.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 如果走到了最后复制的一张图片 此时我们的 ul要快速的复原 left改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 8.点击左侧按钮 小圆圈跟着一起变化 可以在声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle<0 说明第一张图片，则小圆圈要改为第4个【3】
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            //circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });

    function circleChange() {
        //先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 10.自动播放轮播图
    var timer = setInterval(function() {
        //手动调用事件
        arrowr.click();
    }, 1500);
});

