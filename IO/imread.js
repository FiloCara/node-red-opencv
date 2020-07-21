const cv = require('opencv4nodejs')

module.exports = function(RED) {

    function ImRead(config) {
        RED.nodes.createNode(this, config);
        var node  = this;
        node.filepath = config.filepath;
        node.flag = config.flag;
        node.on('input', function(msg) {
            if (msg.hasOwnProperty('filepath') === true) {
                node.filepath = msg.filepath
            }
            msg.payload = cv.imread(node.filepath, node.flag)
            msg.payload = cv.imencode('.jpg', msg.payload).toString('base64');
            node.send(msg);
        })
    }
    RED.nodes.registerType("imread",ImRead);
};

