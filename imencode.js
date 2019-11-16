const cv = require('opencv4nodejs')

module.exports = function(RED) {

    function ImEncode(config) {
        RED.nodes.createNode(this, config);
        var node  = this;
        node.on('input', function(msg) {
            msg.payload = cv.imencode('.jpg',msg.payload).toString('base64');
            node.send(msg);
        })
    }
    RED.nodes.registerType("imencode",ImEncode);
};

