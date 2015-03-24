function loadTabs() {
	var aantalLeerlingen = 0;

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = yyyy+'/'+dd+'/'+mm;
	
	for (var i in vllksJson.vllks.vllk) {
		var vllk = vllksJson.vllks.vllk[i];
		//Add tab
		$('#mytabsul').append('<li><a href="#tabs-'+vllk.id+'">'+vllk.name+'</a></li>');

		//Add tab table
		$('#mytabdata').append('<div id="tabs-'+vllk.id+'"><table class="perVak"><div class="printheader">Overzicht van vak "'+vllk.name+'" op ' +today+'</div><tbody><tr><th class="hfirst">Leerling</th></tr></tbody></table></div>');
		
		//Add tab header row
		for (var j in vllk.periode) {
			for (var k in vllk.periode[j].rapport) {
				var rapport = vllk.periode[j].rapport[k];
				if (rapport.name != 'DUMMY') {
					$('#tabs-'+vllk.id).find('tr').append('<th><div>'+rapport.name+'</div><div>'+rapport.date+'</div><div>Op '+rapport.maxPuntBeforeReCalc +' herberekend nr ' + rapport.maxPuntAfterReCalc+'</div></th>');				
					if (aantalLeerlingen == 0 && rapport.leerling != null) {
						var aantalLeerlingen = rapport.leerling.length;
					}
				}
			}
		}
				
		//Add tab leerling rows
		for(var l=0;l<aantalLeerlingen;l++) {
			var llId = l+1;
			$('#tabs-'+vllk.id).find('tbody').append('<tr><td class="hfirst">'+llId+'</td></tr>');
			
			for (var jj in vllk.periode) {
				for (var kk in vllk.periode[jj].rapport) {
					var rapport = vllk.periode[jj].rapport[kk];
					if (rapport.name != 'DUMMY') {
						if (rapport.leerling != null && rapport.leerling.length > l && rapport.leerling[l] != null) {
							var leerling = rapport.leerling[l];	
                            var isLeerlingPuntANumber = leerling.punt.indexOf('A') < 0 && Number(leerling.punt) != 'NaN';
							var puntColor = (!isLeerlingPuntANumber|| Number(leerling.punt.replace(',','.')) >= Number(rapport.maxPuntBeforeReCalc.replace(',','.'))/2) ? "#000000": "#FF0000";
                            var leerlingPuntNormalized = !isLeerlingPuntANumber ? leerling.punt : Math.round10((leerling.punt.replace(',','.') / rapport.maxPuntBeforeReCalc) * rapport.maxPuntAfterReCalc,-1);                            
							$('#tabs-'+vllk.id).find('tr').last().append('<td><div class="leerlingpunt" style="color:'+puntColor+';">'+leerlingPuntNormalized+'</div><div class="comment" style="display:none;">'+leerling.comment+'</div></td>');				
						} else {
							$('#tabs-'+vllk.id).find('tr').last().append('<td><div>N/A</div><div class="comment" style="display:none;">N/A</div></td>');				
						}
					}
				}
			}
		}		
	}
	//Per leerling
	for(var l=0;l<aantalLeerlingen;l++) {
		var llId = l+1;
		//Add tab
		$('#mytabsul').append('<li><a href="#tabs-ll-'+l+'">'+llId+'</a></li>');
		
		var selectedVakken='';
		for (var i in vllksJson.vllks.vllk) {
			if (selectedVakken.length > 0) {
				selectedVakken +=', ';
			}
			selectedVakken +=vllk.name;			
		}
		//Add tab table
		$('#mytabdata').append('<div id="tabs-ll-'+l+'"><div class="printheader">Overzicht van leerling "'+llId+'" op '+today+' voor vakken:'+selectedVakken+'</div><div id="tabs-ll-select">Selecteer één of meerdere (via ctrl-toest) vakken: <select id="select-ll-'+l+'" multiple></select></div><table class="perLeerling"><tbody><tr><th>Vak</th><th>Datum</th><th>Rapport</th><th>Punt</th><th>Commentaar</th></tr></tbody></table></div>');
		
		var rowCounter=0;
		for (var i in vllksJson.vllks.vllk) {
			var vllk = vllksJson.vllks.vllk[i];
			$('#select-ll-'+l).append('<option value="'+i+'" selected>'+vllk.name+'</option>');			
			for (var j in vllk.periode) {
				for (var k in vllk.periode[j].rapport) {
					var rapport = vllk.periode[j].rapport[k];
					if (rapport.name != 'DUMMY') {
						if (rapport.leerling != null && rapport.leerling.length > l && rapport.leerling[l] != null) {
							var leerling = rapport.leerling[l];	
                            var isLeerlingPuntANumber = leerling.punt.indexOf('A') < 0 && Number(leerling.punt) != 'NaN';
							var puntColor = (!isLeerlingPuntANumber|| Number(leerling.punt.replace(',','.')) >= Number(rapport.maxPuntBeforeReCalc.replace(',','.'))/2) ? "#000000": "#FF0000";
                            var leerlingPuntNormalized = !isLeerlingPuntANumber ? leerling.punt : Math.round10((leerling.punt.replace(',','.') / rapport.maxPuntBeforeReCalc) * rapport.maxPuntAfterReCalc,-1);                            
							rowCounter++;
							$('#tabs-ll-'+l).find('tr').last().parent().append('<tr id="vllk-'+i+'-'+rowCounter+'"><td>'+vllk.name+'</td><td>'+rapport.date+'</td><td><div>'+rapport.name+'</div><div>Op '+rapport.maxPuntBeforeReCalc +' herberekend nr ' + rapport.maxPuntAfterReCalc+'</div></td><td><div class="leerlingpunt" style="color:'+puntColor+';">'+leerlingPuntNormalized+'</div></td><td><div class="comment">'+leerling.comment+'</div></td></tr>');				
						}					
					}
				}
			}					
		}
	}

	
	
	
}

var isCommentVisibleNext = false;
function initPopupFields() {
	$('.leerlingpunt').each(function() {
		if (!(isCommentVisibleNext)) {
			$(this).attr("onmouseover","if ($(this).next().text().length > 0) {return overlib($(this).next().text(), DELAY, 0, TIMEOUT, 0 ,BGCOLOR,'#A7C942',FGCOLOR, '#FFFFFF');} else { return void(0);};");
			$(this).attr("onmouseout","return nd();");
		} else {
			$(this).attr("onmouseover","return void(0);");
			$(this).attr("onmouseout","return void(0);");
		}
	});
	isCommentVisibleNext = !isCommentVisibleNext;
}

