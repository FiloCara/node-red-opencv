const cv = require('opencv4nodejs')

module.exports = function(RED) {

    function ImWrite(config) {
        RED.nodes.createNode(this, config);
        var node  = this;
        node.filepath = config.filepath;
        node.on('input', function(msg) {
            if (msg.hasOwnProperty('filepath') === true) {
                node.filepath = msg.filepath
            }
            // Decode img
            decodedPic = cv.imdecode(Buffer.from(msg.payload,'base64'))
            cv.imwrite(node.filepath, decodedPic)
        })
    }
    RED.nodes.registerType("imwrite",ImWrite);
};