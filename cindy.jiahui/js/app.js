// Document Ready
/* $(document). ready */
$(()=>{

   checkUserId();


  $(document)


/*Form Submits e is event*/
  .on("submit","#signin-form", function(e){
   e.preventDefault();
   checkSigninForm();
  })



/*Anchor Click*/
 .on("click",".js-logout", function (e){
   sessionStorage.removeItem('userId');
   checkUserId();
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
   let id= $(this).data("template");
   let template = $(id).html();
   $(this).html(template);
})




});