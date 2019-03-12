function goToPage(e){var $page=$.trim($("#goto",e).val());if($page==""){alert("请填写跳转页数！")}
else{if(!(/^[1-9]\d*$/.test($page))){alert("请填写正整数！");}
else{$url=$(e).attr("action");if($url.indexOf('/page/')>=0){$url=$url.replace('/page/\d*?',"/page/"+$page);}
else if($url.indexOf("/?")>=0){$url=$url.replace("/\?","/page/"+$page+"?");}
else if($url.indexOf("?")>=0){$url=$url.replace("\?","/page/"+$page+"?")}
else{if($url.substr($url.length-1,1)=="/"){$url+="page/"+$page;}
else{$url+="/page/"+$page;}}
window.location=$url;}}}
function goToUrl(url){window.location=url;}
function ajaxCheckLogin(){var isLogin=false;$.ajax({async:false,url:'/home.php?m=Member&a=ajaxCheckLogin',type:'post',dataType:"json",success:function(data,text){isLogin=data;}});return isLogin;}
function showBlackPoint(str){if(!$("#black_point")[0]){$('<div id="black_point" class="diy_point"></div>').appendTo(document.body);}
var bp=$("#black_point").html(str).show();var doc=document.documentElement;clearTimeout(bp[0].timer);bp.css({left:(doc.clientWidth-bp.outerWidth())/2,top:(doc.clientHeight-bp.outerHeight())/2}).hide().fadeIn();bp[0].timer=setTimeout(function(){bp.fadeOut()},1500)}
function toggleCollectPost(id,name,e,type){if(ajaxCheckLogin()){$.ajax({async:false,url:"/home.php?m=Member&a=toggleCollectPost",type:'post',data:{id:id,name:name},dataType:"json",success:function(data,text){var src=$(e).find("img").attr("src");if(type=="big"){if(data.type=="cancel"){showBlackPoint&&showBlackPoint("已取消收藏");$(e).removeClass("active");$(e).find("span").html("收藏");$(".ic_collect").removeClass("ic_share_active");var num=parseInt($(e).next("p").html())
$(e).next("p").html(num-1);$(".ic_collect span").html(num-1);}
else{showBlackPoint&&showBlackPoint("收藏成功");$(e).addClass("active");$(e).find("span").html("取消收藏");$(".ic_collect").addClass("ic_share_active");var num=parseInt($(e).next("p").html())
$(e).next("p").html(num+1);$(".ic_collect span").html(num+1);}}
else{if(data.type=="cancel"){showBlackPoint&&showBlackPoint("已取消收藏");$(e).removeClass("ic_share_active");$t=$(".public_btn_border");$t.removeClass("active");$t.find("span").html("收藏");var num=parseInt($(e).find('span').html())
$(e).find('span').html(num-1);$t.next("p").html(num-1);}
else{showBlackPoint&&showBlackPoint("收藏成功");$(e).addClass("ic_share_active");$t=$(".public_btn_border");$t.addClass("active");$t.find("span").html("取消收藏");var num=parseInt($(e).find('span').html())
$(e).find('span').html(num+1);$t.next("p").html(num+1);}}}});}
else{showWin('.win-login-wrap');$("name['returnUrl']").val(location.href);return;}}
function shareCount(id,e,type){$.ajax({async:false,url:"/home.php?m=Member&a=postShareCount",type:'post',data:{id:id},dataType:"json",success:function(data,text){if(type=="big"){$(e).find("span").html(data.count);}
else{$(".collect-and-share-wrap .share li span").html(data.count);}}});}
function beforeReply(id,name){$("#content").val("");$("#parent_id").val(id);$("#content").attr('placeholder',name);$("#content").focus();$("html,body").animate({scrollTop:$(".all-comment-list-wrap").offsetTop},1000);}
var commentStatus=1;function commentNow(){if(commentStatus!=1){return false}
var content=$.trim($("#content").val());if(content==""){alert("请填写评论内容！");return false;}
$.ajax({async:false,url:'/home.php?m=Member&a=ajaxCheckLogin',type:'post',dataType:"json",success:function(data,text){if(data===true){$.ajax({async:false,url:"/home.php?m=Member&a=commentNow",type:'post',data:{id:$("#id").val(),parent_id:$("#parent_id").val(),content:content},dataType:"json",async:false,success:function(data,text){if(data){if(data.isValidate){var html='<dd class="clear">';html+='<span class="person fl"><img class="face lazy" src="'+(data.imagePath==""?$("#template_directory").val()+"/img/Default_Avatar.png":data.imagePath)+'"/></span>';html+='<div class="cont">';html+='<div class="feature">';html+='<span class="origin">'+data.name+'</span>';html+=data.commentDate;html+='<a href="javascript:void(0)" onclick="beforeReply('+data.comment_id+',\'回复@'+data.name+'\');">回复</a>';html+='<p class="text">';if(data.toUserName!=""){html+='回复 <a href="javascript:;">'+data.toUserName+'</a>: ';}
html+=data.content+'</p>';html+='</div>';html+='</div>';if(data.toUserName!=""){html+='<dl class="reply"><dd class="clear"><span class="person fl">';html+='<img class="face lazy" src="'+(data.parentImagePath==""?$("#template_directory").val()+"/img/Default_Avatar.png":data.parentImagePath)+'"/></span>';html+='<div class="cont"><div class="feature"><span class="origin">';html+=data.toUserName+'</span>';html+=data.parentCommentDate;html+='<a href="javascript:void(0)" onclick="beforeReply('+data.parent_id+',\'回复@'+data.toUserName+'\');">回复</a>';html+='</div>';html+='<p class="text">'+data.parent_content+'</p>';html+='</div>';}
html+='</dd>';$(".all-comment-list-wrap dt").html(data.count+"条评论");$(".all-comment-list-wrap dt").after(html);$("#content").val("");$("#content").attr('placeholder','');$("#parent_id").val("");window.location.reload();commentStatus=0;}else{alert(data.message);}}else{alert('评论失败！请重试！');}}});}else{showWin('.win-login-wrap');$("name['returnUrl']").val(location.href);}}});}
function showWin(e){if(document.documentElement.clientWidth<768){if(e==".win-login-wrap"){location.href="/home.php?m=Member&a=mlogin";return;}else if(e==".win-register-wrap"){location.href="/home.php?m=Member&a=mregister";return;}else if(e==".win-forget-wrap"){location.href="/home.php?m=Member&a=mforget";return;}}
$(".win-wrap").hide();$(e).fadeIn();$(e).css("left",($(window).width()-$(e).width())/2);if(e==".lottery-sub-course-wrap"||e==".lottery-course-wrap"||e==".lottery-package-wrap"||e==".lottery-rule-wrap"){if(e==".lottery-course-wrap"){$(e).css("top",($(window).height()-$(e).height()-184)/2+184);}
else if(e==".lottery-sub-course-wrap"){$(e).css("top",($(window).height()-$(e).height()-48)/2+48);}
else if(e==".lottery-package-wrap"){$(e).css("top",($(window).height()-$(e).height()-195)/2+195);}
else{$(e).css("top",($(window).height()-$(e).height())/2);}}
else{$(e).css("top",($(window).height()-$(e).height()-110)/2);}
$('.black-back').show();}
function hideWin(){$(".win-wrap").hide();$('.black-back').hide();}
function sendSmsVerifyCode(type,e){type=type||'register';e=e||"body";var mobile=jQuery.trim(jQuery("#mobile",e).val());if(mobile==""){alert("请填写手机号！");return false;}
else if(!checkMobile(mobile)){alert("手机号格式不正确！");return false;}
jQuery.ajax({url:"/home.php?m=Member&a=sendSmsVerifyCode&mobile="+mobile+"&type="+type,type:"post",success:function(data,text){dataInJson=eval('('+data+')');if(dataInJson.errno=="000"){alert("发送成功，请注意查收！");}
else{alert(dataInJson.errmsg);}}});}
function checkMobile(str){var re=/^\d{11}$/
return re.test(str);}
function checkRegister(e){e=e||"body";if(e!='.win-forget-wrap'){var name=jQuery.trim(jQuery("#name",e).val());if(name==""){alert("请填写昵称！");return false;}}
var mobile=$.trim($("#mobile",e).val());if(mobile==""){alert("请填写手机号！");return false;}
else if(!checkMobile(mobile)){alert("手机号格式不正确！");return false;}
var verifyCode=$.trim($("#verify_code",e).val());if(verifyCode==""){alert("请填写短信验证码！");return false;}
var password=$.trim($("#password",e).val());if(password==""){alert("请填写登录密码！");return false;}
else if(password.length<6){alert("密码至少为6位！");return false;}
else{if($.trim($("#password_confirm",e).val())!=password){alert("两次输入的密码不一样！");return false;}}
return true;}
function checkLogin(e){e=e||"body";var mobile=$.trim($("#mobile",e).val());if(mobile==""){alert("请填写手机号！");return false;}
else if(!checkMobile(mobile)){alert("手机号格式不正确！");return false;}
var password=$.trim($("#password",e).val());if(password==""){alert("请填写登录密码！");return false;}
else if(password.length<6){alert("密码至少为6位！");return false;}
return true;}
function ajaxLogin(){if(checkLogin('.win-login-wrap')){$.ajax({url:"/home.php?m=Member&a=ajaxLogin",type:"post",data:{mobile:$.trim($("#mobile",".win-login-wrap").val()),password:$.trim($("#password",".win-login-wrap").val())},dataType:"json",success:function(data,text){if(data.isValidate){var returnUrl=$.trim($("#returnUrl").val());if(returnUrl!=""){window.location=$("#returnUrl").val();}
else{window.location=location;}}
else{alert(data.message);}}});}}
function ajaxRegister(){if(checkRegister('.win-register-wrap')){$.ajax({url:"/home.php?m=Member&a=ajaxRegister",type:"post",data:{name:$.trim($("#name",".win-register-wrap").val()),mobile:$.trim($("#mobile",".win-register-wrap").val()),verify_code:$.trim($("#verify_code",".win-register-wrap").val()),password:$.trim($("#password",".win-register-wrap").val()),password_confirm:$.trim($("#password_confirm",".win-register-wrap").val())},dataType:"json",success:function(data,text){if(data.isValidate){var returnUrl=$.trim($("#returnUrl").val());if(returnUrl!=""){}
showWin('.win-register-success-wrap');}
else{alert(data.message);}}});}}
function ajaxForget(){if(checkRegister('.win-forget-wrap')){$.v_path=$.ajax({url:"/home.php?m=Member&a=ajaxForget",type:"post",data:{mobile:$.trim($("#mobile",".win-forget-wrap").val()),verify_code:$.trim($("#verify_code",".win-forget-wrap").val()),password:$.trim($("#password",".win-forget-wrap").val()),password_confirm:$.trim($("#password_confirm",".win-forget-wrap").val())},dataType:"json",success:function(data,text){if(data.isValidate){if(confirm('重置密码成功，马上登录？')){showWin('.win-login-wrap');}}
else{alert(data.message);}}});}}
function checkLottery(id){$.ajax({url:"/home.php?m=Lottery&a=check&id="+id,type:"post",success:function(data,text){if(data.isValidate){showWin('.lottery-rule-wrap');}
else{if(data.message=="请先登录！"){showWin('.win-login-wrap');}
else if(data.message=="今天抽奖次数已用完！明天再来吧！"){showWin('.lottery-over-wrap');}
else{alert(data.message);}}}});}
$(function(){var pager=$("#pager").val();if(pager==="single"){$.ajax({async:false,url:"/home.php?m=Index&a=viewCount&id="+$("#id").val(),type:'post',});$(".lt_main .atcl_extend img").each(function(){if($(this).parent()[0].tagName!="A"){var src=this.src.indexOf('http')<0?"http://"+window.location.host+"/"+this.src:this.src;var temA=$('<a href="'+src+'" class="vi" style="text-decoration: none; display: block;"></a>');$(this).after(temA);temA.append(this);}})
$(".lt_main .atcl_extend a").each(function(){if($(this).find("img").length>0){$(this).addClass("magnific-a");}
else{$(this).attr("target","_blank");}});$('.lt_main .atcl_extend').magnificPopup({delegate:'.magnific-a',type:'image',preloader:true,gallery:{enabled:true}});}})