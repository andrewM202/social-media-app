$(document).ready(function () {

    // create connection to server, pass url to server
    // create socket object to do stuff with sockets
    // socket.on to listen for an event. When the server is started, the connect event fires, which is what is happening below
    if (window.location.protocol == "https:") {
      var ws_scheme = "wss://";
    } else {
      var ws_scheme = "ws://"
    };

    var socket = io.connect(ws_scheme + location.host);
    
    socket.on("connect", function () {
        // send "user has connected" message when entering chatroom
        if(previously_in_chatroom == false) {
            socket.send(username + " has joined the room!");
        }
        // load messages
        socket.emit("load_messages")
    });

    socket.on("delete message", function(message_to_delete) {
        $("#messages").find(`[postid=${message_to_delete}]`).remove()
    });

    // socket event for loading in all the messages
    socket.on("load messages", function(message_log) {
        message_log_length = Object.keys(message_log).length - 1;
        //create user's message
        // loop through all messages given
        for(let x = message_log_length; x >= 0; x--) {
            if(message_log[x].user == username) {
                $("#messages").append("<li></li>");
                let user_message_details = document.createTextNode(message_log[x].user)
                let message_message_details = document.createTextNode(message_log[x].message)
                // if its a joined the room message, don't allow delete button
                if(message_log[x].message.indexOf("has joined the room!") == -1 ) {
                    $("li:last").css({"align-self": "flex-start", "background": "#8ab6d6"}).html("<div><h3></h3><button>Delete Message</button></div><p></p>")
                } else {
                    $("li:last").css({"align-self": "flex-start", "background": "#8ab6d6"}).html("<div><h3></h3></div><p></p>")
                }
                document.querySelector("li:last-child").querySelector("h3").appendChild(user_message_details)
                document.querySelector("li:last-child").querySelector("p").appendChild(message_message_details)
            } else { // if user of the message is different user than current logged in one, add flex-end
                $("#messages").append("<li></li>");
                $("li:last").css("align-self", "flex-end").html("<div><h3></h3></div><p></p>")
                let user_message_details = document.createTextNode(message_log[x].user)
                let message_message_details = document.createTextNode(message_log[x].message)
                document.querySelector("li:last-child").querySelector("h3").appendChild(user_message_details)
                document.querySelector("li:last-child").querySelector("p").appendChild(message_message_details)
            }
            //add delete event listener to each button
            $("li:last button").click(function() {
                message_info = {"postid": message_log[x].postid}
                socket.emit("delete_message", message_info)
                $(this).parent().parent().remove()
            });

            // add postid attribute
            $("li:last").attr("postid", message_log[x].postid)
        }
        // Have the latest message scroll into view if it exists
        if($("li:last")[0] !== undefined) {
            $("li:last")[0].scrollIntoView({block: "nearest"});
        }

        // create event listener to make chat li glow when scrolled over
        $("#messages li").on("mouseenter", function() {
            $(this).css("box-shadow", "0px 16px 24px 2px rgba(0,0,0,0.14) , 0px 6px 30px 5px rgba(0,0,0,0.12) , 0px 8px 10px -7px rgba(0,0,0,0.2)" )
        });

        // remove box shadow when leaving chat li
        $("#messages li").on("mouseleave", function() {
            $(this).css("box-shadow", "none" )
        });
    });

    // send the message if the user presses return
    $("html").keypress(function(event) {
        let key = event.which;
        if(key == 13) {
            if($("#myMessage").val().length > 0) {
                socket.send($("#myMessage").val());
                $("#myMessage").val("");
            }
        }
    });

    // send the message if user clicks on the send button
    $("#sendbutton").on("click", function () {
        // send only if message has a length
        if($("#myMessage").val().length > 0) {
            socket.send($("#myMessage").val());
            $("#myMessage").val("");
        }
    });

    // have data to send, so paramter in callback function
    socket.on("message", function (message_details) {
        // append whatever the message is to list of messages
        let prevPostId = parseInt($("li:last").attr("postid"))
      
        // add the message to the HTML
        $("#messages").append("<li></li>");
        $("li:last").css({"align-self": "flex-start", "background": "#8ab6d6"}).html("<div><h3></h3><button>Delete Message</button></div><p></p>")
        let user = document.createTextNode(username)
        let msg = document.createTextNode(message_details.message)
        document.querySelector("li:last-child").querySelector("h3").appendChild(user)
        document.querySelector("li:last-child").querySelector("p").appendChild(msg)
        // set the postid of the just created message
        $("li:last").attr("postid", prevPostId+1)

        // Have the latest message scroll into view if it exists
        if($("li:last")[0] !== undefined) {
            $("li:last")[0].scrollIntoView({block: "nearest"});
        }

        // create event listener to make chat li glow when scrolled over
        $("#messages li").on("mouseenter", function() {
            $(this).css("box-shadow", "0px 16px 24px 2px rgba(0,0,0,0.14) , 0px 6px 30px 5px rgba(0,0,0,0.12) , 0px 8px 10px -7px rgba(0,0,0,0.2)" )
        });

        // remove box shadow when leaving chat li
        $("#messages li").on("mouseleave", function() {
            $(this).css("box-shadow", "none" )
        });

        $("li:last button").click(function() {
            message_info = {"postid": prevPostId+1}
            socket.emit("delete_message", message_info)
            $(this).parent().parent().remove()
        });
    });

});

