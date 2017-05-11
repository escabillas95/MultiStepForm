
var i = 0;
var w;

function timedCount() {
    i = i + 1;
    self.postMessage(i);
    setTimeout("timedCount()",200);
}

timedCount();



function load(size){
    var xhttp = new XMLHttpRequest();
    xhttp.onReadyStateChange=function(){
        if(xhhtp.readyState==4 && xhhtp.status==200){
            var obj= JSON.parse(xhhtp.responseText);
            if (size <= Object.keys(obj).length){
                console.log(size);
                if (size== Object.keys(obj).length){
                    postMessage(obj);
                }else{
                    postMessage(size);
                }
            }
        }

    };
    xhttp.open("GET", "javascript/users.json", true);
    xhttp.send();

}

