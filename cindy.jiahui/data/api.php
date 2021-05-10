<?php

function makeConn() {
   include_once "auth.php";
   try {
      $conn = new PDO(...Auth());
      $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      return $conn;
   } catch(PDOException $e) {
      die('{"error":"Connection Error: '.$e->getMessage().'"}');
   }
}

   
function fetchAll($r) {
   $a = [];
   while($row = $r->fetch(PDO::FETCH_OBJ))
      $a[] = $row;
   return $a;
}


// connection, prepared statement, parameters
function makeQuery($c,$ps,$p,$makeResults=true) {
   try {
      if(count($p)) {
         $stmt = $c->prepare($ps);
         $stmt->execute($p);
      } else {
         $stmt = $c->query($ps);
      }

      $r = $makeResults ? fetchAll($stmt) : [];

      return [
         "result"=>$r
      ];
   } catch(PDOException $e) {
      return ["error"=>"Connection Error: ".$e->getMessage()];
   }
}

function makeStatement($data) {
   $c = makeConn();
   $t = $data->type;
   $p = $data->params;

   switch($t) {
      case "users_all":
         return makeQuery($c,"SELECT * FROM `track_202130_users`",$p);
      case "animals_all":
         return makeQuery($c,"SELECT * FROM `track_202130_plants`",$p);
      case "locations_all":
         return makeQuery($c,"SELECT * FROM `track_202130_locations`",$p);


      case "user_by_id":
         return makeQuery($c,"SELECT * FROM `track_202130_users` WHERE id=?",$p);
      case "animal_by_id":
         return makeQuery($c,"SELECT * FROM `track_202130_plants` WHERE id=?",$p);
      case "location_by_id":
         return makeQuery($c,"SELECT * FROM `track_202130_locations` WHERE id=?",$p);


      case "animals_by_user_id":
         return makeQuery($c,"SELECT * FROM `track_202130_plants` WHERE user_id=?",$p);
      case "locations_by_animal_id":
         return makeQuery($c,"SELECT * FROM `track_202130_locations` WHERE animal_id=?",$p);
         // l.*, a.user_id, a.type, a.color, a.description as plant_description, a.img
      
    
      case "recent_locations":
         return makeQuery($c,"SELECT *
            FROM `track_202130_plants` a
            RIGHT JOIN (
               SELECT * FROM `track_202130_locations`
               ORDER BY `date_create` DESC
            ) l
            ON a.id = l.plant_id
            WHERE a.user_id=?
            GROUP BY l.plant_id
            ",$p);

      case "update_user_password":
         $is_arr = [$p[1], $p[2]];
         $is = makeQuery($c,"SELECT id FROM `track_202130_users` WHERE  `password`=md5(?) AND `id`=?",$is_arr);

         if(count($is["result"]) == 0){
            return ["result"=>"The old password is incorrect"];
         }
         
         $r = makeQuery($c,"UPDATE
            `track_202130_users`
            SET
            `password` = md5(?)
            WHERE `password` = md5(?) and `id` = ? 
            ",$p);

         return ["result"=>"success"];

      case "insert_animal":
         $name = $p[1];
         $r = makeQuery($c,"INSERT INTO
            `track_202130_plants`
            (`user_id`,`type`,`color`,`description`,`img`,`date_create`)
            VALUES
            (?,?,?,?,'https://via.placeholder.com/500/?text=$name',NOW())
            ",$p,false);
         return ["id"=>$c->lastInsertId()];

      case "check_signin":
         return makeQuery($c,"SELECT id FROM `track_202130_users` WHERE `username`=? AND `password`=md5(?)",$p);

      case "update_user":
         $r = makeQuery($c,"UPDATE
            `track_202130_users`
            SET
            `username` = ?,
            `name` = ?,
            `email` = ?
            WHERE `id` = ?
            ",$p,false);
         return ["result"=>"success"];


      default:
         return ["error"=>"No Matched Type"];
   }
}

$data = json_decode(file_get_contents("php://input"));

echo json_encode(
   makeStatement($data),
   JSON_NUMERIC_CHECK
);
