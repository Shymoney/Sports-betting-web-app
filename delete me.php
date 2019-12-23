<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script language="javascript" type="text/javascript"></script>
<title>Untitled Document</title>
<style type="text/css">
</style>
</head>

<body>


<script type="text/javascript">
	
	
	
	var canvas= document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var radius = canvas.height /2;
	ctx.translate(radius,radius);
	radius = radius * 0.90;
	drawCock();
	
	function drawClock() {
		
		ctx.arc(0,0,radius,0,2*Math.PI);
		ctx.fillStyle = "white";
		ctx.fill();
		
		}

	function drawClock() {
		
		drawFace(ctx,radius);
		drawNumbers(ctx,radius);
		drawTime(ctx,radius);
		}
		
	"highELE">function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

"highELE">function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/"highVAL">6)+(minute*Math.PI/("highVAL">6*"highVAL">60))+(second*Math.PI/("highVAL">360*"highVAL">60));
    drawHand(ctx, hour, radius*"highVAL">0.5, radius*"highVAL">0.07);
    //minute
    minute=(minute*Math.PI/"highVAL">30)+(second*Math.PI/("highVAL">30*"highVAL">60));
    drawHand(ctx, minute, radius*"highVAL">0.8, radius*"highVAL">0.07);
    // second
    second=(second*Math.PI/"highVAL">30);
    drawHand(ctx, second, radius*"highVAL">0.9, radius*"highVAL">0.02);
}

"highELE">function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "highVAL">"round";
    ctx.moveTo("highVAL">0,"highVAL">0);
    ctx.rotate(pos);
    ctx.lineTo("highVAL">0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
</script>
</body>
</html>