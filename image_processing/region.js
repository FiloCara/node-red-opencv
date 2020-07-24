const cv = require('opencv4nodejs')
const utils = require('../utils')

module.exports = function(RED){

    function Region(config){
        RED.nodes.createNode(this, config);
        var node  = this;
        node.offsetx = parseInt(config.offsetx)
        node.offsety = parseInt(config.offsety)
        node.regionWidth = parseInt(config.regionWidth)
        node.regionHeight = parseInt(config.regionHeight)
        node.outputFormat = config.outputFormat

        node.on('input', function(msg) {
            // Read incoming picture
            let previousImage = utils.readImageMsg(msg.payload)

            msg.payload = previousImage.getRegion(new cv.Rect(node.offsetx, node.offsety, node.regionWidth, node.regionHeight))

            // Encode
            msg.payload = utils.prepareImageMsg(msg.payload, node.outputFormat)
            node.send(msg);
        });
    }
    RED.nodes.registerType("region",Region);
}