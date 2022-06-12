import Contact from "../models/Contact.js";
import ContactCard from "./ContactCard.js";

class ContactList
{
    _contacts;
    _deletebtns;
    updateContactList(){
        let UnparseContactList = localStorage.getItem('contacts');
        let ParsedContactList = JSON.parse(UnparseContactList);
        if (ParsedContactList == null || ParsedContactList.length == 0) {
            this.renderEmpty();
        }else{
            this._contacts = ParsedContactList.map(contactData => {
                let data = {"prenom":contactData._prenom,"nom":contactData._nom,"groupe":contactData._groupe,"profile_photo":contactData._profile_photo,"bio":contactData._bio}
                return new Contact(data);
            });
            this.render();
        }
       
    }
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
    render(){
        let contactItemsWrapper = document.querySelector('.content-list__items');
        contactItemsWrapper.innerHTML = '';
        this._contacts.forEach((contact,index) => {
            let item = (new ContactCard(contact,index)).render();
            contactItemsWrapper.appendChild(item)
        });
        this._deletebtns = document.querySelectorAll('.delete_contact');
        this.deleteContactListener()
    }
    renderEmpty(){
        let contactItemsWrapper = document.querySelector('.content-list__items');
        contactItemsWrapper.innerHTML = '';
        let h1 = document.createElement('h1');
        h1.innerText = 'La liste de contact est vide pour l\'instant';
        contactItemsWrapper.appendChild(h1);
    }
}
export default ContactList;