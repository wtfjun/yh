function showCheck(a){
	var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
	ctx.clearRect(0,0,1000,1000);
	ctx.font = "80px 'Microsoft Yahei'";
	ctx.fillText(a,0,100);
	ctx.fillStyle = "white";
}
var code ;    
function createCode(){       
    code = "";      
    var codeLength = 4;
    var selectChar = new Array(1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');      
    for(var i=0;i<codeLength;i++) {
       var charIndex = Math.floor(Math.random()*60);      
      code +=selectChar[charIndex];
    }      
    if(code.length != codeLength){      
      createCode();      
    }
    showCheck(code);
}
          
function inputClear() {
  $('.password').val('');
  $('.re_pass').val('');
  $('#J_codetext').val('');
}

function validate(){
    var userName = $('.user_name').val();
    var password = $('.password').val();
    var rePass = $('.re_pass').val();

    var inputCode = document.getElementById("J_codetext").value.toUpperCase();
   
    var codeToUp=code.toUpperCase();
   
    if(inputCode.length <=0 || userName.length <=0 || password.length <= 0 || rePass.length <=0) {
      $('#error').text('信息不完整，请重新输入。');
      createCode();
      inputClear();
      return false;
    }
    else if(password != rePass) {
      $('#error').text('两次输入的密码不一致，请重新输入。');
      inputClear();
      return false;
    }
    else if(inputCode != codeToUp ){
     
       $('#error').text('验证码错误，请重新输入。');
      createCode();
      inputClear();
      return false;
    }
    else {
      window.open(document.getElementById("J_down").getAttribute("data-link")); 
      createCode();
      return true;
    }

}

function validateLogin(){
    var userName = $('.user_name').val();
    var password = $('.password').val();
    //var rePass = $('.re_pass').val();

    var inputCode = document.getElementById("J_codetext").value.toUpperCase();
   
    var codeToUp=code.toUpperCase();
   
    if(inputCode.length <=0 || userName.length <=0 || password.length <= 0 || rePass.length <=0) {
      $('#error').text('信息不完整，请重新输入。');
      createCode();
      inputClear();
      return false;
    }
    /*else if(password != rePass) {
      $('#error').text('两次输入的密码不一致，请重新输入。');
      inputClear();
      return false;
    }*/
    else if(inputCode != codeToUp ){
     
       $('#error').text('验证码错误，请重新输入。');
      createCode();
      inputClear();
      return false;
    }
    else {
      window.open(document.getElementById("J_down").getAttribute("data-link")); 
      createCode();
      return true;
    }

}