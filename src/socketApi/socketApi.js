import * as Colyseus from "colyseus.js";

export class SocketAPI {
    constructor() {
        this.connectionObj = null;


        this.socketUrl = "ws://3.229.239.234:2567";
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
        console.log(this.connectionObj, " connection Obj")
        this.connectionObj.getAvailableRooms().then(rooms => {
            console.log("joined successfully", rooms);
        }).catch(e => {
            console.error("join error", e);
        });

        /* 
        "", {
            "user_id": "dwefsid87r32rhiwenj",
            "Room_id": "ifnsdkf8h4rforou3h",
            "quiz_type": "single",
            "no_of_question_per_quiz": 10,
            "questions_type": "text",
            "numbber_of_player": 2
        }
        */
    }
    onOpen() {
        console.log("Connection Successfull!");
        this.connectionObj.send("My name is John");
    }
    onMessage(_msg) {
        console.log(_msg, " message Recieved")
    }
}