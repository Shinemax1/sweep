(function () {
    var contentL = document.getElementsByClassName('content')[0];
    var closeBtn = document.getElementsByClassName('close')[0];
    var alertL = document.getElementsByClassName('lose')[0];
    var grade = document.getElementsByClassName('grade')[0];
    var start = document.getElementsByClassName('start')[0];
    var i = 10;
    var mineMap = [];
    //开始游戏
    start.onclick = function () {
        stratGame();
    }
    //取消右键
    contentL.oncontextmenu = function () {
        return false;
    }
    //监听事件
    contentL.onmousedown = function (e) {
        var event = e || window.event;
        if (event.which == 1) {
            leftClick(event.target);
        } else if (event.which == 3) {
            rightClick(event.target);
        }
    }
    //关闭弹出框
    closeBtn.onclick = function () {
        alertL.style.display = 'none';
        grade.style.display = 'none';
        contentL.style.display = 'none';
        start.style.display = 'block';
        contentL.innerHTML = '';
        i = 10;
    }

    function stratGame() {
        grade.style.display = 'block';
        contentL.style.display = 'block';
        start.style.display = 'none';
        initContent();
    }

    function initContent() {
        var mineNum = 10;
        var mineOver = 10;
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                var box = document.createElement('div');
                box.classList.add('block');
                box.setAttribute('id', i + '-' + j);
                contentL.appendChild(box);
                mineMap.push({
                    mine: 0
                });
            }
        }
        var block = document.getElementsByClassName('block');
        while (mineNum) {
            var mineIndex = Math.floor(Math.random() * 100);
            if (mineMap[mineIndex].mine === 0) {
                block[mineIndex].classList.add('lei');
                mineMap[mineIndex].mine = 1;
                mineNum--;
            }
        }

    }

    function leftClick(dom) {
        var lei = document.getElementsByClassName('lei');
        if(dom.classList.contains('islei')){
            return;
        }
        if (dom && dom.classList.contains('lei')) {
            for (var i = 0; i < lei.length; i++) {
                lei[i].classList.add('show');
            }
            setTimeout(function () {
                alertL.style.display = 'block';
                alertL.getElementsByTagName('p')[0].innerHTML = '再接再厉！';
            }, 800);
        } else {
            var n = 0;
            var posArr = dom && dom.getAttribute('id').split('-');
            var posX = posArr && +posArr[0];
            var posY = posArr && +posArr[1];
            dom.classList.add('num');
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var aroundbox = document.getElementById(i + '-' + j);
                    if (aroundbox && aroundbox.classList.contains('lei')) {
                        n++;
                    }
                }
            }
            dom && (n === 0 ? 1 : (dom.innerHTML = n));
            if (n == 0) {
                for (var i = posX - 1; i <= posX + 1; i++) {
                    for (var j = posY - 1; j <= posY + 1; j++) {
                        var nearBox = document.getElementById(i + '-' + j);
                        if (nearBox && nearBox.length != 0) {
                            if (!nearBox.classList.contains('check')) {
                                nearBox.classList.add('check');
                                leftClick(nearBox);
                            }
                        }
                    }
                }
            }
        }
        var num = document.getElementsByClassName('num');
        var box = document.getElementsByClassName('block');
        if(num.length+lei.length === box.length){
            alertL.style.display = 'block';
                    alertL.getElementsByTagName('p')[0].innerHTML = '真棒！';
        }
    }

    function rightClick(dom) {
        var gradeNum = grade.getElementsByTagName('span')[0];
        if (dom.classList.contains('islei')) {
            dom.classList.remove('islei');
            if (dom.classList.contains('lei') || dom.parentNode.classList.contains('lei')) {
                i++;
                gradeNum.innerHTML = i + '个';
            }
            if (dom.getElementsByClassName('circle')[0]) {
                dom.removeChild(dom.getElementsByClassName('circle')[0]);
            } else {
                dom.parentNode.classList.remove('islei');
                dom.parentNode.removeChild(dom);
            }            
        } else if (!dom.classList.contains('num') && !dom.classList.contains('islei') && dom.classList.contains('block')) {
            if (dom.classList.contains('lei')) {
                i--;
                if (i == 0) {
                    alertL.style.display = 'block';
                    alertL.getElementsByTagName('p')[0].innerHTML = '真棒！';
                } else {
                    gradeNum.innerHTML = i + '个';
                }
            }
            dom.classList.add('islei');
            var circle = document.createElement('div');
            circle.classList.add('circle');
            circle.classList.add('islei');
            dom.appendChild(circle);
        }
    }

})()