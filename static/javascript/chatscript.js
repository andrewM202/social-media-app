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
        // load messages
        socket.emit("load_messages")
        // send "user has connected" message when entering chatroom
        if(previously_in_chatroom == false) {
            socket.send(username + " has joined the room!");
        }
    });

    socket.on("add like", function(likes_info) {
        console.log(likes_info.postid)
        $("#messages").find(`[postid=${likes_info.postid}]`).children("h5").html(`${likes_info.likes} &#x1F44D;`)
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
            // if the post is from the current user
            if(message_log[x].user == username) {
                $("#messages").append("<li></li>");
                let user = document.createTextNode(message_log[x].user)
                let message = document.createTextNode(message_log[x].message)
                let postdate = document.createTextNode(message_log[x].postdate)
                // if its a joined the room message, don't allow delete button
                if(message_log[x].message.indexOf("has joined the room!") != -1 ) {
                    $("li:last").css({"align-self": "flex-start", "background": "#8ab6d6"}).html(`<div><div><h3></h3><time></time></div><div class='settings'>&#1422;</div></div><p></p><h5>${message_log[x].likes} &#x1F44D;</h5>`)
                    // add settings-list to settings, with hidden property
                    $("li:last .settings").append("<div class='settings-list-left'><button class='like-button'>Add Like</button></div>")
                    $("li:last .settings-list-left").hide()
                } else {
                    $("li:last").css({"align-self": "flex-start", "background": "#8ab6d6"}).html(`<div><div><h3></h3><time></time></div><div class='settings'>&#1422;</div></div><p></p><h5>${message_log[x].likes} &#x1F44D;</h5>`)
                    $("li:last .settings").append("<div class='settings-list-left'><button class='delete-button'>Delete Message</button><button class='like-button'>Add Like</button></div>")
                    $("li:last .settings-list-left").hide()
                }
                document.querySelector("li:last-child").querySelector("time").appendChild(postdate)
                document.querySelector("li:last-child").querySelector("h3").appendChild(user)
                document.querySelector("li:last-child").querySelector("p").appendChild(message)
            } else { // if user of the message is different user than current logged in one, add flex-end
                $("#messages").append("<li></li>");
                $("li:last").css({"align-self": "flex-end"}).html(`<div><div><h3></h3><time></time></div><div class='settings'>&#1422;</div></div><p></p><h5>${message_log[x].likes} &#x1F44D;</h5>`)
                // add settings-list to settings, with hidden property
                $("li:last .settings").append("<div class='settings-list-right'><button class='like-button'>Add Like</button></div>")
                $("li:last .settings-list-right").hide()
                let user = document.createTextNode(message_log[x].user)
                let message = document.createTextNode(message_log[x].message)
                let postdate = document.createTextNode(message_log[x].postdate)
                document.querySelector("li:last-child").querySelector("time").appendChild(postdate)
                document.querySelector("li:last-child").querySelector("h3").appendChild(user)
                document.querySelector("li:last-child").querySelector("p").appendChild(message)
            }
            // add settings button event listener
            $("li:last .settings").click(function() {
                $(this).children().toggle()
            });

            // add delete event listener to each delete button
            $("li:last .delete-button").click(function() {
                message_info = {"postid": message_log[x].postid}
                socket.emit("delete_message", message_info)
                $(this).parent().parent().remove()
            });

            // add like event listener to each like button
            $("li:last .like-button").click(function() {
                $(this).parent().parent().parent().parent().children("h5").text("")
                post_info = {"postid": message_log[x].postid, "username": String(username)}
                socket.emit("add_like", post_info)
            });

            // emoji like event listener
            $("li:last h5").click(function() {
                $(this).text("")
                post_info = {"postid": message_log[x].postid, "username": String(username)}
                socket.emit("add_like", post_info)
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
        if(message_details.user == username) {
            $("#messages").append("<li></li>");
            $("li:last").css({"align-self": "flex-start", "background": "#8ab6d6"}).html(`<div><div><h3></h3><time></time></div><div class='settings'>&#1422;</div></div><p></p><h5>${message_details.likes} &#x1F44D;</h5>`)
            $("li:last .settings").append("<div class='settings-list-left'><button class='delete-button'>Delete Message</button><button class='like-button'>Add Like</button></div>")
            $("li:last .settings-list-left").hide()
            let user = document.createTextNode(message_details.user)
            let message = document.createTextNode(message_details.message)
            let postdate = document.createTextNode(message_details.postdate)
            document.querySelector("li:last-child").querySelector("time").appendChild(postdate)
            document.querySelector("li:last-child").querySelector("h3").appendChild(user)
            document.querySelector("li:last-child").querySelector("p").appendChild(message)
            // set the postid of the just created message
            $("li:last").attr("postid", message_details.postid)
        } else {
            $("#messages").append("<li></li>");
            $("li:last").css({"align-self": "flex-end"}).html(`<div><div><h3></h3><time></time></div><div class='settings'>&#1422;</div></div><p></p><h5>${message_details.likes} &#x1F44D;</h5>`)
            $("li:last .settings").append("<div class='settings-list-right'><button class='delete-button'>Delete Message</button><button class='like-button'>Add Like</button></div>")
            $("li:last .settings-list-right").hide()
            let user = document.createTextNode(message_details.user)
            let message = document.createTextNode(message_details.message)
            let postdate = document.createTextNode(message_details.postdate)
            document.querySelector("li:last-child").querySelector("time").appendChild(postdate)
            document.querySelector("li:last-child").querySelector("h3").appendChild(user)
            document.querySelector("li:last-child").querySelector("p").appendChild(message)
            // set the postid of the just created message if its current client
            $("li:last").attr("postid", message_details.postid)
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

         // add settings button event listener
        $("li:last .settings").click(function() {
            $(this).children().toggle()
        });

        // add delete event listener to each delete button
        $("li:last .delete-button").click(function() {
            console.log(message_details.postid)
            message_info = {"postid": message_details.postid}
            socket.emit("delete_message", message_info)
            $(this).parent().parent().parent().parent().remove()
        });

        // like button event listener
        $("li:last .like-button").click(function() {
            $(this).parent().parent().parent().parent().children("h5").text("")
            post_info = {"postid": message_details.postid, "username": String(username)}
            socket.emit("add_like", post_info)
        });

        // emoji like event listener 
        $("li:last h5").click(function() {
            $(this).text("")
            post_info = {"postid": message_details.postid, "username": String(username)}
            socket.emit("add_like", post_info)
        });

    });

});

