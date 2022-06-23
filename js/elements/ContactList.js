import Contact from "../models/Contact.js";
import ContactCard from "./ContactCard.js";
import Form from "./Form.js";

class ContactList
{
    _contacts;
    _deletebtns;
    _updatebtns;
    
    /**
     * 
     */
    updateContactList(){
        let UnparseContactList = localStorage.getItem('contacts');
        let ParsedContactList = JSON.parse(UnparseContactList);
        if (ParsedContactList == null || ParsedContactList.length == 0) {
            this.renderEmpty();
        }else{
            this._contacts = ParsedContactList.map(contactData => {
                let data = {"prenom":contactData._prenom,"nom":contactData._nom,
                "groupe":contactData._groupe,
                "profile_photo":contactData._profile_photo,
                "bio":contactData._bio,"tel":contactData._tel,"mail":contactData._mail}
                return new Contact(data);
            });
            this.render();
        }
       
    }
    /**
     * 
     */
    deleteContactListener(){
        this._deletebtns.forEach(item=>{
            item.addEventListener('click',e=>{
                let UnparseContactList = localStorage.getItem('contacts');
                let ParsedContactList = JSON.parse(UnparseContactList);
                
                let newParsedContactList = ParsedContactList.filter((contactData,index)=>{
                    if (index != e.target.dataset.id) {
                        return contactData
                    }
                })
               localStorage.setItem('contacts',JSON.stringify(newParsedContactList));
               this.updateContactList();
            })
        })
    }
    /**
     * 
     */
    updateContactListener(){
        this._updatebtns.forEach(updateBtn=>{
            updateBtn.addEventListener('click',e=>{

                let Searchedindex = e.target.dataset.index;
                let UnparseContactList = localStorage.getItem('contacts');
                let ParsedContactList = JSON.parse(UnparseContactList);
    
                let newParsedContact = ParsedContactList.filter((contactData,index)=>{
                    if (index == Searchedindex) {
                        return contactData
                    }
                })
                let contactData = {"nom":newParsedContact[0]._nom,
                "prenom":newParsedContact[0]._prenom,
                "bio":newParsedContact[0]._bio,"mail":newParsedContact[0]._mail,
                "tel":newParsedContact[0]._tel}
                
                let contact = new Contact(contactData);
                let form = new Form();

                let previewImg = newParsedContact[0]._profile_photo
                form.fill(contact,previewImg,Searchedindex)
                // console.log(contact)
    
            })
        })
    }
    /**
     * 
     */
    render(){
        let contactItemsWrapper = document.querySelector('.content-list__items');
        contactItemsWrapper.innerHTML = '';
        this._contacts.forEach((contact,index) => {
            let item = (new ContactCard(contact,index)).render();
            contactItemsWrapper.appendChild(item)
        });
        this._deletebtns = document.querySelectorAll('.delete_contact');
        this._updatebtns = document.querySelectorAll('.update_contact');

        // écoutes les evts d'update et de delete
        this.deleteContactListener();
        this.updateContactListener();
    }
    /**
     * 
     */
    renderEmpty(){
        let contactItemsWrapper = document.querySelector('.content-list__items');
        contactItemsWrapper.innerHTML = '';
        let h1 = document.createElement('h1');
        h1.innerText = 'La liste de contact est vide pour l\'instant';
        contactItemsWrapper.appendChild(h1);
    }
}
export default ContactList;