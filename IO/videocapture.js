const cv = require('opencv4nodejs')

module.exports = function(RED) {

    function VideoCapture(config) {
        RED.nodes.createNode(this, config);
        var node  = this;
        node.devicePort = config.devicePort;
        const vCap = new cv.VideoCapture(node.devicePort);
        node.on('input', function(msg) {
            msg.payload = vCap.read();
            msg.payload = cv.imencode('.jpg', msg.payload).toString('base64');
            node.send(msg);
        })

        node.on('close', function() {
            vCap.release()
        })
    }
    RED.nodes.registerType("videocapture",VideoCapture);
};