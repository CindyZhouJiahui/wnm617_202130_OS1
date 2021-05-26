
const makePlantList = templater(o=>`
   <div class="card plant-jump" data-id="${o.id}">
      <div class="card_img">
         <img src="${o.img}" alt="" width="150" height="150">
      </div>
      <div class="plant-info">
         <div><span>Name:</span>${o.name}</div>
         <div><span>Type:</span>${o.type}</div>
         <div><span>Color:</span>${o.color}</div>
         <a href="#plant-profile-page">Read More</a>
      </div>
   </div>
`);


const makeUserProfile = o => `
<div id="touxiang">
   <img src="${o.img}" alt="" style="width: 100%;">

   <a href="#user-upload-page"></a>
</div>
<div class="user-profile-description">
   <div class="item">Name: <span>${o.name}</span></div>
   <div class="item">Username: <span>${o.username}</span></div>
   <div class="item">Email: <span>${o.email}</span></div>
</div>
`;

const makePlantInfo = o => `
<div class="item">Name: <span>${o.name}</span></div>
<div class="item">Type: <span>${o.type}</span></div>
<div class="item">Color: <span>${o.color}</span></div>
<div class="item">Description: <span>${o.description}</span></div>
<button class="form-button plant-delete" data-id="${o.id}">Delete</button>
`;




const makePlantPopup = o => `
<div class="display-flex plant-jump" data-id="${o.plant_id?o.plant_id:o.id}">
   <div class="flex-none plant-image-thumb">
      <img src="${o.img}" height="100px">
   </div>
   <div class="flex-none" style="padding:1em;display: flex;flex-direction: column;justify-content: space-around;">
      <div><span>Name:</span> ${o.name}</div>
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
      return r+`<option value="${o.id}" ${o.id===selected?'selected':''}>${o.type}</option>`
   },'');
}

const FormSelect = (options,id,selected=1) => {
   return `<div class='form-select'>
      <select id="${id}">
         ${FormSelectOptions(options,selected)}
      </select>
   </div>`;
}



const makePlantProfileUpdateForm = (o,namespace="plant-edit") => `
${FormControlInput({
   namespace:namespace,
   name:'name',
   displayname:'Name',
   type:'text',
   placeholder:'Name The Plant Type',
   value:o.name
})}
${FormControlInput({
   namespace:namespace,
   name:'type',
   displayname:'Type',
   type:'text',
   placeholder:'Type The Plant Type',
   value:o.type
})}
${FormControlInput({
   namespace:namespace,
   name:'color',
   displayname:'Color',
   type:'text',
   placeholder:'Type The Plant Color',
   value:o.color
})}
${FormControlTextarea({
   namespace:namespace,
   name:'description',
   displayname:'Description',
   type:'text',
   placeholder:'Type The Plant Description',
   value:o.description
})}
`



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

const makePlantListSet = (plants,missing_text="") => {
   plant_template = plants.length?
      makePlantList(plants):
      `<div class="no_list">${missing_text}</div>`

   $("#list-page .container").html(plant_template);
}

const capitalize = s => s[0].toUpperCase()+s.substr(1);

const filterList = (plants,type) => {
   let a = [...(new Set(plants.map(o=>o[type])))];
   // console.log(a)
   return templater(o=>o?`<li class="filter" data-field="${type}" data-value="${o}">${capitalize(o)}</li>`:'')(a);
}

const makeFilterList = (plants) => {
   return `
   <li class="filter" data-field="type" data-value="">All</li>
   |
   ${filterList(plants,'type')}
   |
   ${filterList(plants,'color')}
   `
}

