


    // ฟังชั่นการสร้าง นาฬิกา จากเเล็ป
    
    var canvas = document.querySelector(`#myClock`),
    canvasElement = canvas.getContext(`2d`),
    cX=canvas.width/2,
    cY=canvas.width/2,
    endX,
    endY,
    radius = 150,
    date,
    hours,
    minutes,
    seconds;
    initTime();
    drawClock();
    setInterval(animateClock,1000);
    
    function initTime(){ //ฟังชั่นดึงเวลาปัจจุปันมาใช้
        date = new Date();
        hours = date.getHours() % 12;
        minutes = date.getMinutes();
        seconds = date.getSeconds();
    }
    function animateClock(){ //การเคลื่อนไหวของนาฬิกา
        clearCanvas();
        refreshTime();
        drawClock();
    }

    function clearCanvas(){ //เมื่อมีการวาดเข็มหน้าปัดจะทำการลบเข็มหน้าปัดเดิมทิ้ง
        canvasElement.clearRect(0,0, canvas.width,canvas.height);

    }


    function refreshTime(){ //ทุกๆหนึ่งวิจะ refresh
        seconds += 1;
        if(Math.floor((seconds /60)) !=0){ minutes += 1;seconds %=60;}
        if(Math.floor((minutes /60)) !=0){ hours += 1;minutes %=60;}
    }

    function drawClock(){ //วาดนาฬิกา
        drawClockBackground();
        drawMinutesHand();
        drawHoursHand();
        drawSecHand();
        drawNumbers()
        
    }

    function drawHand(beginX,beginY,endX,endY){ //วาดเข็มนาฬิกา
        canvasElement.beginPath();
        canvasElement.moveTo(beginX,beginY);
        canvasElement.lineTo(endX,endY);
        canvasElement.stroke();
        canvasElement.closePath();
    }

    function drawSecHand(){ //วาดเข็มวินาที
        var rotationUnit = seconds*2 ,
        rotationFactor = Math.PI/60,
            rotation =rotationUnit * rotationFactor,
            handLength=1 * radius;
            endX=cX + handLength * Math.sin(rotation);
            endY= cY- handLength * Math.cos(rotation);
            drawHand(cX,cY,endX,endY);
    }

    function drawMinutesHand(){//วาดเข็มนาที
        var rotationUnit = minutes + seconds / 60,
        rotationFactor = Math.PI/30,
            rotation =rotationUnit * rotationFactor,
            handLength=0.9 * radius;
            endX=cX + handLength * Math.sin(rotation);
            endY= cY- handLength * Math.cos(rotation);
            drawHand(cX,cY,endX,endY);
    }
    

    function drawHoursHand(){ //วาดเข็มชัวโมง
        var rotationUnit= 5* hours + minutes /12,
        rotationFactor = Math.PI /30,
        rotation = rotationUnit * rotationFactor,
        handLength =0.6 * radius;
        endX =cX + handLength *Math.sin(rotation);
        endY =cY - handLength *Math.cos(rotation);
        drawHand(cX,cY,endX,endY);

    }
    function drawClockBackground(){ //วาดเส้นนาฬิกา
        var correction = 1 / 300,
        shiftUnit = 1/170,
        shifFactor = 1/30,
        angleInitialPosition=2,
        angleCurrentPositionBegin=0,
        angleCurrentPositionEnd=0,
        repeat = 60,
        lineWidth = 10;
        for(var i=0;i<repeat;i +=1){
            angleCurrentPositionBegin = angleInitialPosition -(i * shifFactor)-correction;
            angleCurrentPositionEnd = angleCurrentPositionBegin + shiftUnit;
            if(i % 5 == 0)lineWidth=10;
            else lineWidth=10;
            drawArcAtPosition(cX,cY,radius,angleCurrentPositionBegin * Math.PI,angleCurrentPositionEnd * Math.PI,false,lineWidth);


        }

        drawLittleCircle(cX,cY);

    }

     function drawArcAtPosition(cX,cY,redius,startAngle,endAngle,counterClockwise,lineWidth){ //กำหรดตำเเหน่งเส้น
         canvasElement.beginPath();
         canvasElement.arc(cX,cY,redius,startAngle,endAngle,counterClockwise);
         canvasElement.lineWidth=lineWidth;
         canvasElement.lineCap="round";
         canvasElement.strokeStyle = "pink";
         canvasElement.stroke();
         canvasElement.closePath();
         
         

     }

    function drawLittleCircle(cX,cY){ //วงกลมตรงกลาง
        drawArcAtPosition(cX,cY,4,0 * Math.PI,2 * Math.PI,false,4);

    }
    
    function drawNumbers(){ //ตัวเลข
        var ang;
        var Number;
        canvasElement.font = radius*0.25 +"px arial";
        canvasElement.textBaseline = "middle";
        canvasElement.textAlign = "center";
        for(num = 1; num < 13; num++){
            ang = num * Math.PI / 6;
            canvasElement.rotate(ang);
            canvasElement.translate(0, -radius*0.85);
            canvasElement.rotate(-ang);
            canvasElement.fillText(num.toString(), cX,cY);
            canvasElement.rotate(ang);
            canvasElement.translate(0, radius*0.85);
            canvasElement.rotate(-ang);
            
          }
    }

    







