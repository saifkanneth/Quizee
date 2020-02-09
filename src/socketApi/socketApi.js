import * as Colyseus from "colyseus.js";

export class SocketAPI {
    constructor() {
        this.connectionObj = null;


        this.socketUrl = "ws://3.229.239.234:2567"
        this.endPoints = {
            "start": "/start",
            "exit": "/exit",
            "submit": "/submit",
            "scoreboard": "/scoreboard",

        }


        this.open = this.open.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }
    open() {
        console.log("Opening")
        this.connectionObj = new Colyseus.Client(this.socketUrl);
        console.log(this.connectionObj.send, " connection Obj")
        this.connectionObj.getAvailableRooms().then(room => {
            console.log("Joined")
        }, err => {
            console.log(err)
        });
    }
    onOpen() {
        console.log("Connection Successfull!");
        this.connectionObj.send("My name is John");
    }
    onMessage(_msg) {
        console.log(_msg, " message Recieved")
    }
}