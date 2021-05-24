
const RecentPage = async () => {
   let locations = await query({
      type:'recent_locations',
      params:[sessionStorage.userId]
   });
   console.log(locations)

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







const ListPage = async () => {
   let plants = await query({
      type:'plants_by_user_id',
      params:[sessionStorage.userId]
   });

   console.log(plants)

   $(".filter-set").html(makeFilterList(plants.result))

   makePlantListSet(
      plants.result,
      "No plants yet. Try adding some."
   );
}



const UserProfilePage = async () => {
   let user = await query({
      type:'user_by_id',
      params:[sessionStorage.userId]
   });

   $("#user-profile-page .modal-body h1")
   .html(user.result[0].name);

   $("#user-profile-page .body")
      .html(makeUserProfile(user.result[0]));

      
}

const UserEditPage = async () => {
   let user = await query({
      type:'user_by_id',
      params:[sessionStorage.userId]
   });

   $("#user-edit-form")
         .html(makeUserProfileUpdateForm(user.result[0])+`<div class="form-control">
         <a class="form-button signin-button user-edit-submit">Save</a>
      </div>`);
}

const UserPasswordPage = async () => {
   let user = await query({
      type:'user_by_id',
      params:[sessionStorage.userId]
   });

   $("#user-password-form")
         .html(makeUserPasswordUpdateForm(user.result[0]));
}


const UserUploadPage = async () => {
   let user = await query({
      type:'user_by_id',
      params:[sessionStorage.userId]
   });

   $("#user-upload-image").val(user.result[0].img);
   $("#user-upload-form img").attr("src", user.result[0].img);
}



const PlantProfilePage = async () => {
   query({
      type:'plant_by_id',
      params:[sessionStorage.plantId]
   }).then(r=>{
      let plant = r.result[0];
      if(!$("#plant-profile-page .active").length) {
         $("#plant-profile-page .plant-nav li:first-child").addClass("active")
         $("#plant-profile-page .plant-bottom-section:first-child").addClass("active")
      }

      $("#plant-profile-page .plant-top")
         .css({backgroundImage:`url(${plant.img})`})
      $("#plant-profile-page .plant-info")
         .html(makePlantInfo(plant));
   });
   

   query({
      type:'locations_by_plant_id',
      params:[sessionStorage.plantId]
   }).then(async (r)=>{
      let map_el = await makeMap("#plant-profile-page .map");
      makeMarkers(map_el,r.result)
   });
}

const PlantEditPage = async () => {
   let plant = await query({
      type:'plant_by_id',
      params:[sessionStorage.plantId]
   });

   $("#plant-edit-form")
      .html(
         makePlantProfileUpdateForm(plant.result[0])+`<a href="#" class="form-button plant-edit-submit">Save</a>`
      );
}

const PlantAddPage = async () => {
   $("#plant-add-form .form-elements")
      .html(
         makePlantProfileUpdateForm({
            name: "",
            type:"",
            color:"",
            description:""
         },"plant-add") + `<div class="form-control">
                              <a class="form-button signin-button plant-add-submit">Save</a>
                           </div>`
      );
}





const ChoosePlantPage = async () => {
   let d = await query({
      type:'plants_by_user_id',
      params:[sessionStorage.userId]
   });
   
   $("#location-choose-plant")
      .html(FormSelectOptions(d.result))
}
const ChooseLocationPage = async () => {
   let map_el = await makeMap("#choose-location-page .map");
   makeMarkers(map_el,[])

   map_el.data("map").addListener("click",function(e){
      console.log(e)
      $("#location-lat").val(e.latLng.lat())
      $("#location-lng").val(e.latLng.lng())
      makeMarkers(map_el,[{
         lat:e.latLng.lat(),
         lng:e.latLng.lng(),
         // icon:
      }])
   })
}