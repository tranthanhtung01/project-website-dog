$('#btn-login').click(function () {
    $('#login-modal').modal('show');
    });

$('#btn-register').click(function () {
    $('#register').modal('show');
    });
$('#chuaLaThanhVien').click(function () {
        $('#login-modal').modal('hide');
        $('#register').modal('show');
    });
$('.showTogether').click(function() {
    $('#shoppingCart').toggle();
});
$('#btn-category').click(function () {
        $('#Categories').toggle(400);
    });
 function hienthi(type_design){
        switch (type_design) {
            case "all":
                $(".corgi").show("slow");
                $(".husky").show("slow");
                $(".mountain").show("slow");
                break;
            case "corgi":
                $(".corgi").show("slow");
                $(".husky").hide("slow");
                $(".mountain").hide("slow");
                break;
            case "husky":
                $(".corgi").hide("slow");
                $(".husky").show("slow");
                $(".mountain").hide("slow");
                break;
            case "mountain":
                $(".corgi").hide("slow");
                $(".husky").hide("slow");
                $(".mountain").show("slow");
                break;
            default:
                // statements_def
                break;
        }
    }
function openNav() {
	document.getElementById("mySidenav").style.width = "252px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function(){
    $("#sub-pro-0").hover(function(){
        $("#btn-0").toggle(400);
    });
    $("#sub-pro-1").hover(function(){
        $("#btn-1").toggle(400);
    });
    $("#sub-pro-2").hover(function(){
        $("#btn-2").toggle(400);
    });
     $("#sub-pro-3").hover(function(){
        $("#btn-3").toggle(400);
    });
      $("#sub-pro-4").hover(function(){
        $("#btn-4").toggle(400);
    });
       $("#sub-pro-5").hover(function(){
        $("#btn-5").toggle(400);
    });
       $("#sub-pro-6").hover(function(){
        $("#btn-6").toggle(400);
    });
       $("#sub-pro-7").hover(function(){
        $("#btn-7").toggle(400);
    });
});
// Back to Top
$(window).scroll(function(){
    if($(this).scrollTop() != 0){
        $('#bttop').show();
    }
    else
        $('#bttop').hide();
})

$('#bttop').click(function(){
    $('html').animate({
        scrollTop:0
    },500);
});

function showHide3 (){
	var x = document.getElementById('password_3');
	var y = document.getElementById('toggle3');
	var z = document.getElementById('toggle4');

	if(x.type === 'password'){
		x.type = 'text';
		y.style.display = 'block';
		z.style.display = 'none';
	}else{
		x.type = 'password';
		y.style.display = 'none';
		z.style.display = 'block';
	}
}
function showHide (){
	var x = document.getElementById('password');
	var y = document.getElementById('toggle1');
	var z = document.getElementById('toggle2');

	if(x.type === 'password'){
		x.type = 'text';
		y.style.display = 'block';
		z.style.display = 'none';
	}else{
		x.type = 'password';
		y.style.display = 'none';
		z.style.display = 'block';
	}
}


  
  
  
