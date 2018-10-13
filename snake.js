var Snake = new function() {

    var defaultDirection="right";
    var newDirection=defaultDirection;
    var timerId = setInterval(function(){
        strStyle=makeStep(defaultDirection);
        snake.style.cssText=strStyle;
    }, 1000);
    var x=200, y=200;
    var strStyle="position: absolute;\
        width: 5px;\
        height: 5px;\
        background: #000000;\
        padding: 0px;\
        left: 200px;\
        top: 200px;";
    function OnClickMy (e) {
        var elem = e.target.closest('.direction');
        moving(defaultDirection);
        if ( e.which === 1) {
            let elemName=elem.innerText;

            if(elemName ==="plus"||elemName ==="minus") {
                speedy(elem);
                moving(newDirection, true);
            }
           if(isDirection(elemName)){
               defaultDirection=newDirection;
                newDirection=elemName;
                moving(newDirection);
            }

        }


    }
    function OnKeyUpMy (e) {


        if(e.which===38){
            defaultDirection=newDirection;
            newDirection="up";
            moving(newDirection);
        }
        if(e.which===39){
            defaultDirection=newDirection;
            newDirection="right";
            moving(newDirection);
        }
        if(e.which===40){
            defaultDirection=newDirection;
            newDirection="down";
            moving(newDirection);
        }
        if(e.which===37){
            defaultDirection=newDirection;
            newDirection="left";
            moving(newDirection);
        }


    }
    function isDirection(elemName){
        switch (elemName){
            case "right": return true;
            case "left": return true;
            case "up":return true;
            case "down":return true;
        }

        return false;
    }
    function newStyle(oldStyle,  valueOfLeft, valueTop) {

          oldStyle=newValue(oldStyle, valueOfLeft, "left" );
          oldStyle=newValue(oldStyle, valueTop, "top");

          return oldStyle;

    }
    function newValue(oldStr, newStr, direction){

        let startIndex=oldStr.indexOf(direction)+direction.length;
        let finalIndex=oldStr.indexOf(";",startIndex)-2;
        return oldStr.substring(0, startIndex+2)+newStr+oldStr.substring(finalIndex);
    }
    function makeStep(direction){
        switch (direction){
            case "up":
                y-=5;
                if(!y)
                {
                    alert( "граница");
                    return;
                }

                break;
            case  "down":
                y+=5;
                if(y>=400) {
                    alert( "граница");
                    return;
                }
                break;
            case "left" :
                x-=5;
                if(!x)
                {
                    alert( "граница");
                    return;
                }
                break;
            case "right":
                x+=5;
                if(x>=400)
                {
                    alert( "граница");
                    x=200;
                    y=200;
                    return;
                }
                break;
        }
        return newStyle(strStyle, x, y);
    }

    function moving(direction, timeFlag){
        let snake=document.getElementById('snake');
        let res=document.getElementById('result');
        if(newDirection!==defaultDirection||timeFlag) {
            setTimeout(function () {
                clearInterval(timerId);
                timerId = setInterval(function () {
                    strStyle = makeStep(direction);
                    snake.style.cssText = strStyle;
                }, 1000-(+res.innerText-1)*100);
            }, 0);

        }

    }

    function speedy(elem){

         let res = document.getElementById('result');
         let elemName = elem.innerText;
         let resValue = +res.innerText;
         if(elemName==="plus"&&resValue<10) {
             res.innerText = resValue + 1;
         }
         if (elemName==="minus"&&res.innerText > 1) {
                 res.innerText = resValue-1;

         }

    }
    document.onclick = OnClickMy;
    document.onkeyup = OnKeyUpMy;


};