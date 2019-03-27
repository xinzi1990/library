;(function(){
    // 这是一个私有属性，不需要被实例访问
    var transform = getTransform();

    class Drag{
        constructor(selector){
            // 放在构造函数中的属性，都是属于每一个实例单独拥有
            this.elem = typeof selector == 'Object' ? selector : document.getElementById(selector);
            this.startX = 0;
            this.startY = 0;
            this.sourceX = 0;
            this.sourceY = 0;

            this.init();
        }
        init(){
            // 初始时需要做些什么事情
            this.setDrag();
        }

        getStyle(property) {
            return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(this.elem, false)[property] : this.elem.currentStyle[property];
        }

        getTargetPos() {
            var pos = {x: 0, y: 0};
            if(transform) {
                var transformValue = this.getStyle(transform);
                if(transformValue == 'none') {
                    this.elem.style[transform] = 'translate(0, 0)';
                } else {
                    var temp = transformValue.match(/-?\d+/g);
                    pos = {
                        x: parseInt(temp[4].trim()),
                        y: parseInt(temp[5].trim())
                    }
                }
            } else {
                if(this.getStyle('position') == 'static') {
                    this.elem.style.position = 'relative';
                } else {
                    pos = {
                        x: parseInt(this.getStyle('left') ? this.getStyle('left') : 0),
                        y: parseInt(this.getStyle('top') ? this.getStyle('top') : 0)
                    }
                }
            }

            return pos;
        }
        setTargetPos(pos){
            var self = this;
            var browerWidth = document.documentElement.clientWidth || document.body.clientWidth;
            var browerHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var maxWidth = browerWidth - parseInt(self.getStyle('width'));
            var maxHeight = browerHeight - parseInt(self.getStyle('height'));
            var transform = getTransform();

            if(pos.x < 0){
                pos.x = 0;
            }
            if(pos.x >= maxWidth){
                pos.x = maxWidth;
            }
            if(pos.y < 0){
                pos.y = 0;
            }
            if(pos.y >= maxHeight){
                pos.y = maxHeight
            }

            if(transform){
                this.elem.style[transform] = 'translate('+ pos.x +'px, '+ pos.y +'px)';
            }else{
                this.elem.style.left = pos.x + 'px';
                this.elem.style.top = pos.y + 'px';
            }
        }
        setDrag(){
            var self = this;
            this.elem.addEventListener('mousedown', start, false);
            function start(event) {
                self.startX = event.pageX;
                self.startY = event.pageY;

                var pos = self.getTargetPos();

                self.sourceX = pos.x;
                self.sourceY = pos.y;

                document.addEventListener('mousemove', move, false);
                document.addEventListener('mouseup', end, false);
            }

            function move(event) {
                var currentX = event.pageX;
                var currentY = event.pageY;

                var distanceX = currentX - self.startX;
                var distanceY = currentY - self.startY;

                self.setTargetPos({
                    x: self.sourceX + distanceX,
                    y: self.sourceY + distanceY
                })
            }

            function end(event) {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', end);
                // do other things
            }
        }
    }

    window.Drag = Drag;

    // 获取当前浏览器支持的transform兼容写法
    function getTransform() {
        var transform = '',
            divStyle = document.createElement('div').style,
            // 可能涉及到的几种兼容性写法，通过循环找出浏览器识别的那一个
            transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],

            i = 0,
            len = transformArr.length;

        for (; i < len; i++) {
            if (transformArr[i] in divStyle) {
                // 找到之后立即返回，结束函数
                return transform = transformArr[i];
            }
        }

        // 如果没有找到，就直接返回空字符串
        return transform;
    }
}())
