import ContactList from "./elements/ContactList.js";
import Form from "./elements/Form.js"; 
import Contact from "./models/Contact.js";

class App
{
    constructor(){
        let form = new Form();
        this.$form = form
        this.$contactList = new ContactList()
    }
    
    run(){
        this.$form.onImageChange();
        this.$form.onDrag();
        this.$form.onSubmit();
        this.$form.ListenReset(this.$contactList);
        this.$contactList.updateContactList();
        Contact.subscribe(this.$contactList);
    }
}
let app = new App();
app.run();