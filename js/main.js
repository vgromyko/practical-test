
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
				userName =  logData[0].usr_name ;
				userId = logData[0].usr_id ;
				$("#userName").val(userName);
			}
			else{
				userName =  '' ;
				userId = '' ;
			}
			geLogData(dateFrom,dateTo,userId,countryId);
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
				countryName =  logData[0].cnt_name ;
				countryId = logData[0].cnt_id ;
				$("#countryName").val(countryName);
				geLogData(dateFrom,dateTo,userId,countryId);
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

