import Contact from "../models/Contact.js";
import ContactList from "./ContactList.js";

/**
 * cette classe est un singleton
 */
class Form
{
    _inptPrenom;
    _inptPrenomErElt;
    _inptNom;
    _inptNomErElt;
    _inptTel;
    _inptTelErElt;
    _inptGroupe;
    _inptBio;
    _inptBioErlt;
    _inptMail;
    _inptMailErElt;
    _formPreviewImg;
    _inptFile;
    _index;
    _dropzoneText;
    /**
     * 
     */
    constructor(){
    
        this.$htmlForm = document.querySelector('form');
        this.$form_reset = document.querySelector('#reset_btn');
        
        // this._inptFile = document.querySelector('#profile');
        this._inptFile = document.querySelector('.dropzone');
        this._dropzoneText = document.querySelector('#drop_zone_text');
        this._inptBio = document.querySelector('[name="bio"]');
        this._inptBioErlt = document.querySelector('#error_bio');
        this._inptNom = document.querySelector('[name="nom"]');
        this._inptNomErElt = document.querySelector('#error_nom');
        this._inptTel = document.querySelector('[name="tel"]');
        this._inptTelErElt = document.querySelector('#error_tel');
        this._inptGroupe = document.querySelector('[name="groupe"]');
        this._inptPrenom = document.querySelector('[name="prenom"]');
        this._inptPrenomErElt = document.querySelector('#error_prenom');
        this._inptMail = document.querySelector('[name="mail"]');
        this._inptMailErElt = document.querySelector('#error_mail');
        this._formPreviewImg = document.querySelector('.form-img');
        this._index = document.querySelector('[name="index"]').value;
        this.$form_user_data = {};
        // singleton
        if (Form.exist) {
            return Form.instance
        }
        Form.exist = true
        Form.instance = this
    }

    /**
     * 
     */
    onImageChange(){
        this._inptFile.addEventListener('change',e=>{
            e.preventDefault()
            console.log(e)
            let file = e.target.files[0];
            this.fileReaderEvnt(file);
        })
    }

    onDrag(){
        this._inptFile.addEventListener('dragover',e=>{
            e.preventDefault()
            this._dropzoneText.innerHTML = 'Lachez pour uploader votre image';
        })
        this._inptFile.addEventListener('dragleave',e=>{
            e.preventDefault()
            this._dropzoneText.innerHTML = 'Déposez la photo ici';            
        })
        this._inptFile.addEventListener('drop',e=>{
            e.preventDefault()
            let file = e.dataTransfer.files[0];
            this.fileReaderEvnt(file);
            this._dropzoneText.innerHTML = 'Selectionnez une autre image?';  
        })
    }
    /**
     * 
     * @param {Event} e 
     */
    fileReaderEvnt(file){
        const fileReader = new FileReader();
        fileReader.addEventListener('load',()=>{
            const uploaded_img = fileReader.result;
            this._formPreviewImg.style.backgroundImage = `url(${uploaded_img})`
            this.$form_user_data.profile_photo = uploaded_img;
        })
        fileReader.readAsDataURL(file);
    }
    /**
     * 
     */
    onSubmit(){
        this.$htmlForm.addEventListener('submit',e=>{
            e.preventDefault();

            this.$form_user_data.prenom =  e.target.prenom.value;
            this.$form_user_data.nom = e.target.nom.value;
            this.$form_user_data.tel = e.target.tel.value;
            this.$form_user_data.mail = e.target.mail.value;
            this.$form_user_data.groupe = e.target.groupe.value;
            this.$form_user_data.bio = e.target.bio.value;

            let isInputEmpty = this.isEmpty(e.target.prenom,e.target.nom,e.target.tel,e.target.mail,e.target.bio);
            if (isInputEmpty===false) {
                let user = new Contact(this.$form_user_data);
                user.save();
                this.clear();
                this._dropzoneText.innerHTML = 'Faites glisser une image.';
                this._formPreviewImg.style.backgroundColor='white'
            }
        })
    }
    /**
     * 
     * @param {ContactList} contactList 
     */
    ListenReset(contactList){
        this.$form_reset.addEventListener('click',e=>{
            e.preventDefault();
            // localStorage.clear();
            this.clear();
            contactList.updateContactList();
        })
    }
    /**
     * @param {Contact} Contact
     * @param {String} previewImg
     * @param {Number} indx
     */
    fill(contact,previewImg,indx){
        this.clear()
        this._inptMail.value = contact.mail
        this._inptTel.value = contact.tel
        this._inptPrenom.value = contact.prenom
        this._inptNom.value = contact.nom
        this._inptBio.value = contact.bio
        this._formPreviewImg.style.backgroundImage = `url(${previewImg})`
        this._index = indx;
    }
    /**
     * 
     */
    clear(){
        this._inptPrenom.value =""
        this._inptNom.value ="" 
        this._inptBio.value =""
        this._inptFile.value=""
        this._inptMail.value = ""
        this._inptTel.value=""
        this._inptNomErElt.innerHTML = '';
        this._inptPrenomErElt = '';
        this._inptTelErElt.innerHTML = '';
        this._inptMailErElt.innerHTML = '';
        this._inptBioErlt.innerHTML = '';
        this._formPreviewImg.style.removeProperty('background-image');
    }

   /**
    * 
    * @param {HTMLInputElement} inptPNom 
    * @param {HTMLInputElement} inptNom 
    * @param {HTMLInputElement} inptTel 
    * @param {HTMLInputElement} inptMail 
    * @param {HTMLInputElement} InptBio
    * @return {boolean}
    */
    isEmpty(inptPNom,inptNom,inptTel,inptMail,InptBio){
       let flag = false;
       let text = 'ce champs est obligatoire';

       if (inptNom.value==='') {
            flag = true
            this._inptNomErElt.innerHTML = text;
       }
       if (inptPNom.value==='') {
            flag = true
            this._inptPrenomErElt = text;
       }
       if (inptTel.value==='') {
            flag = true
            this._inptTelErElt.innerHTML = text;
       }
       if (inptMail.value==='') {
            flag = true
            this._inptMailErElt.innerHTML = text;
       }
       if (InptBio.value==='') {
            flag = true
            this._inptBioErlt.innerHTML = text;
       }
       return flag;
    }
}
export default Form;