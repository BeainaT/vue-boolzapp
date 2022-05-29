const app = new Vue ({
    el: "#container",
    data: {
        currentIndex: 0,
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
        myText: "",
        mySearch: "",
        msgMenu: false,
    },
    methods: {
        sendMessage() {
            //set currentDate with luxon library
            let myDate = luxon.DateTime;
            //create an obj to send message --notice that the date now will be formatted in HH.mm only
            let myMessage = {"message" : this.myText, "status" : 'sent', "date" : myDate.now().toFormat("dd/MM/yyyy HH:mm:ss")};
            let indexTiming = this.currentIndex;
            if(this.myText !== "" && this.myText.charAt(0) !== " ") {
                //push obj in array to make it iterable
                this.contacts[indexTiming].messages.push(myMessage);
                this.myText = "";
                //used arrow function to read this scope
                setTimeout(() => {
                    let answer = {"message" : 'ok', "status" : 'received', "date" : myDate.now().toFormat("dd/MM/yyyy HH:mm:ss")};
                    this.contacts[indexTiming].messages.push(answer);
                }, 1000);
            }
        },
        getContact() {
            this.contacts.forEach(contact => {
                contact.visible = true;
                if(!contact.name.toLowerCase().startsWith(this.mySearch.toLowerCase()) && this.mySearch !== "") {
                    contact.visible = false;
                }                
            });
        },
        //function that returns the last hour in messages array
        getLastHour(contact) {
            //assign luxon.DateTime value to my const 
            let DateHour = luxon.DateTime;
            //set const as last messages element
            const lastMsgTime = contact.messages[contact.messages.length - 1];
            //return another format of lastMsgTime in date
            return DateHour.fromFormat(lastMsgTime.date, "dd/MM/yyyy HH:mm:ss").toFormat("HH:mm");
        },
        //function that returns the last message in messages array
        getLastMessage(contact) {
            const lastMsg = contact.messages[contact.messages.length - 1].message;
            return lastMsg;
        },
        //function that returns the last msg hour for each messages array
        getHourFormat(elm) {
            let DateHour = luxon.DateTime;
            return DateHour.fromFormat(elm.date, "dd/MM/yyyy HH:mm:ss").toFormat("HH:mm");
        },
        toggleMenu() {
            this.msgMenu = !this.msgMenu
        },
    }
});


