
const makeAnimalList = templater(o=>`
   <div class="card" data-id="${o.id}">
      <div class="card_img">
         <img src="${o.img}" alt="" width="150" height="150">
      </div>
      <div class="plant-info">
         <div><span>Type:</span>${o.type}</div>
         <div><span>Color:</span>${o.color}</div>
         <a href="#plant-profile-page">Read More</a>
      </div>
   </div>
`);


const makeUserProfile = o => `
<img src="${o.img}" alt="" id="touxiang" style="width: 100%;">
<form id="user-edit-form" data-ajax="false" class="form" style="padding: 1em">
   <div class="form-control">
      <label for="signin-username" class="form-label">Name</label>
      <input class="form-input" name="name" value="${o.name}" type="text" data-role="none">
   </div>
   <div class="form-control">
      <label for="signin-username" class="form-label">Username</label>
      <input class="form-input" name="username" value="${o.username}" type="text" data-role="none">
   </div>
   <div class="form-control">
      <label for="signin-email" class="form-label">Email</label>
      <input class="form-input" name="email" value="${o.email}" type="text" data-role="none">
   </div>

   <div class="form-control">
      <a class="form-button signin-button user-edit-submit">Save</a>
   </div>
</form>
`;

const makeAnimalInfo = o => `
<div class="animal-name">${o.name}</div>
<div class="animal-type">${o.type}</div>
<div class="animal-breed">${o.breed}</div>
`;




const makeAnimalPopup = o => `
<div class="display-flex animal-jump" data-id="${o.animal_id?o.animal_id:o.id}">
   <div class="flex-none animal-image-thumb">
      <img src="${o.img}" height="100px">
   </div>
   <div class="flex-none" style="padding:1em;display: flex;flex-direction: column;justify-content: space-around;">
      <div><span>Type:</span> ${o.type}</div>
      <div><span>Color:</span> ${o.color}</div>
   </div>
</div>
`;




// destructuring
const FormControlInput = ({namespace,name,displayname,type,placeholder,value}) => {
   return `<div class="form-control">
      <label for="${namespace}-${name}" class="form-label">${displayname}</label>
      <input class="form-input" type="${type}" id="${namespace}-${name}" data-role="none" placeholder="${placeholder}" value="${value}">
   </div>`;
}
const FormControlTextarea = ({namespace,name,displayname,type,placeholder,value}) => {
   return `<div class="form-control">
      <label for="${namespace}-${name}" class="form-label">${displayname}</label>
      <textarea class="form-input" id="${namespace}-${name}" data-role="none" placeholder="${placeholder}">${value}</textarea>
   </div>`;
}


const FormSelectOptions = (options,selected=1) => {
   return options.reduce((r,o)=>{
      return r+`<option value="${o.id}" ${o.id===selected?'selected':''}>${o.name}</option>`
   },'');
}

const FormSelect = (options,id,selected=1) => {
   return `<div class='form-select'>
      <select id="${id}">
         ${FormSelectOptions(options,selected)}
      </select>
   </div>`;
}



// const makeAnimalProfileUpdateForm = (o,namespace="animal-edit") => `
// ${FormControlInput({
//    namespace:namespace,
//    name:'type',
//    displayname:'Type',
//    type:'text',
//    placeholder:'Type The Plant Type',
//    value:o.type
// })}
// ${FormControlInput({
//    namespace:namespace,
//    name:'color',
//    displayname:'Color',
//    type:'text',
//    placeholder:'Type The Plant Color',
//    value:o.breed
// })}
// ${FormControlTextarea({
//    namespace:namespace,
//    name:'description',
//    displayname:'Description',
//    type:'text',
//    placeholder:'Type The Animal Description',
//    value:o.description
// })}
// `



const makeUserProfileUpdateForm = (o,namespace="user-edit") => `
${FormControlInput({
   namespace:namespace,
   name:'name',
   displayname:'Name',
   type:'text',
   placeholder:'Type Your Name',
   value:o.name
})}
${FormControlInput({
   namespace:namespace,
   name:'username',
   displayname:'Username',
   type:'text',
   placeholder:'Type Your Username',
   value:o.username
})}
${FormControlInput({
   namespace:namespace,
   name:'email',
   displayname:'Email',
   type:'text',
   placeholder:'Type Your Email',
   value:o.email
})}
`

const makeUserPasswordUpdateForm = o => `
${FormControlInput({
   namespace:"user-edit",
   name:'old-password',
   displayname:'Old Password',
   type:'password',
   placeholder:'Type Your Old Password',
   value:''
})}
${FormControlInput({
   namespace:"user-edit",
   name:'new-password',
   displayname:'New Password',
   type:'password',
   placeholder:'Type Your New Password',
   value:''
})}
${FormControlInput({
   namespace:"user-edit",
   name:'confirm-password',
   displayname:'Confirm Password',
   type:'password',
   placeholder:'Type Your New Password Again',
   value:''
})}

<a class="form-button signin-button user-password-submit">Save</a>
`