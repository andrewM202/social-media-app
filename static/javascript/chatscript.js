$(document).ready(function () {

    // create connection to server, pass url to server
    // create socket object to do stuff with sockets
    //let socket = io.connect("http://127.0.0.1:5000");
    //let socket_broadcast = io.connect("http://127.0.0.1:5000/broadcast-message");
    //http://' + document.domain + ':' + location.port + namespace
    //let socket = io.connect("wss://social-media-app421.herokuapp.com");
    //let socket_broadcast = io.connect("wss://social-media-app421.herokuapp.com/broadcast-message");

    let socket = ("https://" + document.domain + ":" + location.port)
    let socket_broadcast = ("https://" + document.domain + ":" + location.port + "/broadcast-message")

    // socket.on to listen for an event. When the server is started, the connect event fires, which is what is happening below
    
    socket_broadcast.on("connect", function () {
        // send "user has connected" message when entering chatroom
        if(previously_in_chatroom == false) {
            socket_broadcast.send(username + " has joined the room!");
        }
    }); 

    // have data to send, so paramter in callback function
    socket_broadcast.on("message", function (message_details) {
        // append whatever the message is to list of messages
        
        // When first connecting, append the last x amount of message
        // If length of object is greater than one, it is not singular message but message_log
        if(Object.values(message_details)[0].is_message_log) {
            // get length of message_log stored in last index of message_details object
            message_log_length = Object.keys(message_details).length - 1;
            //create user's message


            // loop through all messages given
            for(let x = message_log_length; x > 0; x--) {
                // if the user of that message is currently logged in user, add flex-start
                if(message_details[x].user == username) {
                    $("#messages").append("<li></li>");
                    $("li:last").css({"align-self": "flex-start", "background": "#8ab6d6"}).html("<h3>" + message_details[x].user + "</h3><p>" + message_details[x].message + "</p>");
                } else { // if user of the message is different user than current logged in one, add flex-end
                    $("#messages").append("<li></li>");
                    $("li:last").css("align-self", "flex-end").html("<h3>" + message_details[x].user + "</h3><p>" + message_details[x].message + "</p>");
                }
            }
        }
        // If a messge is sent and the length of the message is greater than 0
        else if(message_details.message.length > 0) {
            // if the user who posted the message is the current client, have the message be flex-start, left side of chat box
            if(message_details.user == username) {
                $("#messages").append("<li></li>");
                $("li:last").css({"align-self": "flex-start", "background": "#8ab6d6"}).html("<h3>" + message_details.user + "</h3><p>" + message_details.message + "</p>");
            } else { // if the user who posted the message is a different client, have the message be flex-end, right side of chat box
                $("#messages").append("<li></li>");
                $("li:last").css("align-self", "flex-end").html("<h3>" + message_details.user + "</h3><p>" + message_details.message + "</p>");
            }
        }

        // Have the latest message scroll into view if it exists
        if($("li:last")[0] !== undefined) {
            $("li:last")[0].scrollIntoView({block: "nearest"});
        }

        // send the mesage if the user presses return
        $("html").keypress(function(event) {
            let key = event.which;
            if(key == 13) {
                if($("#myMessage").val().length > 0) {
                    socket_broadcast.send($("#myMessage").val());
                    $("#myMessage").val("");
                }
            }
        });

        // send the message if user clicks on the send button
        $("#sendbutton").on("click", function () {
            // send only if message has a length
            if($("#myMessage").val().length > 0) {
                socket_broadcast.send($("#myMessage").val());
                $("#myMessage").val("");
            }
        });

        // create event listener to make chat li glow when scrolled over
        $("#messages li").on("mouseenter", function() {
            $(this).css("box-shadow", "0px 16px 24px 2px rgba(0,0,0,0.14) , 0px 6px 30px 5px rgba(0,0,0,0.12) , 0px 8px 10px -7px rgba(0,0,0,0.2)" )
        });

        // remove box shadow when leaving chat li
        $("#messages li").on("mouseleave", function() {
            $(this).css("box-shadow", "none" )
        });
    });
});

