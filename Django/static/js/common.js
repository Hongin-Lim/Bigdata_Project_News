//===================================================================================================
// FILE : js/common.js
// DESC : ���� �ڹٽ�ũ��Ʈ �Լ�
// AUTH : 2008.10.20 bhwoo create
// MODI : 2008.12.15 khh0322 modify : img blank �κ� ����
//===================================================================================================

//---------------------------------------------------------------------------------------------------
// ������ ��������
//---------------------------------------------------------------------------------------------------
function getDomain() {
	var domain = document.domain;
	var pattern = /([a-zA-Z]*)\.com$/;
	if ( (result = pattern.exec(domain)) != null ) {
		return result[0];
	}
}

//---------------------------------------------------------------------------------------------------
// �˾�â ����
//---------------------------------------------------------------------------------------------------
function OpenPopup(url, width, height, target, option) {

	if (!option) {
		var option = "scrollbars=yes,left=0,top=0";
	}

	// ���� ���佽���̵� ������
	if ( width == '858' && height == '670' ) {
		width = 868;
		height = 619;
	}

	var patternSlide = /photo\/slidePopup/;
	var patternStory = /photo\/storyPopup/;
	var patternSpoPhoto = /spo\/photoPopup/;
	if ( (result = patternSlide.exec(url)) != null && height == 619) {
		height = 695;
	} else if ( (result = patternStory.exec(url)) != null && height == 619) {
		height = 695;
	} else if ( (result = patternSpoPhoto.exec(url)) != null ) {
		width = 972;
		height = 795;
	}

	if ( navigator.userAgent.toLowerCase().indexOf("safari")!=-1 ) {
		height+=3;
	}
	
    var viewpage = window.open(url, target, option+',width='+width+',height='+height);
    viewpage.focus();
}
 
//---------------------------------------------------------------------------------------------------
// ������ �̵�
//---------------------------------------------------------------------------------------------------
function movePage(url) {
	window.location.href = url;
}

//---------------------------------------------------------------------------------------------------
// ������ ������ �̵�
//---------------------------------------------------------------------------------------------------
function countTime(url,second) {
	setTimeout("movePage(\""+url+"\")", second);
}

//---------------------------------------------------------------------------------------------------
// ���� ���� 
//---------------------------------------------------------------------------------------------------
function StringSize (s) {
	var i;
	var len = 0;
	for ( i=0 ; i<s.length; i++) {
		if ( s.charCodeAt(i) > 255 ) {
			//len ++;
			len += 2;
		} else {
			len ++;
		}
	}
	return len;
}

//---------------------------------------------------------------------------------------------------
// �̹��� ���� ��� blank�̹��� ó�� 
// ����� �ʿ��ؼ� ImgError�Լ� ����.
//---------------------------------------------------------------------------------------------------
function blankImg(imageObj,width,height,thumbSize) {

	if (thumbSize == 90) {
		var ImgFile = "img_noimage90x90.gif";
		var width	= 90;
		var height	= 90;
	} else if (thumbSize == 100) {
		var ImgFile = "img_noimage100x100.gif";
		var width	= 100;
		var height	= 100;
	} else if (thumbSize == 130) {
		var ImgFile = "img_noimage130x130.gif";
		var width	= 130;
		var height	= 130;
	} else {
		var ImgFile = "blank.gif";
	}

	imageObj.src	= "//nimg.nate.com/ui/uidev/images/common/" + ImgFile;
   	imageObj.width	= width;
   	imageObj.height	= height;
}

var rImg=new Array();
function ImgError(imageObj, filename, size) {

    if ( !rImg[imageObj.sourceIndex] ) {
        rImg[imageObj.sourceIndex]=filename;

   		imageObj.src = filename;
		if (size == 70) {
       		imageObj.height=size;
		} else {
       		imageObj.width=size;
		}
    } else {
		blankImg(imageObj,0,0,size);
    }
}

//---------------------------------------------------------------------------------------------------
// ���ڿ� trim
//---------------------------------------------------------------------------------------------------
function trim(str) {
	str = str.replace(/^\s*/,'').replace(/\s*$/, ''); 
	return str;
    //return replace(str," ","");
}

//---------------------------------------------------------------------------------------------------
// ��Ű ��������
//---------------------------------------------------------------------------------------------------
function GetCookie(name,escape){ 
    var cname = name + "=";               
    var dc = document.cookie;             
 
    if (dc.length > 0) {              
     begin = dc.indexOf(cname);       
        
        if (begin != -1) {           
         begin += cname.length;       
         end = dc.indexOf(";", begin);
 
         if (end == -1) end = dc.length;
			if ( escape != null ) {
				return dc.substring(begin, end);
			} else {
				return unescape(dc.substring(begin, end));
			}
        } 
    }
    return "";
} 

//---------------------------------------------------------------------------------------------------
// ��Ű ����
//---------------------------------------------------------------------------------------------------
function setCookie(name,value,expires,path,domain,secure)
{
   var argv = setCookie.arguments;
   var argc = setCookie.arguments.length;
   var expires = (2 < argc) ? argv[2] : null;
   var path = (3 < argc) ? argv[3] : null;
   var domain = (4 < argc) ? argv[4] : null;
   var secure = (5 < argc) ? argv[5] : false;

   document.cookie = name + "=" + value +
     ((expires == null) ? "" : ("; expires="+expires.toGMTString())) +
     ((path == null) ? "" : ("; path=" + path)) +
     ((domain == null) ? "" : ("; domain=" + domain)) +
     ((secure == true) ? "; secure" : "");
}

//---------------------------------------------------------------------------------------------------
// ��Ű ����
//---------------------------------------------------------------------------------------------------
function DelCookie( name, path, domain ) {
	var value = GetCookie(name);
	var	domain = getDomain();
	if ( value != '' && value.length > 0 ) document.cookie = name + "=" +
	( ( path ) ? ";path=" + path : "") +
	( ( domain ) ? ";domain=" + domain : "" ) +
	";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

//---------------------------------------------------------------------------------------------------
// iframe resize
//---------------------------------------------------------------------------------------------------
function resizeFrame(iframeObj)
{
//	var innerBody = iframeObj.contentWindow.document.body;
//	var innerHeight = innerBody.scrollHeight + (innerBody.offsetHeight - innerBody.clientHeight)/2;
//	var innerHeight = innerBody.scrollHeight;

	//nescape 
//	if ( innerHeight == 0 ) {
//		innerHeight=95;
//	}

//	iframeObj.style.height = innerHeight;
	if ( iframeObj.contentDocument ) {
		iframeObj.style.height = 100 + "%";
	} else {
	  	iframeObj.style.height = iframeObj.contentWindow.document.body.scrollHeight;
	}
}

//---------------------------------------------------------------------------------------------------
// div display ����
//---------------------------------------------------------------------------------------------------
function ViewDiv(vnum,divname,cnt ) {
	var i,n,o;
	n = cnt;

	for(i = 1; i <= n; i++) {
		o = document.getElementById(divname + i);
		if(i == vnum) {
			o.style.display = '';
		} else {
			o.style.display = 'none';
		}
	}
}

//---------------------------------------------------------------------------------------------------
// className display ����
//---------------------------------------------------------------------------------------------------
function ViewClassname(vnum,divname,cnt,sclass ) {
	var i,n,o;
	n = cnt;

	for(i = 1; i <= n; i++) {
		o = document.getElementById(divname + i);
		if(i == vnum) {
			o.className = sclass;
		} else {
			o.className = 'none';
		}
	}
}

//---------------------------------------------------------------------------------------------------
// �Ѱ� ����
//---------------------------------------------------------------------------------------------------
var ThisPhoto = 0;
var ThisWhy = 0;
function ViewNextPre( bnext,divname,cnt ) {
	var i,n,o;
	n = cnt;

	if ( bnext == 1 ) {
		ThisPhoto += 1;
	} else {
		ThisPhoto = ThisPhoto + (n - 1);
	}

	ThisPhoto %= n;

	for(i = 0; i < n; i++) {
		o = document.getElementById(divname + i);
		if(i == ThisPhoto) {
			o.style.display = '';
		} else {
			o.style.display = 'none';
		}
	}
}

//---------------------------------------------------------------------------------------------------
// �ڵ����� �Ѱ� ����
//---------------------------------------------------------------------------------------------------
var bRoll = 0;
function ViewNextPreRolling ( bnext,divname,cnt,timeLimit ) {
	if (bRoll == 0) {
		bRoll = 1;
		setTimeout("ViewNextPreRolling( "+bnext+",'"+divname+"',"+cnt+","+timeLimit+")", timeLimit);
		return
	}

	ViewNextPre(bnext,divname,cnt);
	setTimeout("ViewNextPreRolling( "+bnext+",'"+divname+"',"+cnt+","+timeLimit+")", timeLimit);
}

//---------------------------------------------------------------------------------------------------
// ���콺 over �� �ٸ� div ����
//---------------------------------------------------------------------------------------------------
function DisplayPart(cnt,divname,index) {
	for(i = 1; i <= cnt; i++) {
		if(index == i) {
			thisPart = document.getElementById(divname + index);
			thisPart.style.display = "";
		} else {
			otherPart = document.getElementById(divname + i);
			otherPart.style.display = "none";
		}
	}
}

//---------------------------------------------------------------------------------------------------
// ���콺 over �� �ٸ� div ���� _ �޴���.
// cnt : div ���� / mdiv : �޴� div�� / mclass : �޴� class�� / cdiv, index : ������ div��.
//---------------------------------------------------------------------------------------------------
function DisplayMenu(cnt, mdiv, mclass, cdiv, index) {
	for(i = 1; i <= cnt; i++) {
		if(index == i) {
			thisPart = document.getElementById(mdiv + index);
			thisPart.className = mclass;
		} else {
			otherPart = document.getElementById(mdiv + i);
			otherPart.className = "";
		}
	}

	DisplayPart(cnt,cdiv,index);
}

//---------------------------------------------------------------------------------------------------
// �⺻ ���.
//---------------------------------------------------------------------------------------------------
function BasicToogle(idx) {
	var idxEl = document.getElementById(idx);
	if(idxEl.style.display != "none") { 
		idxEl.style.display = "none";
	} else {
		idxEl.style.display = "block";
	}
}

/*-------------------------- �α��� ----------------------------------*/
//---------------------------------------------------------------------------------------------------
// �α����� ���� cpurl ���� ����
//---------------------------------------------------------------------------------------------------
var cpurlparam = '';
var ndrcpurl = null;
var ndrcpurl_chkcnt = 0;
function setLoginCpUrlParam() {
	var found = false;
	var imgs = document.getElementsByTagName('img')
	for (var i=imgs.length-1; i>=0; i--) {
		var img = imgs.item(i);
		if ( /http:\/\/stat.nate.com\/stat\/stat.tiff\?cp_url=/.test(img.src) ) {
			found = true;
			var rndrcpurl = img.src.substring(img.src.indexOf('[')+1, img.src.indexOf(']')-1).split('?');
			ndrcpurl = rndrcpurl[0];
			if ( ndrcpurl.charAt(ndrcpurl.length-1) == '/' ) {
				ndrcpurl = ndrcpurl.substring(0, ndrcpurl.length-1);
			}
			ndrcpurl = ''+ndrcpurl+'/';

			// ������ ������ ��� ������ popuplogin url ����
			try {
				if ( window.sp_pop_url ) {
					window.sp_pop_url = 'https://xo.nate.com/PopUpLogin.sk?&pop=direct&redirect='+encodeURIComponent('//news.nate.com/etc/reload?mode=opener')+getLoginCpUrlParam();
					}
			} catch(e) {}

			break;
		}
	}

	// ��ã�� ��� ndr�� �̹����� onload�ÿ� �������� �� �����Ƿ� 0.5�ʵ� �ٽ� �������ϴ�.
	if ( !found && ndrcpurl_chkcnt==0 ) {
		ndrcpurl_chkcnt = 1;
		window.setTimeout(setLoginCpUrlParam, 500);
	}
}
try {
    window.addEventListener('load', setLoginCpUrlParam, false);
} catch(e) {
    window.attachEvent('onload', setLoginCpUrlParam);
}

//---------------------------------------------------------------------------------------------------
// get login cpurl 
//---------------------------------------------------------------------------------------------------
function getLoginCpUrlParam() {
	var cpurlparam = '';
	try {
		if ( !ndrcpurl ) throw '';
		cpurlparam = '&cpurl=' + encodeURIComponent(ndrcpurl);
	} catch(e1) {
		try {
			if ( !top.ndrcpurl ) throw '';
			cpurlparam = '&cpurl=' + encodeURIComponent(top.ndrcpurl);
		} catch(e2) {
			try {
				if ( !parent.ndrcpurl ) throw '';
				cpurlparam = '&cpurl=' + encodeURIComponent(parent.ndrcpurl);
			} catch(e3) {
			}
		}
	}

	return cpurlparam;
}


//---------------------------------------------------------------------------------------------------
//�α��� ��Ű Ȯ��
//---------------------------------------------------------------------------------------------------
function checkLoginCookie() {
	if(GetCookie("SFN") != null && GetCookie("SFN").length > 0){
		return true;
	}else{
		return false;
	}	
}

//---------------------------------------------------------------------------------------------------
// loginüũ
//---------------------------------------------------------------------------------------------------
function checkLogin(site_gb) {
	if (confirm("�α����� �ʿ��� �����Դϴ�.\n�α��� �������� �̵��Ͻðڽ��ϱ�?"))
	{
		document.location.href = '//xo.nate.com/Login.sk?redirect='+encodeURIComponent(document.location.href)+getLoginCpUrlParam();
	}	
}

//---------------------------------------------------------------------------------------------------
// �α��� ���� Ȯ�� �� �α��������� �Ǵ� �ش� �������� �б�
//---------------------------------------------------------------------------------------------------
function checkLoginAndMove(url) {

	var name = GetCookie("n_");
	var isLogin = loginCheck();
		
	if ( isLogin == 'Y' ) {
		isLogin = true;
	}

	//gnb ���� �������� üũ
	if ( name != null && name != "" ) {
		isLogin = true;
	}

	if ( isLogin ) {
		document.location.href=url;
	} else {
		moveLogin('n', url, false);
	}
}

//---------------------------------------------------------------------------------------------------
// loginüũ
//---------------------------------------------------------------------------------------------------
function moveLogin(site_gb, redirect, nocheck) {
	if (redirect != '' && redirect != null && redirect != undefined) {
		var RedirectUrl = redirect;
	} else {
		var RedirectUrl = document.location.href;
	}

	if ( !nocheck ) {
		if (confirm("�α����� �ʿ��� �����Դϴ�.\n�α��� �������� �̵��Ͻðڽ��ϱ�?"))
		{
			document.location.href = '//xo.nate.com/Login.sk?redirect='+encodeURIComponent(RedirectUrl)+getLoginCpUrlParam();
		}
	} else {
		document.location.href = '//xo.nate.com/Login.sk?redirect='+encodeURIComponent(RedirectUrl)+getLoginCpUrlParam();
	}
}

//---------------------------------------------------------------------------------------------------
//�α��� üũ - ���������� with callback
//---------------------------------------------------------------------------------------------------
function checkLoginIframe(site_gb, callback) {
	if (confirm("�α����� �ʿ��� �����Դϴ�.\n�α��� �������� �̵��Ͻðڽ��ϱ�?"))
	{
		if ( callback ) {
			callback();
		}
		moveLoginTop();
	}	
}

//---------------------------------------------------------------------------------------------------
//��â �α��� �̵� (üũ����)
//---------------------------------------------------------------------------------------------------
function moveLoginTop() {
	top.location.href = '//xo.nate.com/Login.sk?redirect='+encodeURIComponent(top.document.location.href)+getLoginCpUrlParam();
}

function moveLoginTopConfirm() {
	
	if (confirm("�α����� �ʿ��� �����Դϴ�.\n�α��� �������� �̵��Ͻðڽ��ϱ�?"))
	{
		moveLoginTop();
	}
}

/*-------------------------- //�α��� ----------------------------------*/

//---------------------------------------------------------------------------------------------------
// ����Ȯ��
//---------------------------------------------------------------------------------------------------
function goCheckSelf(frame_gb) {
	
	if (confirm("������ ��翡 ����� �ۼ��ϱ� ���ؼ� ���� 1ȸ �Ǹ������� �ʿ��մϴ�. �Ǹ����� �Ͻðڽ��ϱ�?"))
	{
		var thisdomain = document.domain;
		if (frame_gb!='N'){
			thisdomain = top.document.domain;
		}
		
		if ( document.domain == 'nate.com' ) {
			if (frame_gb=='N'){	
				thisdomain = document.location.href;
			} else {
				thisdomain = top.document.location.href;
			}
			thisdomain = thisdomain.replace(/^https:\/\//, '');
			thisdomain = thisdomain.replace(/\/.*/g, '');
		}
		
		var e_url = 'https://' + thisdomain + '/etc/realNameBridge';
		var r_url = document.location.href;
		
		if (frame_gb=='N'){	
			var r_url = document.location.href
		} else {
			e_url += '?top=top';
			r_url = top.location.protocol + '//' + top.location.host + top.location.pathname;
		}
		
		var check_url = 'https://member.nate.com/Auth/ConfirmRealNamePopup.sk';
		check_url += '?e_url=' + encodeURIComponent(e_url);
		check_url += '&r_url=' + encodeURIComponent(r_url);
		
		var check_win = OpenPopup(check_url, 475, 757, 'check_win');
	}	
}

//---------------------------------------------------------------------------------------------------
// iframe resize
//---------------------------------------------------------------------------------------------------
function resizeIfr(obj, minHeight, forceNocheckIE) {
	minHeight = minHeight || 10;
	
	try {
		var getHeightByElement = function(body) {
			var last = body.lastChild;
			try {
				while (last && last.nodeType != 1 || !last.offsetTop) last = last.previousSibling;
				return last.offsetTop+last.offsetHeight;
			} catch(e) {
				return 0;
			}
			
		}
				
		var doc = obj.contentDocument || obj.contentWindow.document;
		if (doc.location.href == 'about:blank') {
			obj.style.height = minHeight+'px';
			return;
		}
		
		//var h = Math.max(doc.body.scrollHeight,getHeightByElement(doc.body));
		//var h = doc.body.scrollHeight;
		if (/MSIE/.test(navigator.userAgent) && !forceNocheckIE) {
			var h = doc.body.scrollHeight;
		} else {
			var s = doc.body.appendChild(document.createElement('DIV'))
			s.style.clear = 'both';

			var h = s.offsetTop;
			s.parentNode.removeChild(s);
		}
		
		//if (/MSIE/.test(navigator.userAgent)) h += doc.body.offsetHeight - doc.body.clientHeight;
		if (h < minHeight) h = minHeight;
	
		obj.style.height = h + 'px';
		if (typeof resizeIfr.check == 'undefined') resizeIfr.check = 0;
		if (typeof obj._check == 'undefined') obj._check = 0;

		//if (obj._check < 5) {
			//obj._check++;
			//setTimeout(function(){ resizeIfr(obj,minHeight) }, 200); // check 5 times for IE bug
		//} else {
			//obj._check = 0;
		//}	
	} catch (e) { 
		//alert(e);
	}
	
}

//---------------------------------------------------------------------------------------------------
// frm submit
//---------------------------------------------------------------------------------------------------
function frmSubmit(frmName) {
	var frm = document.forms[frmName];
	if ( frm != undefined ) {
		frm.submit();
	}
}

//---------------------------------------------------------------------------------------------------
// ��ǥ�ϱ�
//---------------------------------------------------------------------------------------------------
function votePoll(frmName,site,n,login) {

	var name = GetCookie("n_");
	var isLogin = loginCheck();
		
	if ( isLogin == 'Y' ) {
		isLogin = true;
	}

	//gnb ���� �������� üũ
	if ( name != null && name != "" ) {
		isLogin = true;
	}

	if ( isLogin ) {
		var frm = document.forms[frmName];
		var bSelect = false;
		
		if ( frm == undefined && n != undefined ) {
			var iframe = window.frames['ifr_poll'+n];
			frm = iframe.document.forms[frmName];
		}

		if ( frm != undefined ) {
			var qsList = frm.qs;
			for  ( i=0; i < qsList.length; i++) {
				if ( qsList[i].checked == true ) {
					bSelect = true;
					nORD = i;
				}
			}
			if ( bSelect ) {
				var url = frm.action+"?poll_sq="+frm.poll_sq.value+"&qs="+nORD;
				OpenPopup(url, 350, 215, 'defaultMsg');
				
				// ��ǥ �� ������ư, ��ǥ��ư ��Ȱ��ȭ
				for ( i=0; i < qsList.length; i++) {
					qsList[i].disabled = true;
				}
				
				return;
			} else {
				qsList[0].focus();
				alert("���⸦ ������ �ּ���");
			} 
		} else {
//			alert('�߸��� �����Դϴ�.');
		}
	} else {
		checkLoginIframe(site);
	}
}

//---------------------------------------------------------------------------------------------------
// SelectToogle
//---------------------------------------------------------------------------------------------------
var nToogle = 0;
function selectToogle( sID ) {
	var elem = document.getElementById(sID);
	if ( nToogle == '0' ) {
		elem.style.zIndex = '99999';
		elem.style.display = 'block';
		nToogle = 1;
	} else {
		nToogle = 0;
		elem.style.display = 'none';
	}
}

//---------------------------------------------------------------------------------------------------
// select layer
//---------------------------------------------------------------------------------------------------
 function selectDesign(sID)
 {
	var elem = document.getElementById(sID);

 	if(elem.style.display == "block")
 		elem.style.display = "none";
 	else 
 		elem.style.display = "block";
 }
 	
//---------------------------------------------------------------------------------------------------
// mouseout click��
//---------------------------------------------------------------------------------------------------
function mouseoutDesign(sID)
{
	var elem = document.getElementById(sID);
 	elem.style.display = "none";
}

//---------------------------------------------------------------------------------------------------
// Div �Ѹ�
//---------------------------------------------------------------------------------------------------
function news_roll(div_id, news_height, news_delay, news_speed, this_height) {

	if (eval(div_id + "_mouseEvent")) {
		var div_tag = document.getElementById(div_id);
		var a_tag, i;
		this_height++;

		if(this_height < news_height){
			div_tag.style.top = -this_height;
			setTimeout("news_roll('" + div_id + "', " + news_height + ", " + news_delay + ", " + news_speed + ", " + this_height + ");", news_speed);
		} else {

			a_tag = div_tag.getElementsByTagName("li");
			child=div_tag.removeChild(a_tag[0]);
			div_tag.appendChild(child);

			//a_tag = div_tag.getElementsByTagName("li");
			//div_tag.appendChild(a_tag[0]);

			div_tag.style.top = 0;
			setTimeout("news_roll('" + div_id + "', " + news_height + ", " + news_delay + ", " + news_speed + ", 0);", news_delay);
		}
	} else {
		setTimeout("news_roll('" + div_id + "', " + news_height + ", " + news_delay + ", " + news_speed + ", " + this_height + ");", news_speed);
	}

	return true;
}

//---------------------------------------------------------------------------------------------------
// Random �� ������
//---------------------------------------------------------------------------------------------------
function randValue( min, max ) {
	var argc = arguments.length;
	if (argc == 0) {
		min = 0;
		max = 2147483647;
	} else if (argc == 1) {
		throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//---------------------------------------------------------------------------------------------------
// < > " & ��ȯ
//---------------------------------------------------------------------------------------------------
function replaceHTML(str) {

	var FROM = new Array(/&lt;/g,/&gt;/g,/&quot;/g,/&amp;/g);
	var TO	= new Array("<",">","\"","&");
	
	for (var i =0;i<FROM.length;i++) {
		str = str.replace(FROM[i],TO[i]);
	}
	return str;
}

//---------------------------------------------------------------------------------------------------
//  ���佺�丮/�����̵� �˾� 
//---------------------------------------------------------------------------------------------------
function slidePopup(cid,mid)
{
	w = 888;
	h = 694;
	strUrl	 			 = "/photo/slidePopup?cid="+cid;
	if ( mid != '' ) {
		strUrl+="&mid="+mid;
	}

	if ( navigator.userAgent.toLowerCase().indexOf("safari")!=-1 ) {
		h+=3;
	}


	window.open(strUrl, '', 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,left=100,top=100,width='+w+',height='+h+',copyhistory=0')		 
}
	
function storyPopup(sid,cid,mid)
{
	w = 868;
	h = 696;
	strUrl	 			 = "/photo/storyPopup?sid="+sid+"&cid="+cid;

	if ( mid != '' ) {
		strUrl+="&mid="+mid;
	}

	if ( navigator.userAgent.toLowerCase().indexOf("safari")!=-1 ) {
		h+=3;
	}

	window.open(strUrl, '', 'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,left=100,top=100,width='+w+',height='+h+',copyhistory=0')
}

//---------------------------------------------------------------------------------------------------
// ����ڵ� ���� - stat.js �� ���ǵ�
//---------------------------------------------------------------------------------------------------
function ndrclick(pndrregionid) {

	if ( pndrregionid == '' || pndrregionid == undefined ) {
		return;
	}

	var statClick  = "click_ndr.nate.com/??ndrpageid=NN1&ndrregionid=" + pndrregionid;
	var stamp=new Date().getTime();

	i = new Image();
	i.src = "//statclick.nate.com/stat/statclick.tiff?cp_url=[" + statClick + "]&r="+stamp;
}

//---------------------------------------------------------------------------------------------------
//����ڵ� ����(������������) - stat.js �� ���ǵ�
//---------------------------------------------------------------------------------------------------
function ndrclick2(pndrregionid) {

	if ( pndrregionid == '' || pndrregionid == undefined ) {
		return;
	}

	var statClick  = "click_ndr.nate.com/??ndrpageid=NN22&ndrregionid=" + pndrregionid;
	var stamp=new Date().getTime();

	i = new Image();
	i.src = "//statclick.nate.com/stat/statclick.tiff?cp_url=[" + statClick + "]&r="+stamp;
}

function spondrclick(ndrurl) {
	i = new Image();
	i.src = "//stat.nate.com/stat/stat.tiff?cp_url=[sports_ndr.news.nate.com/" + ndrurl + "/]";
}

function callolap(code) {

	if ( code == '' || code == undefined ) {
		return;
	}

	var olapUrl  = "news_ndr.nate.com" + code;
	//alert(olapUrl);
	i = new Image();
	i.src = "//stat.nate.com/stat/stat.tiff?cp_url=[" + olapUrl + "]";
	i.alt = "olap";
}
//---------------------------------------------------------------------------------------------------
// /����ڵ� ����
//---------------------------------------------------------------------------------------------------

function viewSubLayer(opt,divLayer){
	var divTSubLayer= document.getElementById(divLayer);
	if(opt) {
		divTSubLayer.style.display = "";
 	}
 	else {
		divTSubLayer.style.display = "none";
 	}
	
}

function showSubLayer(divLayer){
	var divTSubLayer= document.getElementById(divLayer);
	
	if (divTSubLayer.style.display != "none") {
		divTSubLayer.style.display = "none";
	} else {
		divTSubLayer.style.display = "";
	}
}

// �˾�â���� �θ�â ��ũ �̵���Ű�� �˾�â �ڵ� ����(ũ�� ������ ������..v
function moveNclose(redirect) {
	if ( opener != null ) {
		if ( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 ) {
			if (  opener.parent != null ) { 
				opener.parent.location.href=redirect;
			}
			self.close();
		} else {
			opener.location.href=redirect;
			self.close();
		}
	}
}

//---------------------------------------------------------------------------------------------------
// ���ڼ� �ڸ���
//---------------------------------------------------------------------------------------------------
function strCut(str,len,end,bByte) {
	var byte = 0;
	var nEnd = end.length;

	if (bByte) {
		for (var i=0; i<str.length; i++) {
			byte += (str.charCodeAt(i) > 128) ? 2 : 1;
			if ( byte > len+nEnd ) {
				return str.substring(0,i)+end;
			}
		}
	} else {
		if ( str.length > len+nEnd ) {
			return str.substring(0,len)+end;
		} 	
	}
	return str;
}

function checkSelect(id) {
	var elem = document.getElementById(id);
	if ( elem ) {
		elem.checked = true;
	}
}

function checkLen(obj,len) {
	var byte = 0;
	var str = obj.value;
 
	for (var i=0; i<str.length; i++) {
		byte += (str.charCodeAt(i) > 128) ? 2 : 1;
	}

	if ( byte > len ) {
		alert("�ִ� "+len+"Byte ���� �Է� �����մϴ�.");
		obj.value = strCut(str,100,'',true);
		obj.focus();
		return false;
	}
	return true;
}

//---------------------------------------------------------------------------------------------------
// Snb ���� 
//---------------------------------------------------------------------------------------------------
var AC_FL_RunContent = 0;
var bMouseOver = false;
var nWeatherCur = 0;

// Snb ���� Base Flash �ε�
function thisMovie(movieName)
{
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[movieName];
	} else {
		return document[movieName];
	}
}

// Snb ���� ������ ����
function changeIcon(link,id,area)
{
	thisMovie("WeatherIcon").title = "["+area+"] ���� �ٷΰ���";
    thisMovie("WeatherIcon").change(link, id);
}

// Snb ���� �Ѹ�
function rollSnbWeather() {
	if ( !bMouseOver ) {

	if ( nWeatherCur >= snbCnt-1) {
		nWeatherCur = 0;
	} else { 
		nWeatherCur++;
	}

	var link = snbWeather[nWeatherCur]['link'];
	var icon = snbWeather[nWeatherCur]['icon'];
	var area = snbWeather[nWeatherCur]['area'];
	var temp = snbWeather[nWeatherCur]['temp'];

	var textDiv = document.getElementById('snbWeatherText');
	var date = new Date();
	var rYoil = ['��','��','ȭ','��','��','��','��'];
	var month = date.getMonth()+1;
	if ( date.getDate() > 9 ) {
		var today = month+"."+date.getDate()+".";
	} else {
		var today = month+".0"+date.getDate()+".";
	}
	var yoil = rYoil[date.getDay()];
	var str = "<p><a href=\""+link+"\" title=\"["+area+"] ���� �ٷΰ���\"><span><em>"+today+"</em>"+yoil+"</span> "+area+" <em>"+temp+"</em>&deg;C</a></p>";
	textDiv.innerHTML = str;
	changeIcon(link,icon,area);
	}
	setTimeout("rollSnbWeather()",2000);
}

/**
 * @desc �� ����� ��� �˸� �ޱ� : ����Ʈ�� �˸���
*/
function openSetPopupNATE(page,force) {
	if ( (force && force=='force') || loginCheck() ) {
		var sid = 2;
		window.open("//nateonalarm.nate.com/interface/check_connect.php?service_id="+sid, "NateonAlarm","toolbar=no,status=no,menubar=no, scrollbars=no,resizable=no,width=430,height=480");
	} else {
		if ( page == 'comment' ) {
			checkLoginIframe();
		} else {
			checkLogin();
		}
	}
}

// MSIE �̹��� �����Ÿ� ����
try {
	if (navigator.appVersion.indexOf("MSIE") != -1) document.execCommand('BackgroundImageCache', false, true); 
} catch(e) {}

/*
** desc : �Է� �� �Է°� üũ
*/
function input_check(check_string)
{
	var	result = '';
	var regExg =  /[^a-z|A-Z|0-9|��-��|��-��|��-��|\|\&\!\^\,\s]/;
	for ( var i =0 ; i <check_string.length ; i ++ ) {
		var char = check_string.charAt(i);
		if ( !regExg.test(char) ) {
			continue;
		} else {
			result = char;
			break;
		}
	}
	return result;
}

function openHelp(mode) 
{
	var url = '';

	if ( mode == 'pocket' ) {
		url = '//comm.news.nate.com/enews/noticeView?bbs_grp_gb=NOTICE&bbs_sq=299&ctgr_cd=N&post_sq=2213602&page=1';
	} else if ( mode == 'rank' ) {
		url = '//comm.news.nate.com/enews/noticeView?bbs_grp_gb=NOTICE&bbs_sq=299&ctgr_cd=N&post_sq=2213597&page=1';
	} else if ( mode == 'keyword') {
		url = '//comm.news.nate.com/enews/noticeView?bbs_grp_gb=NOTICE&bbs_sq=299&ctgr_cd=N&post_sq=2213596&page=1';
	}

	if ( url != '' ) {
		document.location.href=url;
	}

}

/*
** desc : �ý��� ������
** sStart : yyyymmddhhii, sEnd : yyyymmddhhii
*/
function alertSystemCheck(sStart,sEnd) {
	var sStr = '���� �������� ���� ����� ��� �����˴ϴ�.';

	if ( sStart != '' && sEnd != '' ) {

		sStr+= '\n(';

		var sSMonth	= sStart.substring(4,6);
		var sSDay	= sStart.substring(6,8);
		var sSHour  = sStart.substring(8,10);
	
		var sEMonth	= sEnd.substring(4,6);
		var sEDay	= sEnd.substring(6,8);
		var sEHour  = sEnd.substring(8,10);

		var sSStr = '';
		var sEStr = '';

		if ( sSMonth == sEMonth && sSDay == sEDay ) {
			sSStr+= sSMonth + '/';
			sSStr+= sSDay + ' ';
        } else {
			sSStr+= sSMonth + '/';
			sEStr+= sEMonth + '/';
			sSStr+= sSDay + ' '; 
			sEStr+= sEDay + ' ';
		}

		sSStr+= sSHour+'��';
		sEStr+= sEHour+'��';
		sStr+= sSStr+ " ~ " + sEStr;

		sStr+= ')';
	}
	alert(sStr);
}


/*
** desc :�ش� id �� �Ӽ��� ����
** @id,@attr,@value
*/
function setValueById(id,attr,value) {
	var eTarget = document.getElementById(id);
	if ( attr == 'class' && navigator.appVersion.indexOf("MSIE") != -1 ) {
		attr = 'className';
	}
	if ( eTarget != undefined ) {
		eTarget.setAttribute(attr,value);
	}
}

/*
** desc :�ش� id �� �Ӽ��� ��������
** @id,@attr
*/
function getValueById(id,attr) {
	var eTarget = document.getElementById(id);
	if ( eTarget != undefined ) {
		if ( eTarget.getAttributeNode(attr) ) {
			return eTarget.getAttributeNode(attr).value;
		} else {
			return eTarget.getAttribute(attr);
		}
	}
}

/*
** desc :�ش� id �� innerHTML ����
** @id,@html str
*/
function appendHtmlById(id,str) {
	var eTarget = document.getElementById(id);
	if ( eTarget != undefined ) {
		eTarget.innerHTML = str;
	}
}

/*
** desc : ���� Tab �ѹ� cookie�� ����
** @tab
*/
function setRightTab(id) {
	if ( id && id != '' ) {
		setCookie("right_tab",id,null,'/','news.nate.com');
	}
}

/*
** desc : login check
** 		: textGNB �Լ� call �ϰų� cookie�� �о ���
*/
function loginCheck() {

	var bLogin = false;

	try {
		// NateTextGNB ��� �ϴ� �������� 
		bLogin = _NATE_SCRIPT_DATA.myLogin;
	} catch(e) {
		var name = GetCookie("n_");
		if ( name != null &&  name.length > 0 ) {
			bLogin = true;
		}
	}
	return bLogin;

}

function number_format (number, decimals, dec_point, thousands_sep) {
    // Formats a number with grouped thousands  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/number_format
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://getsprink.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +     bugfix by: Howard Yeend
    // +    revised by: Luke Smith (http://lucassmith.name)
    // +     bugfix by: Diogo Resende
    // +     bugfix by: Rival
    // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
    // +   improved by: davook
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Jay Klehr
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Amir Habibi (http://www.residence-mixte.com/)
    // +     bugfix by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +      input by: Amirouche
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: number_format(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: number_format(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: number_format(1234.5678, 2, '.', '');
    // *     returns 3: '1234.57'
    // *     example 4: number_format(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: number_format(1000);
    // *     returns 5: '1,000'
    // *     example 6: number_format(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: number_format(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: number_format(67000, 5, ',', '.');
    // *     returns 8: '67.000,00000'
    // *     example 9: number_format(0.9, 0);
    // *     returns 9: '1'
    // *    example 10: number_format('1.20', 2);
    // *    returns 10: '1.20'
    // *    example 11: number_format('1.20', 4);
    // *    returns 11: '1.2000'
    // *    example 12: number_format('1.2000', 3);
    // *    returns 12: '1.200'
    // *    example 13: number_format('1 000,50', 2, '.', ' ');
    // *    returns 13: '100 050.00'
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

/*
* @desc : add onload event
*/
function addLoadEvent (func) {
	var oldonload = window.onload;

	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

/*
* @desc : check Ipad
*/
function isiPad() {
	var uagent = navigator.userAgent.toLowerCase();
	if ( uagent.search('ipad') > -1 ) {
		return true;
	}
	return false;
}


/*
* @desc : check Androdid
*/
function isAndroid() {
	var uagent = navigator.userAgent.toLowerCase();
	if ( uagent.search('android') > -1 ) {
		return true;
	}
	return false;
}

/*
* @desc : set Ifr height
*/
function setIfrHeight(obj,height) {
	try {
		var doc = obj.contentDocument || obj.contentWindow.document;
		if (doc.location.href == 'about:blank') {
			obj.style.height = minHeight+'px';
			return;
		}
		obj.style.height = height + 'px';
	} catch (e) { 
		//alert(e);
	}
}

/*
* @desc : right tab menu
*/
function DisplayTabMenu(cnt, mdiv, mclass, cdiv, index, tab_id) {
	for(i = 1; i <= cnt; i++) {
		if(index == i) {
			thisPart = document.getElementById(mdiv + index);
			thisPart.className = mclass;
		} else {
			otherPart = document.getElementById(mdiv + i);
			otherPart.className = "";
		}
	}
	if ( document.getElementById(tab_id) ) {
		document.getElementById(tab_id).className = 'subTab subtab0'+index;
	}
	DisplayPart(cnt,cdiv,index);
}

function setPNG24(obj) {
	// ie6 ������ ����
	if	(document.all && !window.XMLHttpRequest ) {
		obj.width=obj.height=1;
		obj.className=obj.className.replace(/\bPNG24\b/i,'');
		obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
		obj.src='about:blank';
		return '';
	}
}

function blankImg2(imageObj,width,height,thumbSize) {
	imageObj.src	= "//nimg.nate.com/ui/uidev/images/icon/vod_detImg.gif";
}

// ui �Ѹ� �ߴܿ�
var btnPlayStop = function(elem){
	if(elem.className == 'btnPlayStop btn_stop'){
		elem.className = 'btnPlayStop btn_play';
		elem.childNodes[0].innerHTML='���'
	}else{
		elem.className = 'btnPlayStop btn_stop';
		elem.childNodes[0].innerHTML='����'
	}
}

 
//---------------------------------------------------------------------------------------------------
// �������̹��� url(//thumbnews.nateimg.co.kr/...) ���� ���� ������ �̹����� ������ �Ҵ��� ���� �Լ�
//---------------------------------------------------------------------------------------------------
function resizeThumbImg(imageObj, thumbSize) {
	if ( typeof imageObj !== 'undefined' && typeof thumbSize !== 'undefined' ) {
		
		// CMS(/etc/cms/) �̹����� ������¡ PASS
		var imgSrc = imageObj.src;
		var regExp = new RegExp(/\/etc\/cms/i);
		if ( regExp.test(imgSrc) ) { 
			return;
		}
		
		// �����̹��� ũ�Ⱑ ���� �̹��� ũ�⺸�� ū��� �����̹����� thumbSize �Ҵ�
		if ( imageObj.width > imageObj.height ) {
			// news90 (width:90, height:70)
			imageObj.width = (thumbSize === 70) ? 90 : thumbSize;
		} else {
			imageObj.height = thumbSize;
		}
	}
}

//---------------------------------------------------------------------------------------------------
//�̹��� �Ѹ� ��ü
//---------------------------------------------------------------------------------------------------
var Rolling = function(params) {
	this.rollData	= params.rollData || new Array();			// �Ѹ� ������.
	this.rollID		= params.rollID || null;					// �Ѹ� ���� ID.
	this.showCnt	= params.showCnt || 2;						// �� �������� �������� �̹��� ����.

	this.rollTotCnt	= this.rollData.length;						// �Ѹ� ������ �� ����.
	this.startPage	= 1;										// ���� ������.
	this.totalPage	= parseInt(this.rollTotCnt/this.showCnt);	// �� ������.
	
	// ���� ����
	this.drawPrev = function() {
		// �Ѹ� ������ �迭 �����.
		for (var i=0; i<this.showCnt; i++) {
			this.rollData.unshift(this.rollData.pop());
		}

		for (var i=this.showCnt-1; i>=0; i--) {
			if (!this.rollData[i]) continue;
			
			if (document.getElementById('ROLL_IMG_'+this.rollID+'_'+i)) document.getElementById('ROLL_IMG_'+this.rollID+'_'+i).innerHTML = this.rollData[i].imgSrc;
			if (this.rollData[i].titSrc != '') {
				if (document.getElementById('ROLL_TXT_'+this.rollID+'_'+i)) document.getElementById('ROLL_TXT_'+this.rollID+'_'+i).innerHTML = this.rollData[i].titSrc;
			}
			
			
			if (i == 0) {
				if (this.startPage <= 1) {
					this.startPage = this.totalPage;
				} else {
					this.startPage --;
				}
	
				if (document.getElementById('ROLL_PAGE_'+this.rollID)) document.getElementById('ROLL_PAGE_'+this.rollID).innerHTML = '<strong>' + this.startPage + '</strong>/'+ this.totalPage;	
			}
		}
	}

	// ���� ����
	this.drawNext = function() {
		// �Ѹ� ������ �迭 �����.
		for (var i=0; i<this.showCnt; i++) {
			this.rollData.push(this.rollData.shift());
		}
		
		for (var i=0; i<this.showCnt; i++) {
			if (!this.rollData[i]) continue;
			
			if (document.getElementById('ROLL_IMG_'+this.rollID+'_'+i)) document.getElementById('ROLL_IMG_'+this.rollID+'_'+i).innerHTML = this.rollData[i].imgSrc;
			if (this.rollData[i].titSrc != '') {
				if (document.getElementById('ROLL_TXT_'+this.rollID+'_'+i)) document.getElementById('ROLL_TXT_'+this.rollID+'_'+i).innerHTML = this.rollData[i].titSrc;
			}
			
			
			if (i == (this.showCnt-1)) {
				if (this.startPage >= this.totalPage) {
					this.startPage = 1;
				} else {
					this.startPage ++;
				}
	
				if (document.getElementById('ROLL_PAGE_'+this.rollID)) document.getElementById('ROLL_PAGE_'+this.rollID).innerHTML = '<strong>' + this.startPage + '</strong>/'+ this.totalPage;	
			}						
		}
	}

	// ���� ������ ��������
	this.randomStartPage = function() {
		var randomNum	= Math.floor(Math.random() * 10) % this.totalPage;
		this.startPage	= (randomNum + 1);

		for(var i = 1; i <= (randomNum * this.showCnt); i++) {
			this.rollData.push(this.rollData.shift());
		}

		for(var i = 0; i < this.showCnt; i++) {
			if(this.rollData[i].imgSrc != null) document.getElementById('ROLL_IMG_'+this.rollID+'_'+i).innerHTML = this.rollData[i].imgSrc;
			if ( this.rollData[i].titSrc != '' ) {
				if(this.rollData[i].titSrc != null) document.getElementById('ROLL_TXT_'+this.rollID+'_'+i).innerHTML = this.rollData[i].titSrc;
			}
			
		}

		if (document.getElementById('ROLL_PAGE_'+this.rollID)) document.getElementById('ROLL_PAGE_'+this.rollID).innerHTML = '<strong>' + this.startPage + '</strong>/'+ this.totalPage;	
	}
}

//---------------------------------------------------------------------------------------------------
//ũ�Һ����� : alert()/confirm() for cross origin iframes (overriding)
//---------------------------------------------------------------------------------------------------
var top_alert = window.alert;
window.alert = function(msg) {
	if ( self == top ) {
		return top_alert(msg);
	} else {
		document.domain='nate.com';
		return top.alert(msg);
	}
}

var top_confirm = window.confirm;
window.confirm = function(msg) {
	if ( self == top ) {
		return top_confirm(msg);
	} else {
		document.domain='nate.com';
		return top.confirm(msg);
	}	
}


