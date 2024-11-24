function chatForm_open() {
    document.getElementById("chatForm").style.display = "block";
}

function chatForm_close() {
    document.getElementById("chatForm").style.display = "none";
}

var url = "ws://localhost:61614";
var myUserId = "guest1";
var sendTo = "/topic/demo-chat"
var recvFrom = sendTo
var client;
var connected = false

function setDefaultValues(){
    document.getElementById("i_URL").value = url;
    document.getElementById("i_myUserId").value = myUserId;
    document.getElementById("i_sendTo").value = sendTo;
    document.getElementById("i_recvFrom").value = recvFrom;
}

function readConnectionValues(){
    url = document.getElementById("i_URL").value;
    myUserId = document.getElementById("i_myUserId").value;
    sendTo = document.getElementById("i_sendTo").value;
    recvFrom = document.getElementById("i_recvFrom").value;
}

//main
setDefaultValues();
p_messages = document.getElementById("p_messages");
btn_connect = document.getElementById("btn_connect");
btn_connect.onclick = function () {
    //connect
    if (!connected) {
        readConnectionValues();
        p_messages.innerHTML = "";
        client = Stomp.client(url);
        client.connect("tabllo_user", "tabllo12345", function () {
            connected = true;
            btn_connect.innerHTML = "Disconnect"
            document.getElementById("l_connStatus").innerHTML = "Connected";
            if(recvFrom != "")
            {
                client.subscribe(recvFrom, function (message) {
                    p_messages.innerHTML = p_messages.innerHTML + message.headers.userId + ": " + message.body + "<br>";
                })
            }
        });
    }
    else {
        client.disconnect(function() {
            connected = false;
            btn_connect.innerHTML = "Connect"
            document.getElementById("l_connStatus").innerHTML = "Disconnected";
        });
    }
}
var btn_send =  document.getElementById("btn_send");
btn_send.onclick = function(){
    i_myUserId = document.getElementById("i_myUserId");
    txt_msg =  document.getElementById("txt_msg");
    client.send(sendTo, {userId:i_myUserId.value}, txt_msg.value);
}

