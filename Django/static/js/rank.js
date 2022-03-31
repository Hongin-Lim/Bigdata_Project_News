//===================================================================================================
// FILE : js/rank.js
// DESC : ���� ���� ���� �Լ�
// AUTH : 2009.07.09 k1k2k3 : common.js���� �и�
// MODI : (NEWS-5306) ��ũ�� ���� ����.
//===================================================================================================

/*
* ���������������� ȯ������ ����
*/
function rankScore(nPop, nCmt, nUp) {

	// ���� ���� ���� ���� ����
	var nPop   = isNaN(parseInt(nPop))   ? 0 : parseInt(nPop);
	var nCmt   = isNaN(parseInt(nCmt))   ? 0 : parseInt(nCmt);
	var nUp    = isNaN(parseInt(nUp)) 	 ? 0 : parseInt(nUp);

	// ��ȸ
	if ( nPop > arrRank['DPOP']['OP_3'] ) {
		nPop = 100
 	} else {
		nPop = nPop*(arrRank['DPOP']['OP_2']/arrRank['DPOP']['OP_1']);
	}

	// ���
	if ( nCmt > arrRank['CMT']['OP_3'] ) {
		nCmt = 100;
	} else if ( nCmt < 0 ) {
		nCmt = 0;
	} else {
		nCmt = nCmt*(arrRank['CMT']['OP_2']/arrRank['CMT']['OP_1']);
	}

	// �÷�
	if ( nUp > arrRank['UP']['OP_3'] ) {
		nUp = 100;
	} else {
		nUp = nUp*(arrRank['UP']['OP_2']/arrRank['UP']['OP_1']);
	}

	var nScore = parseInt((nPop+nCmt+nUp)/3);
	var rRT = new Array(nPop, nCmt, nUp, nScore);

	return rRT;
}

/*
* ���ɴ��� �󼼺��� ���̾� Display
*/
function rankDisplay(nPop, nCmt, nUp, sRegDtm, bToggle, bClose) {

	var rPoint = rankScore(nPop, nCmt, nUp);
	
	document.getElementById('popBar').style.width = rPoint[0]+"%";
	document.getElementById('popNo').innerHTML	  = parseInt(rPoint[0]); 

	if ( nCmt == -1 ) {
		document.getElementById('cmtBar').style.width = "0%";
		document.getElementById('cmtNo').innerHTML	  = "blind";
	} else {
		document.getElementById('cmtBar').style.width = parseInt(rPoint[1])+"%";
		document.getElementById('cmtNo').innerHTML	  = parseInt(rPoint[1]);
	}
 
	if ( nUp == -1 ) {
		document.getElementById('upBar').style.width = "0%";
		document.getElementById('upNo').innerHTML	 = "blind";
	} else {
		document.getElementById('upBar').style.width = parseInt(rPoint[2])+"%";
		document.getElementById('upNo').innerHTML	 = parseInt(rPoint[2]);
	}
 
	document.getElementById('scoreBar').style.width = parseInt(rPoint[3])+"%";
	document.getElementById('scoreNo').innerHTML	= parseInt(rPoint[3]);

	document.getElementById('regDtm').innerHTML 	= "<strong>���� ������Ʈ</strong> "+sRegDtm; 

	var rankDetail = document.getElementById('rankDetail');
	var wraper = document.getElementById('contentsWraper');

	if ( bToggle ) {
		if(rankDetail.style.display != "none") { 
			rankDetail.parentNode.style.zIndex = '';
			rankDetail.style.zIndex = '';
			rankDetail.style.display = "none";
			if ( wraper ) {
				wraper.style.zIndex = '';
			}
		} else {
			rankDetail.parentNode.style.zIndex = '2000';
			rankDetail.style.zIndex = '2001';
			rankDetail.style.display = "block";
			if ( wraper ) {
				wraper.style.zIndex = '1000';
			}
		}
	} else {
		if ( !bClose || bClose == undefined ) {
			// �������
			rankDetail.style.display = "block";
		} else {
			// ������ �������� Ȯ��� �������� ���� close
			rankDetail.parentNode.style.zIndex = '';
			rankDetail.style.zIndex = '';
			rankDetail.style.display = "none";
			if ( wraper ) {
				wraper.style.zIndex = '';
			}
		}
	}
}

/*
* ���ɴ��� �󼼺��� ���̾� ����  
*/
function rankDetail(elem,nPop,nCmt,nUp,sRegDtm,event,where) {

	var rankDetail = document.getElementById('rankDetail');
	var pElem = elem.parentNode;

	// �̹� ���� �ִ� ���̾� ���� ���
	if ( rankDetail.style.display != 'none' ) {
		// �θ�Node���� Li zIndex�� ������ ��� ��
		if ( where != 'newshome' ) {
			rankDetail.parentNode.parentNode.parentNode.style.zIndex = '';
		}
		// close
		rankDetail.style.display = 'none';

		if ( pElem.className.substr(-1,2) == rankDetail.className ) {
			return;
		}
	}

	// �� ���� ���� Div�� ���� Wrapper
	var rankWrap = document.createElement('dd');
	rankWrap.id = 'rankPositioner';	
	rankWrap.className = 'rankDetailView';

	// �̹� ������ ������ ���� �ϰ� �ٽ� �߰�
	var rDd = elem.getElementsByTagName('dd').length;
    for ( var i = 0; i<rDd.length; i++) {
		if ( rDd[i].id == 'rankPositioner') {
			elem.removeChild(rDd[i]);
		}
    }

	elem.parentNode.appendChild(rankWrap);
	rankWrap.style.position = 'absolute';

	if ( pElem.parentNode.className.indexOf('mduSubjectList') < 0 ) {
		if ( pElem.parentNode.nodeName == 'LI' && where != 'newshome') {
			pElem.parentNode.style.zIndex = 1;
		}
		rankWrap.style.top = "16px";
		rankWrap.style.left = "25px";
	}

	//�������� Display.
	rankWrap.appendChild(rankDetail);
	rankDetail.className = pElem.className.substr(-1,2);
	rankDetail.style.position = 'absolute';

	rankDisplay(nPop, nCmt, nUp, sRegDtm, false);
}

