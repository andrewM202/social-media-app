$(document).ready(function () {

    // create connection to server, pass url to server
    // create socket object to do stuff with sockets
    let socket = io.connect("http://127.0.0.1:5000");
    let socket_broadcast = io.connect("http://127.0.0.1:5000/broadcast-message");
    // namespace is called private-message
    let socket_private_message = io("http://127.0.0.1:5000/private-message");

    // socket.on to listen for an event. When the server is started, the connect event fires, which is what is happening below
    socket_broadcast.on("connect", function () {
        socket_broadcast.send("User " + username + " has connected.");
    });

    // have data to send, so paramter in callback function
    socket_broadcast.on("message", function (message_details) {
        // append whatever the message is to my list of messages
        if(message_details.message.length > 0) { 
            if(message_details.user == username) {
                $("#messages").append("<li>" + message_details.user + ": "  + message_details.message + "</li>")
                $("li:last").css("align-self", "flex-start")
            } else {
                $("#messages").append("<li>" + message_details.user + ": "  + message_details.message + "</li>")
                $("li:last").css("align-self", "flex-end")
            }
        }
        // if the user presses return, send the message if its length is greater than 0
        $("html").keypress(function(event) {
            let key = event.which;
            if(key == 13) {
                if(message_details.message.length > 0) {
                    socket_broadcast.send($("#myMessage").val());
                    $("#myMessage").val("");
                }
            }
        });
    });

    $("#sendbutton").on("click", function () {
        // send a message
        socket_broadcast.send($("#myMessage").val());
        $("#myMessage").val("");
    });

});

