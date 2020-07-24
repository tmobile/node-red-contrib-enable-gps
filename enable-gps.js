module.exports = function(RED) {
    function EnableGPSNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var SerialPort = require("serialport");
            var serialPort = new SerialPort("/dev/ttyUSB2", {
                baudRate: 115200
            });
            serialPort.on("open", function() {
                console.log('PORT OPEN');
                serialPort.write(new Buffer.from("AT+QGPS=1\r", 'utf8'), function(err, results) {
                    console.log("GPS MODE: AT+QGPS=1\r");
                    setTimeout(function(){
                       serialPort.close(function (err){
                           console.log('PORT CLOSED');
                       });
                    }, 3000);
                });
            });
            node.send(msg);
        });
    }
    RED.nodes.registerType("enable-gps",EnableGPSNode);
}
