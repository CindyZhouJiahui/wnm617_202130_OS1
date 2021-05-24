
const checkSignupForm = () => {
   let email = $("#signup-email").val();
   let password = $("#signup-password").val();
   let confirm = $("#signup-confirm").val();

   if(password!==confirm) {
      tips("Passwords don't match")
      return false;
   } else {
      query({
         type:"insert_user",
         params:[email,password]
      }).then(d=>{
         if(d.error) {
            tips(d.error)
            return false;
         }
         console.log(d)
         sessionStorage.userId = d.id;
         $("#signup-form")[0].reset();
         $.mobile.navigate("#signup-second-page");
      })
   }
}

const checkSignupSecondForm = () => {
   let username = $("#signup-second-username").val();
   let name = $("#signup-second-name").val();

   query({
      type:"update_user_initial",
      params:[username,name,sessionStorage.userId]
   }).then(d=>{
      if(d.error) {
         tips(d.error)
         return false;
      }
      console.log(d)
      $("#signup-second-form")[0].reset();
      $.mobile.navigate("#recent-page");
   })
   
}
const checkUserEditForm = () => {
   let username = $("#user-edit-username").val();
   let name = $("#user-edit-name").val();
   let email = $("#user-edit-email").val();
   
   query({
      type:"update_user",
      params:[username,name,email,sessionStorage.userId]
   }).then(d=>{
      if(d.error) {
         tips(d.error);
         return false;
      }

      window.history.go(-1);
      
   })
}
const checkUserPasswordForm = () => {
   let oldpassword = $("#user-edit-old-password").val();
   let password = $("#user-edit-new-password").val();
   let confirm = $("#user-edit-confirm-password").val();

   if(!oldpassword.trim() || !password.trim()){
      tips("Please input");
      return false;
   }

   if(password!==confirm){
      tips("New Passwords don't match");
      return false;
   }
      
   query({
      type:"update_user_password",
      params:[password,sessionStorage.userId]
   }).then(d=>{
      if(d.error) {
         tips(d.error);
         return false;
      }

      if(d.result != "success"){
         tips(d.result);
         return false;
      }

      window.history.go(-1);
   })
}







const checkPlantAddForm = () => {
   let name = $("#plant-add-name").val();
   let type = $("#plant-add-type").val();
   let color = $("#plant-add-color").val();
   let description = $("#plant-add-description").val();

   if(!name.trim()){
      tips("Please input type name");
      return false;
   }

   if(!type.trim()){
      tips("Please input type type");
      return false;
   }

   if(!color.trim()){
      tips("Please input color");
      return false;
   }

   if(!description.trim()){
      tips("Please input description");
      return false;
   }

   $("#list-add-modal input[name='name']").val("");
   $("#list-add-modal input[name='type']").val("");
   $("#list-add-modal input[name='color']").val("");
   $("#list-add-modal input[name='description']").val("");
   
   query({
      type:"insert_plant",
      params:[sessionStorage.userId,name,type,color,description]
   }).then(d=>{
      if(d.error) {
         tips(d.error)
         return false;
      }
      
      if(d.id == 0){
         tips("error")
         return false;
      }
      
      console.log(d)
      sessionStorage.plantId = d.id;
      window.history.go(-1);
   })
}

const checkPlantEditForm = () => {
   let name = $("#plant-edit-name").val();
   let type = $("#plant-edit-type").val();
   let color = $("#plant-edit-color").val();
   let description = $("#plant-edit-description").val();

   query({
      type:"update_plant",
      params:[name,type,color,description,sessionStorage.plantId]
   }).then(d=>{
      if(d.error) {
         tips(d.error)
         return false;
      }
      window.history.go(-1);
   })
}





const checkLocationAddForm = () => {
   let plant_id = $("#location-choose-plant").val();
   let lat = +$("#location-lat").val();
   let lng = +$("#location-lng").val();
   let description = $("#location-description").val();

   query({
      type:"insert_location",
      params:[plant_id,lat,lng,description]
   }).then(d=>{
      if(d.error) {
         tips(d.error)
         return false;
      }
      window.history.go(+$("#location-redirect").val());
   })
}

const checkUserUploadForm = () => {
   let upload = $("#user-upload-image").val();
   if(upload=="") return;

   query({
      type:'update_user_image',
      params:[upload,sessionStorage.userId]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }
      window.history.go(-1);
   })
}

const checkPlantDelete = (id) => {
   query({
      type:'delete_plant',
      params:[id]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }
      window.history.go(-1);
   })
}

const checkSearchForm = async () => {
   let search = $("#list-search-value").val();
   
   let plants = await query({
      type:'search_plants',
      params:[search,sessionStorage.userId]
   });

   makePlantListSet(
      plants.result,
      "No results found."
   );
}

const checkRecentSearchForm = async () => {
   let search = $("#recent-search-value").val();
   console.log(search)

   let locations = await query({
      type:'search_recent_locations',
      params:[search,sessionStorage.userId]
   });

   let valid_plants = locations.result.reduce((r,o)=>{
      o.icon = o.img;
      if(o.lat && o.lng) r.push(o);
      return r;
   },[]);

   let map_el = await makeMap("#recent-page .map");
   makeMarkers(map_el,valid_plants);

   map_el.data("markers").forEach((o,i)=>{
      o.addListener("click",function(){

         /* SIMPLE EXAMPLE */
         /*sessionStorage.plantId = valid_plants[i].plant_id;
         $.mobile.navigate("#plant-profile-page");*/

         /* INFOWINDOW EXAMPLE */
         /*map_el.data("infoWindow")
            .open(map_el.data("map"),o)
         map_el.data("infoWindow")
            .setContent(makePlantPopup(valid_plants[i]))*/

         /* ACTIVATE EXAMPLE */
         $("#recent-drawer")
            .addClass("active")
            .find(".modal-body")
            .html(makePlantPopup(valid_plants[i]))
      })
   })
   
}

const checkListFilter = async ({field,value}) => {
   let plants = value=="" ?
      await query({
         type:'plants_by_user_id',
         params:[sessionStorage.userId]
      }) :
      await query({
         type:'filter_plants',
         params:[field,value,sessionStorage.userId]
      });

   makePlantListSet(plants.result,"No plants found");
}
