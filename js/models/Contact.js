class Contact
{
    static _observers = [];

    constructor(data){
        this._nom = data.nom
        this._prenom = data.prenom
        this._bio = data.bio
        this._profile_photo = data.profile_photo
        this._groupe = data.groupe
    }
    static subscribe(observer){
        Contact._observers.push(observer)
    }
    get nom(){
        return this._nom
    }

    get prenom(){
        return this._prenom
    }

    get bio(){
        return this._bio
    }
    get profile_photo(){
        return this._profile_photo
    }
    get groupe(){
        return this._groupe;
    }

    notifyObserver(){
        Contact._observers.forEach(observer=>observer.updateContactList())
    }

    save(){
        let UnparseContactList = localStorage.getItem('contacts');
        let ParsedContactList = JSON.parse(UnparseContactList);

        if (ParsedContactList == null) {
            ParsedContactList = [this]
        }else{
            ParsedContactList.push(this);
        }
        localStorage.setItem('contacts',JSON.stringify(ParsedContactList));
        this.notifyObserver();
    }
}
export default Contact;