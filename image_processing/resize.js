const cv = require('opencv4nodejs')
const utils = require('../utils')

module.exports = function(RED){

    function Resize(config){
        RED.nodes.createNode(this, config);
        var node  = this;
        node.method = config.method
        node.outputFormat = config.outputFormat
        node.on('input', function(msg) {
            // Decode img
            let previousImage = utils.readImageMsg(msg.payload)
            console.log(previousImage)

            // Resize picture according to method choosen by the user
            switch(node.method) {
                case "Rescale":
                    node.rescale = parseFloat(config.rescale);
                    msg.payload = previousImage.rescale(node.rescale)
                    break;
                case "Resize":
                    node.resizeX = parseFloat(config.resizeX);
                    node.resizeY = parseFloat(config.resizeY);
                    msg.payload = previousImage.resize(node.resizeX, node.resizeY)
                    break;
                case "ResizeToMax":
                    node.resizetomax = parseFloat(config.resizetomax);
                    msg.payload = previousImage.resizeToMax(node.resizetomax)
            }
            // Encode
            msg.payload = utils.prepareImageMsg(msg.payload, node.outputFormat)
            node.send(msg);
        });
    }
    RED.nodes.registerType("resize",Resize);
}