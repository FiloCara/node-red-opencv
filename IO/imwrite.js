const cv = require('opencv4nodejs')
const utils = require('../utils')

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
            let MatImage = utils.readImageMsg(msg.payload)
            cv.imwrite(node.filepath, MatImage)
        })
    }
    RED.nodes.registerType("imwrite",ImWrite);
};