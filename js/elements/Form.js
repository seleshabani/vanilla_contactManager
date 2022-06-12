import Contact from "../models/Contact.js";

class Form
{
    constructor(){
        this.$htmlForm = document.querySelector('form');
        this.$inputImg = document.querySelector('#profile');
        this.$form_img = document.querySelector('.form-img');
        this.$form_reset = document.querySelector('#reset_btn');
        this.$form_user_data = {};
    }

    onImageChange(){
        this.$inputImg.addEventListener('change',e=>{
            const fileReader = new FileReader();
            fileReader.addEventListener('load',()=>{
                const uploaded_img = fileReader.result;
                this.$form_img.style.backgroundImage = `url(${uploaded_img})`
                this.$form_user_data.profile_photo = uploaded_img;
            })
            fileReader.readAsDataURL(e.target.files[0]);
        })
    }

    onSubmit(){
        this.$htmlForm.addEventListener('submit',e=>{
            e.preventDefault();
            let prenom = e.target.prenom.value
            let nom = e.target.nom.value
            let groupe = e.target.groupe.value
            let bio = e.target.bio.value
            this.$form_user_data.prenom = prenom;
            this.$form_user_data.nom = nom;
            this.$form_user_data.groupe = groupe;
            this.$form_user_data.bio = bio;
            let user = new Contact(this.$form_user_data);
            user.save();
        })
    }
    ListenReset(contactList){
        this.$form_reset.addEventListener('click',e=>{
            e.preventDefault();
            localStorage.clear();
            contactList.updateContactList();
        })
    }
}
export default Form;