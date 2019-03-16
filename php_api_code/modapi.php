<?PHP


mysql_connect("localhost","my_user","my_password","my_db");
mysql_select_db("my_db"); 


class ModelLogAgregator {

	function __construct() {
	
	}
	
	public function getLogData($dateFrom,$dateTo,$userId,$countryId){

		$user = $this->getUser($userId) ;
		$country = $this->getCountry($countryId) ;

		$outLog['title'] = array(
				'Country'=> $country['cnt_name'],
				'User'=>  $user['usr_name'],
				'From'=>  $dateFrom,
				'To'=>  $dateTo 
			);

	
		$sql="	SELECT DATE_FORMAT( log_created ,'%Y-%m-%d') as adate, 
				SUM( IF( log_success = 1, 1, 0 ) ) as pass , 
				SUM( IF( log_success = 0, 1, 0 ) ) as fail
				FROM send_log sl

				LEFT JOIN users usr ON  usr.usr_id = sl.usr_id 
				LEFT JOIN numbers nbr ON nbr.num_id = sl.num_id
				LEFT JOIN countries cnt ON cnt.cnt_id = nbr.cnt_id  

				WHERE  log_created >= '$dateFrom' AND  log_created <= '$dateTo' AND sl.usr_id = '$userId' AND nbr.cnt_id = '$countryId' 
				GROUP BY  DATE_FORMAT( log_created ,'%Y-%m-%d')   
				ORDER BY log_created " ;

		$result =  mysql_query( $sql );
		
		if ( $result) {
 
			while ($row = mysql_fetch_assoc($result)) {
 
				$outLog['data'][] = array(
						'date'=> $row['adate'],
						'pass'=> ($row['pass']) ? $row['pass'] : '-' ,
						'fail'=> ($row['fail']) ? $row['fail'] : '-'
				) ;

			}
		}

		return $outLog ;
		
	}

	public function getCountriesByName($countryName){
	
		$sql="SELECT cnt_id, cnt_code, cnt_title    
		     FROM countries  
			 WHERE cnt_title LIKE '$countryName%'
			 ORDER BY  cnt_title
			" ;
			 
		$result =  mysql_query( $sql );
		while ($row = mysql_fetch_assoc($result)) {
			$countryList[]= array('cnt_id'=>$row['cnt_id'],'cnt_code'=>$row['cnt_code'],'cnt_name'=>$row['cnt_title'] ) ;
		}
 
		return $countryList;
	}
 
	public function getUsersByName($userName){
	
		$sql="SELECT usr_id, usr_name    
		    FROM users 
			WHERE usr_name LIKE '$userName%'			 
			ORDER BY  usr_name
			" ;
	 
		$result =  mysql_query( $sql );
		while ($row = mysql_fetch_assoc($result)) {
			$userList[]=  array('usr_id'=>$row['usr_id'],'usr_name'=>$row['usr_name'] ) ;
		}
 
		return $userList;
	}
	
	public function getCountry($countryId){
	
		$sql=" SELECT cnt_id, cnt_code, cnt_title    
		     FROM countries  
			 WHERE cnt_id = '$countryId' "
			 ;
	 
		$result =  mysql_query( $sql );
		while ($row = mysql_fetch_assoc($result)) {
			$country= array('cnt_id'=>$row['cnt_id'],'cnt_code'=>$row['cnt_code'],'cnt_name'=>$row['cnt_title'] ) ;
		}
 
		return $country;
	}
 
	public function getUser($userId){
	
		$sql="SELECT usr_id, usr_name    
		     FROM users 
			WHERE usr_id ='$userId' ";
			 
		$result =  mysql_query( $sql );
		while ($row = mysql_fetch_assoc($result)) {
			$user =  array('usr_id'=>$row['usr_id'],'usr_name'=>$row[usr_name] ) ;
		}
 
		return $user;
	}

	public function outData($data){
		echo  json_encode($data) ;
		exit;
	}
	
}


 $agl = new ModelLogAgregator();	
  
  
  	if($_GET['dateFrom'] AND $_GET['dateTo'] AND $_GET['userId'] AND $_GET['countryId']){  

		$agl->outData( $agl->getLogData($_GET['dateFrom'],$_GET['dateTo'],$_GET['userId'],$_GET['countryId']) ) ;
		exit;
	}
  
  
	if($_GET['countryName']){  

		$agl->outData(  $agl->getCountriesByName($_GET['countryName']));

	}	

	if($_GET['countryId']){  
	
		$agl->outData(  $agl->getCountry($_GET['countryId']));

	}
	
	if($_GET['userName']){  

		$agl->outData(  $agl->getUsersByName($_GET['userName']));

	}
	
	if($_GET['userId']){  

		$agl->outData(  $agl->getUser($_GET['userId']));

	}
	

?>
