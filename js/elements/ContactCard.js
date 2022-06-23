class ContactCard
{
    constructor(contact,index){
        this.$contact = contact
        this.$index = index
    }
    render(){
        // console.log(this.$contact)
        let wrapper = document.createElement('div');
        wrapper.classList.add('content-list__items__item');
        let wrapper_content = /*html*/`
            <div class="img" data-index="${this.$index}">
                <img src="${this.$contact.profile_photo}" alt="" data-index="${this.$index}">
            </div>
            <div class="text">
                <span>${this.$contact.prenom} ${this.$contact.nom} - ${this.$contact.groupe}</span>
                <p>${this.$contact.tel}</p>
                <p>${this.$contact.bio}</p>
            </div>
            <div class="action ">
                <div data-index="${this.$index}" class="update_contact">
                    <i class="fas fa-user-edit"  aria-hidden="true" data-index="${this.$index}"></i>
                </div>
                <div data-id="${this.$index}" class="delete_contact">
                    <i class="fa fa-trash" aria-hidden="true" data-id="${this.$index}"></i>
                </div>
            </div>
        `;
        wrapper.innerHTML = wrapper_content;
        return wrapper;
    }
}
export default ContactCard;