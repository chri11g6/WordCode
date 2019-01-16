function randomTal(max){
    return Math.floor(Math.random() * max);
}

function buttonClick(data){
    game.check(data);
}

class displayObject {
    constructor(HTMLobject){
        this.HTMLobject = HTMLobject;
        this.text = "";
        this.row = null;
        this.col = null;
    }

    update() {
        let data = DisplayData[randomTal(DisplayData.length)];
        this.text = data.text;
        this.col = data.col;
        this.row = data.row;
        this.HTMLobject.innerText = this.text;
    }
}

class buttonObject {
    constructor(HTMLobject, row, col){
        this.HTMLobject = HTMLobject;
        this.col = col;
        this.row = row;
        this.text = "";
        this.buttonList = [];
        let self = this;
        this.HTMLobject.addEventListener("click", function(){ buttonClick(self) });
    }

    update(x) {
        let data = ButtonText[x];
        this.text = data.text;
        this.buttonList = data.buttonList;
        this.HTMLobject.innerText = this.text;
    }
}

class hitBoxObject {
    constructor(HTMLobject, tal){
        this.tal = tal;
        this.HTMLobject = HTMLobject;
        this.isHit = false;
    }

    update(tal){
        if(this.tal <= tal){
            this.isHit = true;
        }else{
            this.isHit = false;
        }
        this.setHTML();
    }

    setHTML(){
        if(this.isHit){
            this.HTMLobject.classList.add("w3-green");
        }else{
            this.HTMLobject.classList.remove("w3-green");
        }
    }
}

class theGame {
    constructor(display, buttons, hitBox){
        this.display = new displayObject(display);
        this.buttons = [];
        this.hitBox = [];
        this.hitPoint = 0;
        this.buttonF = null;
        this.createButton(buttons);
        this.createHitBox(hitBox);
        this.update();
    }

    rest(){
        this.hitPoint = 0;
        this.update();
    }

    update(){
        if(this.hitPoint > 5){

            alert("Don");
            this.rest();
            return;
        }

        // display update
        this.display.update();

        // button update
        let dataX = [];

        while (dataX.length < 6){
            let tal = randomTal(ButtonText.length);
            if(dataX.indexOf(tal) == -1){
                dataX.push(tal);
            }
        }

        for(let row = 0; row < this.buttons.length; row++){
            for(let col = 0; col < this.buttons[row].length; col++){
                this.buttons[row][col].update(dataX.shift());
            }
        }

        // hitbox update
        for(let i = 0; i < this.hitBox.length; i++){
            this.hitBox[i].update(this.hitPoint);
        }
        this.findWord();
    }

    findWord(){
        let button = this.buttons[this.display.row][this.display.col];
        
        this.buttonF = null;

        for(let i = 0; i < button.buttonList.length; i++){
            for(let row = 0; row < this.buttons.length; row++){
                for(let col = 0; col < this.buttons[row].length; col++){
                    if(this.buttonF != null){
                        break;
                    }

                    if(this.buttons[row][col].text == button.buttonList[i]){
                        this.buttonF = this.buttons[row][col];
                    }
                }
            }
        }
    }

    check(data){
        if(this.buttonF.text == data.text){
            // console.log("don");
            this.hitPoint++;
            this.update();
        }else{
            this.rest();
        }
    }

    createHitBox(hitBox){
        for(let i = 0; i < hitBox.length; i++){
            this.hitBox.push( new hitBoxObject(hitBox[i], (i + 1)));
        }
    }

    createButton(buttons){
        for(let row = 0; row < buttons.length; row++){
            this.buttons.push([]);
            for(let col = 0; col < buttons[row].length; col++){
                this.buttons[row].push(new buttonObject(buttons[row][col], row, col));
            }
        }
    }

    // buttonClick(data){
    //     if(this.buttonF.text = data.text){
    //         console.log("don");
    //     }
    // }
}