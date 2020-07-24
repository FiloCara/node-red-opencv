const cv = require('opencv4nodejs')
const utils = require('../utils')

module.exports = function(RED){

    function Rotate(config){
        RED.nodes.createNode(this, config);
        var node  = this;
        node.method = config.method
        node.outputFormat = config.outputFormat

        switch(node.method) {
            case "90":
                node.angle = cv.ROTATE_90_CLOCKWISE;
                break;
            case "180":
                node.angle = cv.ROTATE_180;
                break;
            case "-90":
                node.angle = cv.ROTATE_90_COUNTERCLOCKWISE;
                break;
        }

        node.on('input', function(msg) {
            // Read incoming picture
            let previousImage = utils.readImageMsg(msg.payload)
            
            msg.payload = previousImage.rotate(node.angle)

            // Encode
            msg.payload = utils.prepareImageMsg(msg.payload, node.outputFormat)
            node.send(msg);
        });
    }
    RED.nodes.registerType("rotate",Rotate);
}