// JavaScript Document
$(function() {
	//difine var
    var offset = 5;
    var startX;
    var startY;
    var brushSize = 1;
    var alphaSize = 1;
    var brushColor = '#123456'; 
    var flag = false;
	
	//get canvas context
    var canvas = $('canvas').get(0);
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
		    
			context.fillStyle = 'rgb(255,255,255)';
            context.fillRect(0, 0, 900, 600);
    }
	
　　//var canvasback = new RGBColor($(this).css({'background-color':'#FFFFFF','background-image':'none'}));
    //canvas.setColor(canvasback.toHex());
	//context.setCanvasColor("#8F2800"); 
	
	var picker = $.farbtastic('#picker');
	picker.linkTo($("#color"));
	
	$("#slider").slider({
        min: 2,
        max: 100, // Brush max size
        value : 1,  // default Brush size
        slide : function(evt, ui){
            brushSize = ui.value; // Brush size setting
        }
    });
	
	//Collor setting
 /*  $('li').addClass('ofclic');
   $('li').click(function() {

       clic_color = new RGBColor($(this).css('background-color')); 
       picker.setColor(clic_color.toHex());
       $('li').removeClass('clic');
       $(this).addClass('clic'); 
	});*/
	
		$('canvas').click(function(e) {
			var getspuit = $('#spuit').is(':checked');
			if(getspuit == true){
			spuitImage = context.getImageData(startX, startY, 1, 1);
			r = spuitImage.data[0];
			g = spuitImage.data[1];
			b = spuitImage.data[2];
			spuit_color = new RGBColor('rgb(' + r +','+ g + ',' + b +')');
			picker.setColor(spuit_color.toHex());
			}
		});
		
		$('#slider2').slider({
			min: 1, 
			max: 100,
			value : 100,  // 初期値（不透明）
			slide : function(evt, ui){
			alpha = ui.value;
			if(alpha == 100){
					alphaSize = 1;
			}else if(alpha <= 9){
					alphaSize = '0.0' + alpha;
			}else if(alpha >= 10){
					alphaSize = '0.' + alpha;
				 }
			}
		});
			
    //mousedown ivent
    $('canvas').mousedown(function(e) {
        undoImage = context.getImageData(0, 0, $('canvas').width(), $('canvas').height());
		flag = true;
        startX = e.pageX - $(this).offset().left - offset;
        startY = e.pageY - $(this).offset().top - offset;
		
        return false; // for chrome
    });
	
	
    


    //mousemove ivent
    $('canvas').mousemove(function(e) {
        if (flag) {
            var endX = e.pageX - $('canvas').offset().left - offset;
            var endY = e.pageY - $('canvas').offset().top - offset;
			
				var brushColor = picker.color;
				var getBrush1 = $('#brush1').is(':checked');
				var getBrush2 = $('#brush2').is(':checked');
				var getBrush3 = $('#brush3').is(':checked');
				var getBrush4 = $('#brush4').is(':checked');
				var getBrushm = $('#miter').is(':checked');
				var getEeraser = $('#eraser').is(':checked');
               
			
		//BRUSH(NORMAL)
		if(getBrush1 == true){
			context.globalAlpha = alphaSize;
            context.beginPath();
			context.globalCompositeOperation = 'source-over';
			context.strokeStyle = brushColor;
			context.lineWidth = brushSize;
			context.lineJoin= "round";
            context.lineCap = "round";
            context.shadowBlur = 0;
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.stroke();
            context.closePath();
          
		  //BRUSH(BLUR1)
		}else 	if(getBrush2 == true){
			context.beginPath();
			context.globalAlpha = alphaSize;
            
			context.globalCompositeOperation = 'source-over';
			context.strokeStyle = brushColor;
			context.lineWidth = brushSize;
			context.lineJoin= "round";
            context.lineCap = "round";
			context.shadowBlur = brushSize;
            context.shadowColor = brushColor;
			context.shadowColor = brushColor;
			context.setTransform(1, 0, 0, 1, 0, 0);
            
			
			context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.stroke();
            context.closePath();
			
        //BRUSH(BLUR２)
		}else if(getBrush3 == true){
		    context.beginPath();
			context.globalAlpha = alphaSize;
            
			context.globalCompositeOperation = 'source-over';
			context.strokeStyle = brushColor;
			context.lineWidth = brushSize;
			context.lineJoin= "round";
            context.lineCap = "round";
			context.shadowBlur = brushSize;
			context.shadowColor = brushColor;
			context.setTransform(1, 0, 0, 1, 0, 0);
			
            
			context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.stroke();
            context.closePath();
		
		//BRUSH(PASTEL)
		}else if(getBrush4 == true){
		    context.beginPath();
		    context.globalAlpha = 0.1;
		    
		    context.globalCompositeOperation = 'source-over';
		    context.strokeStyle = '#ffffff';
		    context.lineWidth = brushSize;
		    context.lineJoin= 'miter';
		    context.lineCap = 'butt';
		    context.shadowBlur = brushSize;
		    context.shadowColor = brushColor;
		    context.setTransform(1, 0, 0, 1, 0, 0);
		    context.moveTo(startX, startY);
		    context.lineTo(endX, endY);
		    context.stroke();
		    context.closePath();
        //BRUSH(SQUARE)
		}else if(getBrushm == true){
		    context.beginPath();
            context.globalAlpha = alphaSize;
	    	
			context.globalCompositeOperation = 'source-over';
			context.strokeStyle = brushColor;
			context.lineWidth = brushSize;
			context.lineJoin= 'miter';
			context.lineCap = 'butt';
			context.shadowBlur = 0;
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.moveTo(startX, startY);
			context.lineTo(endX, endY);
			context.stroke();
			context.closePath(); 
		
		//ERASER
		}else if(getEeraser == true){
		
		    context.globalAlpha = 1;
			context.beginPath();
			//context.globalCompositeOperation = 'destination-out';
			context.globalCompositeOperation = 'source-over';
			context.strokeStyle = '#ffffff';
			context.lineWidth = brushSize;
			context.lineJoin= 'round';
			context.lineCap = 'round';
			context.shadowBlur = 0;
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.moveTo(startX, startY);
			context.lineTo(endX, endY);
			context.stroke();
			context.closePath(); 
		}	
			startX = endX;
            startY = endY;
        }
    });
	
	
	
    //mouseup ivent・mouseleave ivent
    $('canvas').on('mouseup', function() {
        flag = false;
    });
 
    $('canvas').on('mouseleave', function() {
        flag = false;
    });
    //canvas clear
    $('#clear').click(function(e) {
        e.preventDefault();
        context.clearRect(0, 0, $('canvas').width(), $('canvas').height());
    });
	
	//undo
	$('#undo').click(function(e) {
        context.putImageData(undoImage,0,0);
	});
   //canvas save
    $('#save').click(function() {
      //  var d = canvas.toDataURL('image/png');
                 //d = d.replace('image/png', 'image/content-disposition');
		//window.open(d, 'save');

    var paint_data = canvas.toDataURL('image/png');
    
	paint_data = paint_data.replace(/^.*,/, '');
	
	var curFrm = document.sendform;
    
	curFrm.paintdata.value = paint_data;
    curFrm.submit();
    return;
    });

});