class ContactCard
{
    constructor(contact,index){
        this.$contact = contact
        this.$index = index
    }
    render(){
        let wrapper = document.createElement('div');
        wrapper.classList.add('content-list__items__item');
        let wrapper_content = /*html*/`
            <div class="img">
                <img src="${this.$contact.profile_photo}" alt="">
            </div>
            <div class="text">
                <span>${this.$contact.prenom}</span>
                <span>${this.$contact.nom}</span>
                <span>${this.$contact.groupe}</span>
                <p>${this.$contact.bio}</p>
            </div>
            <div data-id="${this.$index}" class="action delete_contact">
                x
            </div>
        `;
        wrapper.innerHTML = wrapper_content;
        return wrapper;
    }
}
export default ContactCard;