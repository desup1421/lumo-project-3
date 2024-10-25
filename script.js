//This is a parent class which is can be extended make it full fill  Open/Close Principle(OCP). It is also following the principle of inheritance and polymorphism. Then,this class also only have one responsibility to do a simple development, make it follow the principle of single responsibility(SRP).
class Depeloper{
    constructor(name) {
        this.name = name;
        this.responsibilities = []; 
    }
    addResponsibility(responsibility) {
        this.responsibilities.push(this[responsibility].bind(this));
    }
    code(){
        console.log(this.name + " is coding");
    }

    createGit() {
        console.log(this.name + " is creating git");
    }

    debug() {
        console.log(this.name + " is debugging");
    }
    work(){
        this.responsibilities.forEach(responsibility => {
            responsibility();
        });
    }
}

//This class is an independent class, which is can be used by Frontend.
class UIUXDesigner {
    constructor(name) {
        this.name = name;
    }
    createDesign() {
        console.log(this.name + " is creating Design");
    }
}


// Class Frontend is an extension/child of Depeloper. He can accept the design from UIUXDesigner or make his own design if there is no UIUXDesigner. In here the designer is optional, and Frontend not depend on UIUXDesigner (DIP) as parameter, but may use other sources. This class also can be used to replace Depeloper (LSV), and focus on the frontend development follow the SRP.
class Frontend extends Depeloper{
    constructor(name, design){
        super();
        this.name = name;
        this.design = design;
        this.responsibility = [];
    }
    
    createDesign() { //This is conditional statement, which is Frontend can use design from UIUXDesigner or make his own design if there is no UIUXDesigner.
        if (this.design) {
            this.design.createDesign();
            return;
        }
        console.log(this.name + " is creating Design");
    }
    createUI() {
        console.log(this.name + " is creating UI");
    }
    createUX() {
        console.log(this.name + " is creating UX");
    }
    createAnimation() {
        console.log(this.name + " is creating Animation");
    }
}

// Class Backend is an extension/child (Inheritance) of Depeloper. It is focus on backend logic, make it follow the principle of single responsibility(SRP). 
class Backend extends Depeloper{
    constructor(name){
        super();
        this.name = name;
    }

    createBackend() {
        console.log(this.name + " is creating Backend");
    }
    createDB() {
        console.log(this.name + " is creating DB");
    }
    createAPI() {
        console.log(this.name + " is creating API");
    }
    createServer() {
        console.log(this.name + " is creating Server");
    }
    createCloud() {
        console.log(this.name + " is creating Cloud");
    }
}

//
class FullStack extends Depeloper{
    constructor(name, frontend, backend){
        super();
        this.name = name;
        this.frontend = frontend;
        this.backend = backend;
    }

    createDesign() {
        this.frontend.createDesign();
    }
    createUI() {
        this.frontend.createUI();
    }
    createUX() {
        this.frontend.createUX();
    }
    createAnimation() {
        this.frontend.createAnimation();
    }
    createBackend() {
        this.backend.createBackend();
    }
    createDB() {
        this.backend.createDB();
    }
    createAPI() {
        this.backend.createAPI();
    }
    createServer() {
        this.backend.createServer();
    }
    createCloud() {
        this.backend.createCloud();
    }
}

class WebsiteProject {
    constructor() {
        this.developers = [];
    }

    addDeveloper(developer) {
        if (developer instanceof Depeloper) {
            this.developers.push(developer);
        } else {
            console.log("Invalid developer");
        }
    }

    developWebsite(){
        this.developers.forEach(developer => {
            developer.work();
        });
    }
}

//Instace of UIUXDesigner, in case this project hire a designer
const designer = new UIUXDesigner("designer");

//Instance of Frontend
const frontend = new Frontend("frontend", designer);
//add responsibility to frontend
frontend.addResponsibility('createDesign');
frontend.addResponsibility('createUI');
frontend.addResponsibility('createUX');

///Instance of Backend
const backend = new Backend("backend");
//add responsibility to backend
backend.addResponsibility('createBackend');
backend.addResponsibility('createDB');


//Instance of FullStack
const fullstack = new FullStack("fullstack", new Frontend("fullstack"), new Backend("fullstack"));
//add responsibility to fullstack
fullstack.addResponsibility('createAnimation');
fullstack.addResponsibility('createAPI');

const developer = new Depeloper("developer");
//add responsibility to developer
developer.addResponsibility('code');

//Instance of WebsiteProject
const websiteProject = new WebsiteProject();
//add developer to websiteProject
websiteProject.addDeveloper(developer);
websiteProject.addDeveloper(frontend);
websiteProject.addDeveloper(backend);
websiteProject.addDeveloper(fullstack);
//develop website
websiteProject.developWebsite();