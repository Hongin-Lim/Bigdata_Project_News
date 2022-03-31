function sendSNS(artc_id, mid, ctgr_cd, sns_gb, force_write) {
	var title = document.getElementById('artc_title').value;
	if(!title) {
		title = document.getElementById('artc_title').childNodes[0].title;
	}
	var articleURL = document.location.href;
	articleURL = articleURL.replace("/vodView?", "/view/");
	articleURL = refineSnsShareUrl (articleURL);
	
	//���̽��Ϻ������ newscomm���������� ������.
	_sendSNS(sns_gb, articleURL, title);
}

function sendViewSNS(artc_id, mid, ctgr_cd, sns_gb, force_write) {
	var title = document.getElementById('artc_title').value;
	if(!title) {
		title = document.getElementById('artc_title').childNodes[0].title;
	}
	var articleURL = document.location.href;
	articleURL = refineSnsShareUrl (articleURL);	
	
	if(sns_gb == 'fb') {
		articleURL = articleURL.replace(/return_sq=([0-9]*)&?/gi,"").replace(/#ifr_reple/gi,"").replace(/.\?$/,"").replace(/.&$/,"").replace(/\?&/,"?");
	}
	_sendSNS(sns_gb, articleURL, title);
}

/**
 * @desc Ư�������������� ����
 * @param sns_gb SNS����(fb:���̽���, tw:Ʈ����)
 * */
function sendEtcSNS( sns_gb, event ) {
	var articleURL = document.location.href;
	var title = '';

	if ( event == 'mlb' ) {
		articleURL = '//sports.news.nate.com/video/mlb';
		title = '����Ʈ���� MLB'
	} else if ( event == 'idol' ) {
		articleURL = '//news.nate.com/ent/idol24';
		title = '���� �뼼! ���� ���̵��� �� �ִ�!\n�����ϴ� ���̵� �ҽ��� \'���̵�24��\'���� �Ѵ��� Ȯ���غ�����! ';
	} else if ( event == 'epl' ) {
		articleURL = '//sports.news.nate.com/video/epl';
		title = '����Ʈ �����̾�� ����'
	} else if ( event == 'lfp' ) {
		articleURL = '//sports.news.nate.com/video/lfp';
		title = '����Ʈ �����޶󸮰� ����'
	} else if ( event == 'drama' ) {
		articleURL = '//comm.news.nate.com/2014drama';
		title = '2014 �����󸶾���� ��Ƽ�� �α��! ����Ʈ���� ���� ��ǥ���ּ���!(~8/3)'
	} else if ( event == 'vote2016' ) {
		articleURL = '//news.nate.com/vote2016/home/';
		title = '[����Ʈ] �� 20�� ��ȸ�ǿ� ����'
	} else if ( event == 'vote2017' ) {
		articleURL = '//news.nate.com/vote2017/';
		title = '[����Ʈ] �� 19�� ����� ����'
	} else if ( event == 'vote2018' ) {
		articleURL = '//news.nate.com/vote2018/';
		title = '6.13 ��7ȸ �����������漱�� : ����Ʈ ����'
		if(sns_gb == 'tw'){
			title = title + ' \r\n�ֿ䴺��, �ĺ���, ����ǥ �� �پ��� ������ Ȯ���ϼ���!'
		}
	} else if ( event == 'vote2020' ) {
		articleURL = '//news.nate.com/vote2020/';
		title = '4.15 �Ѽ� Ư�� : ����Ʈ����'
		if(sns_gb == 'tw'){
			title = title + ' \r\n��21�� �Ѽ��� ��� ������ �Ѵ��� Ȯ���ϼ���!'
		}
	}
	
	articleURL = refineSnsShareUrl (articleURL);
	
	_sendSNS(sns_gb, articleURL, title);
}

function sendSNSURL(url, sns_gb, title) {
	url = refineSnsShareUrl (url);

	if ( title == undefined ) {
		_sendSNS(sns_gb, url, '����Ʈ ����');
	}  else {
		_sendSNS(sns_gb, url, title);
	}
}

function _sendSNS(sns_gb, articleURL, title) {
	articleURL = refineSnsShareUrl(articleURL);
	var url = '';
	if(sns_gb == 'fb') {
		var w = 804;
		var h = 574;
		url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(articleURL);
		var g=(screen.width)?(screen.width-w)/2:0;
		var n=(screen.height)?(screen.height-h)/2:0;
		
		OpenPopup(url, w, h, "_blank", "top="+n+",left="+g + ",location=no,resize=yes,scrollbars=yes,resizable=yes");
	} else if(sns_gb == 'tw') {
		
		var httpObject = false;
		if(window.ActiveXObject) {
			httpObject = new ActiveXObject("Microsoft.XMLHTTP");
		} else if(window.XMLHttpRequest) {
			httpObject = new XMLHttpRequest();
		}
		
		if(httpObject) {
			httpObject.open("GET", "/SNS/makeShortenUrl?url="+encodeURIComponent(articleURL), true);
			httpObject.onreadystatechange = function() {
				if(httpObject.readyState == 4) {
					var w = 640;
					var h = 400;
					var g=(screen.width)?(screen.width-w)/2:0;
					var n=(screen.height)?(screen.height-h)/2:0;
					
					var text = encodeURIComponent(title + " \n" + httpObject.responseText).replace(/[!'()*]/g, escape).replace(/%27/g,'%EF%BC%87').replace(/%22/g,'%EF%BC%82');
					url = "https://twitter.com/intent/tweet?text=" + text;
					OpenPopup(url, w, h, "_blank", "top="+n+",left="+g + ",location=no,resize=yes,scrollbars=yes,resizable=yes");
				}
			};
			httpObject.send(null);
		}
	} else if(sns_gb == 'yz') {
		var w = 450;
		var h = 400;
		var g=(screen.width)?(screen.width-w)/2:0;
		var n=(screen.height)?(screen.height-h)/2:0;
		
		url = "http://yozm.daum.net/api/popup/post?prefix=" + encodeURI(title) + "&link=" + encodeURI(articleURL);
		OpenPopup(url, w, h, "_blank", "top="+n+",left="+g + ",location=no,resize=yes,scrollbars=yes,resizable=yes");
	} else if(sns_gb == 'nt') {
		jQuery.getScript('//api.nateon.nate.com/js/note/note_common_v2_1_1.min.js');
		enc_note='X4vK-D_8SHRfmodZ9thd-c9rxorJ1pzhwsaVF9eo074JFKuqRS9wD1MsCyjrzn-4fGiygy-KPOyaDC1LGOB70f7aOSMJJ691SRSQc0NjQBc';
		send_note();
	} else if(sns_gb == 'cy'){
		
		var w = 400;
		var h = 360;
		url = "http://csp.cyworld.com/nadoo.php?url=" + encodeURIComponent(articleURL);
		
		OpenPopup(url, w, h, "_blank", "resize=noscrollbars=no,resizable=no");
	} else if(sns_gb == 'wb'){
		var w = 450;
		var h = 400;
		url = "http://v.t.sina.com.cn/share/share.php?title="+encodeURIComponent(title) + "&url=" + encodeURIComponent(articleURL);
		var g=(screen.width)?(screen.width-w)/2:0;
		var n=(screen.height)?(screen.height-h)/2:0;
		
		OpenPopup(url, w, h, "_blank", "top="+n+",left="+g + ",location=no,resize=yes,scrollbars=yes,resizable=yes");
	}
}

// Ʈ���� ���۽� �θ� url ����
function setParentUrl() {
  document.getElementById('p_url').value = parent.location.href;
}

// ��� �Է�â ���� ������Ʈ
// ta : textarea ��ü
// tacntid : textarea �ڼ� ǥ���� ���� ��ü id
// limit : ���� ���� ��
function count_sns_textarea(textareaid, tacntid, titleid, titlechk_id, limit) {
	var ta = document.getElementById(textareaid);
	var ta_cnt_value = ta.value.length;
	var url_txt = "http://bit.ly/e044kX "; // �ڿ� ���� ����

	if(!bCmtTextAreaInit) {
		ta_cnt_value = 0;
	}

	var title_cnt = 0;
	var url_cnt = url_txt.length;

	if(titlechk_id != '') {
		var title_chk = document.getElementById(titlechk_id);
		if(title_chk.checked == true && titleid != '') {
			var title = document.getElementById(titleid).value;
			title_cnt = title.length; // ���� ����
		}
	}

	var tacnt = document.getElementById(tacntid);
	if ( limit == null ) {
		limit = 1000;
	}
	limit = limit - title_cnt - url_cnt;

	if ( ta_cnt_value > limit ) {
		alert('��� ������ '+limit+'�� ������ �Է��Ͻ� �� �ֽ��ϴ�.');
		ta.value=ta.value.substr(0,limit);
		ta_cnt_value = ta.value.length;
	}
	tacnt.innerHTML = ta_cnt_value + title_cnt + url_cnt;
}

function clickSendNewsFl(checkObj) {
	var optionDiv = document.getElementById('optionDiv');
	if(checkObj.checked == true) {
		optionDiv.style.display = "block";
	} else {
		optionDiv.style.display = "none";
	}
}

// ��� �Է�â ����
// ta : textarea ��ü
var ta_sns_sending = false;
function check_sns_textarea(ta) {
	
	bResult = init_textarea(ta);
	if (!bResult) return false;
	
	sContent = ta.value; 
	sContent = sContent.replace(/\u3000/g, "");
	//sContent = sContent.replace(/\&nbsp;|&nbsp/g, "");
	
	if ( trim(sContent).length > 1000 ) {
		alert('��� ������ 1000�� ������ �Է��Ͻ� �� �ֽ��ϴ�.');
		ta.value=ta.value.substr(0,1000);
		document.getElementById('tacnt').innerHTML = ta.value.length;
		return false;
	} else if ( ta_sns_sending == true ) {
		alert('��ø� ��ٷ� �ּ���.');
		return false;
	} else {
		ta_sns_sending = true;
		return true;
	}

	return false;
}

function send(objContent) {
	var frm = document.connecting_send_frm;
	if(check_sns_textarea(objContent) == true) {
		if( (frm.ctgr_cd.value == 61 || frm.ctgr_cd.value == 62) && trim(objContent.value) == '') { // �Ѽ�2012
			alert('������ �Է����ּ���.');
			if(ta_sns_sending) ta_sns_sending = false;
			return false;
		}
		
		if(frm.sns_title_fl.checked == false && trim(objContent.value) == '' && frm.reply_fl.checked == false) {
			alert('������ üũ�ϰų� ������ �Է����ּ���.');
			if(ta_sns_sending) ta_sns_sending = false;
			return false;
		} else if(frm.reply_fl.checked == true && trim(objContent.value) == '') {
			alert('������ �Է����ּ���.');
			if(ta_sns_sending) ta_sns_sending = false;
			return false;
		} else if((frm.ctgr_cd.value == 61 || frm.ctgr_cd.value == 62) && trim(objContent.value) == '') {
			alert('������ �Է����ּ���.');
			if(ta_sns_sending) ta_sns_sending = false;
			return false;
		}
		frm.submit();
		return true;
	} 
	return false;
}

// ����Ʈ�� ��Ÿ�±������� ������ ����Ʈ�� ����
function sendNateon(title, summary, url, thumbnail, sitename){
	var objTag = document.getElementsByName('nate:title')[0];
	if( objTag != undefined){
		objTag.setAttribute("content", title);
	}
	objTag = document.getElementsByName('nate:description')[0];
	if( objTag != undefined){
		objTag.setAttribute("content",  summary);
	}
	
	objTag = document.getElementsByName('nate:url')[0];
	if( objTag != undefined){
		url = refineSnsShareUrl (url) 
		objTag.setAttribute("content",  url);
	}
	
	objTag = document.getElementsByName('nate:image')[0];
	if( objTag != undefined){
		thumbnail = refineSnsShareUrl (thumbnail) 
		objTag.setAttribute("content",  thumbnail);
	}
	
	objTag = document.getElementsByName('nate:site_name')[0];
	if( objTag != undefined){
		objTag.setAttribute("content",  sitename);
	}
	send_note();
}

//����Ʈ�� �����ϱ�
// 2018.09.05 artwork21c
// 2018.09.13 N4111
function sendNateonNote() {
	var objTag = new Array();
	objTag['url'] = document.getElementsByName('nate:url')[0];
	objTag['image'] = document.getElementsByName('nate:image')[0];
	
	if( objTag['url'] != undefined){
		var url = objTag['url'].getAttribute("content");
		url = refineSnsShareUrl (url) 
		objTag['url'].setAttribute("content",  url);
	}
	
	if( objTag['image'] != undefined){
		var image = objTag['image'].getAttribute("content");
		image = refineSnsShareUrl (image) 
		objTag['image'].setAttribute("content",  image);
	}

	// api.nateon.nate.com/js/note/note_commonv2_0.min.js ���
	send_note();
}

// SNS ������ url �� �����Ѵ�. 
//2018.09.05 artwork21c
function refineSnsShareUrl (url) {
	// �׽�Ʈ�� url �� ���, ���̺�� url�� ���� ó��
	// ex) https://test_news.nate.com/ -> https://news.nate.com/
	url = url.replace(/\/\/[^\.]+-/gi, "//");
		
	// �������� ���� // �� ������� https: �߰�
	if ( url.indexOf("//") === 0 ) {
		url = location.protocol + url;
	}
	
	return url;
}
