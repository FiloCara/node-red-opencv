const cv = require('opencv4nodejs');
const utils = require('../utils');

module.exports = function(RED) {
    function Arithmetic(config) {
        RED.nodes.createNode(this, config);
        var node  = this;
        node.operation = config.operation;
        node.scalar = parseFloat(config.scalar);
        node.outputFormat = config.outputFormat;

        node.on('input', function(msg) {
            // Read incoming picture
            let previousImage = utils.readImageMsg(msg.payload);

            if (node.operation === "mul") {
                msg.payload = previousImage.mul(node.scalar);
            }
            else if (node.operation === "div") {
                msg.payload = previousImage.div(node.scalar);
            }
            else if (node.operation === "add") {
                // Create a Mat object filled with the scalar value
                scalarMat = new cv.Mat(previousImage.rows, previousImage.cols, previousImage.type, Array(previousImage.channels).fill(node.scalar));
                // Add scalarMat to the current image
                msg.payload = previousImage.add(scalarMat);
            }
            else {
                // Create a Mat object filled with the scalar value
                scalarMat = new cv.Mat(previousImage.rows, previousImage.cols, previousImage.type, Array(previousImage.channels).fill(node.scalar))
                // Add scalarMat to the current image
                msg.payload = previousImage.sub(scalarMat)
            }
            // Encode
            msg.payload = utils.prepareImageMsg(msg.payload, node.outputFormat)
            node.send(msg);
        });
    }
    RED.nodes.registerType('arithmetic', Arithmetic)
};

