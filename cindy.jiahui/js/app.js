


// Document Ready
$(()=>{

   checkUserId();

   $(document)


   .on("pagecontainerbeforeshow", function(event, ui) {
      console.log(ui.toPage[0].id)

      $(".active").removeClass("active")

      // PAGE ROUTING
      switch(ui.toPage[0].id) {
         case "recent-page": RecentPage(); break;
         case "list-page": ListPage(); break;
         case "user-profile-page": UserProfilePage(); break;
         case "user-edit-page": UserEditPage(); break;
         case "user-password-page": UserPasswordPage(); break;
         case "user-upload-page": UserUploadPage(); break;
         case "plant-profile-page": PlantProfilePage(); break;
         case "plant-edit-page": PlantEditPage(); break;
         case "plant-add-page": PlantAddPage(); break;
         case "choose-plant-page": ChoosePlantPage(); break;
         case "choose-location-page": ChooseLocationPage(); break;
      }
   })


   /* FORM SUBMITS */
   .on("submit","#signin-form",function(e){
      e.preventDefault();
      checkSigninForm();
   })
   .on("submit","#signup-form",function(e){
      e.preventDefault();
      checkSignupForm();
   })
   .on("submit","#signup-second-form",function(e){
      e.preventDefault();
      checkSignupSecondForm();
   })
   .on("submit","#list-search",function(e){
      e.preventDefault();
      checkSearchForm();
   })
   .on("submit","#recent-search",function(e){
      e.preventDefault();
      checkRecentSearchForm();
   })

   .on("change",".image-uploader input",function(e){
      checkUpload(this.files[0])
      .then(d=>{
         console.log(d)
         $(".upload-image-input").val('uploads/'+d.result);
         $("#user-upload-form img").attr("src", 'uploads/'+d.result);
      })
   })

   .on("change","#plant-update-image-input",function(e){
      checkUpload(this.files[0])
      .then(d=>{
         console.log(d)
         if(d.error) throw "Uploading failed: "+d.error;

         let image_location = 'uploads/'+d.result;
         query({
            type:'update_plant_image',
            params:[image_location,sessionStorage.plantId]
         }).then(d=>{
            if(d.error) {
               throw d.error;
            }
            $("#plant-profile-page .plant-top")
               .css({"background-image":`url(${image_location})`})
         })
      })
   })


   /* ANCHOR CLICKS */
   .on("click",".js-logout",function(e){
      sessionStorage.removeItem('userId');
      checkUserId();
   })
   .on("click",".plant-jump",function(e){
      sessionStorage.plantId = $(this).data('id');
      $.mobile.navigate("#plant-profile-page")
   })
   .on("click",".plant-nav a",function(e){
      let id = $(this).parent().index();
      
      $(this).parent().addClass("active")
         .siblings().removeClass("active")

      $(this)
         .closest(".plant-nav").next().children().eq(id)
         .addClass("active")
         .siblings().removeClass("active")
   })
   .on("click",".js-choose-plant",function(e){
      $("#location-choose-plant")
         .html(FormSelectOptions([{id:sessionStorage.plantId,name:"chosen"}]))
      $("#location-redirect").val(-2);
   })
   .on("click",".js-add-from-recent",function(e){
      $("#location-redirect").val(-3);
   })
   .on("click",".plant-add-submit",function(e){
      checkPlantAddForm();
   })
   .on("click",".plant-edit-submit",function(e){
      checkPlantEditForm();
   })
   .on("click",".user-edit-submit",function(e){
      checkUserEditForm();
      return false;
   })
   .on("click",".user-upload-submit",function(e){
      checkUserUploadForm();
   })
   .on("click",".user-password-submit",function(e){
      checkUserPasswordForm();
   })
   .on("click",".location-add-submit",function(e){
      checkLocationAddForm();
   })
   .on("click",".plant-delete",function(e){
      checkPlantDelete($(this).data('id'));
   })
   .on("click",".filter",function(e){
      checkListFilter($(this).data());
   })



   /* DATA ACTIVATE */
   .on("click","[data-activate]",function(e){
      let target = $(this).data("activate");
      $(target).addClass("active");
   })
   .on("click","[data-deactivate]",function(e){
      let target = $(this).data("deactivate");
      $(target).removeClass("active");
   })
   .on("click","[data-toggle]",function(e){
      let target = $(this).data("toggle");
      $(target).toggleClass("active");
   })









   $("[data-template]").each(function(){
      let id = $(this).data("template");
      let template = $(id).html();
      $(this).html(template);
   })

});