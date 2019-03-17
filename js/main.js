
var apiUrl =  "http://www.qrz.co.il/studio/vgromyko.info/projects/api/modapi.php";

var dateFrom = '' ;
var dateTo = '' ; 
var userId = null ;
var userName = '' ;
var countryId = null ;
var countryName = '' ;


function setFrom(thisFrom){
	dateFrom = thisFrom ;
	geLogData(dateFrom,dateTo,userId,countryId);
}
function setTo(thisTo){
	dateTo = thisTo ;
	geLogData(dateFrom,dateTo,userId,countryId);
}
function  getUserName(usrName){
	userName = usrName ;
	$(".loadcontainer").show();
	$.ajax({
		type: 'GET',
		dataType:'json',
		url: apiUrl ,
		data: {   
			'userName' : usrName   
		},
		success: function(logData) {
			$(".loadcontainer").hide();
			if(logData != null){
				getList('usr',logData);
			}
			else{
				userName =  '' ;
				userId = '' ;
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			   
		}
	});

}

function  getCountryName(cntName){
	$(".loadcontainer").show();
	countryName = cntName ;
	$.ajax({
		type: 'GET',
		dataType:'json',
		url: apiUrl ,
		data: {   
			'countryName' : cntName  
		},
		success: function(logData) {
			$(".loadcontainer").hide();
			if(logData != null){
				getList('cnt',logData);
			}
			else{
				countryName =  '' ;
				countryId = '' ;
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			   
		}
	});

}

function getList(typedata ,data ){
	$(".popup").show();
	var outData ='';
	for(var i in data ){
		if(typedata=='cnt'){
			//alert(data[i].cnt_name);
			outData+="<LI onClick=\"setValue('cnt','"+data[i].cnt_id+"','"+data[i].cnt_name+"')\" >"+data[i].cnt_name+"</li>" ;
		}
		else if(typedata=='usr'){
			outData+="<LI onClick=\"setValue('usr','"+data[i].usr_id+"','"+data[i].usr_name+"')\" >"+data[i].usr_name+"</li>" ;
		}
	}
	$(".popup").html(outData);
}

function setValue(typedata ,id,name ){

	if(typedata=='cnt') {
		countryId = id ;
		$("#countryName").val(name);
	}
	else if(typedata=='usr'){
		userId = id ;
		$("#userName").val(name);
	} 
	$(".popup").hide();
	geLogData(dateFrom,dateTo,userId,countryId);
	
}

function geLogData(dateFrom,dateTo,userId,countryId){
	if(dateFrom && dateTo && userId && countryId) {
		$(".content").html(''); 
		$(".loadcontainer").show();
		var dateFrom = $("#dateFrom").val();
		var dateTo = $("#dateTo").val();

		$.ajax({
				type: 'GET',
				dataType:'json',
				url: apiUrl ,
				data: {   
					'dateFrom' : dateFrom ,   
					'dateTo' : dateTo ,
					'userId':userId , 
					'countryId':countryId  
				}, 
				success: function(logData) {
					$(".loadcontainer").hide();
					if(logData != null ){
						$(".loadcontainer").hide();
						var outList = '<table style="border=0"><tr><td colspan=3>======================================</td></tr>';
							outList+= '<tr><th>Date</th><th>Successfully sent</th><th>Failed</th></tr>';
							outList+= '<tr><td colspan=3>======================================</td></tr>';
						
						for(var x in logData.data ){
							outList+= '<tr><td>'+logData.data[x].date + '</td>' ;
							outList+= '<td>'+logData.data[x].pass+ '</td>' ;
							outList+= '<td>'+logData.data[x].fail+'</td></tr>' ; 
						}
						outList+='</table>';
					}
					$(".content").html( outList );
					
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					
				}
		});
	}
	
}

