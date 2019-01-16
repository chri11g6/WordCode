let display = document.getElementById("display-text");
let buttons = [
    [document.getElementById("button1"), document.getElementById("button2")],
    [document.getElementById("button3"), document.getElementById("button4")],
    [document.getElementById("button5"), document.getElementById("button6")]
];
let hitBox = [
    document.getElementById("hitBox1"),
    document.getElementById("hitBox2"),
    document.getElementById("hitBox3"),
    document.getElementById("hitBox4"),
    document.getElementById("hitBox5")
];

let game= new theGame(display,buttons,hitBox);