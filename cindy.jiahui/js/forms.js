
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







const checkAnimalAddForm = () => {
   let type = $("#animal-add-type").val();
   let color = $("#animal-add-color").val();
   let description = $("#animal-add-description").val();

   if(!type.trim()){
      tips("Please input type name");
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

   $("#list-add-modal input[name='type']").val("");
   $("#list-add-modal input[name='color']").val("");
   $("#list-add-modal input[name='description']").val("");
   
   query({
      type:"insert_animal",
      params:[sessionStorage.userId,type,color,description]
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
      sessionStorage.animalId = d.id;
      window.history.go(-1);
   })
}

const checkAnimalEditForm = () => {
   let type = $("#animal-edit-type").val();
   let color = $("#animal-edit-color").val();
   let description = $("#animal-edit-description").val();

   query({
      type:"update_animal",
      params:[type,color,description,sessionStorage.animalId]
   }).then(d=>{
      if(d.error) {
         tips(d.error)
         return false;
      }
      window.history.go(-1);
   })
}





const checkLocationAddForm = () => {
   let animal_id = $("#location-choose-animal").val();
   let lat = +$("#location-lat").val();
   let lng = +$("#location-lng").val();
   let description = $("#location-description").val();

   query({
      type:"insert_location",
      params:[animal_id,lat,lng,description]
   }).then(d=>{
      if(d.error) {
         tips(d.error)
         return false;
      }
      window.history.go(+$("#location-redirect").val());
   })
}