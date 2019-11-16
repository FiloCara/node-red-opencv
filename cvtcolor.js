const cv = require('opencv4nodejs')

module.exports = function(RED) {

    function CvtColor(config) {
        RED.nodes.createNode(this, config);
        var node  = this;
        switch(config.colorspace) {
            case "BGR2RGB":
                node.colorspace = cv.COLOR_BGR2RGB
            case "BGR2GRAY":
                node.colorspace = cv.COLOR_BGR2GRAY
            case "BGR2HLS":
                node.colorspace = cv.COLOR_BGR2HLS
            case "BGR2HSV":
                node.colorspace = cv.COLOR_BGR2HSV
            case "RGB2BGR":
                node.colorspace = cv.COLOR_RGB2BGR
            case "RGB2GRAY":
                node.colorspace = cv.COLOR_RGB2GRAY
            case "RGB2HLS":
                node.colorspace = cv.COLOR_RGB2HLS
            case "RGB2HSV":
                node.colorspace = cv.COLOR_RGB2HSV
            // Add others colorspace
        }
        node.on('input', function(msg) {
            // Decode img
            decodedPic = cv.imdecode(Buffer.from(msg.payload,'base64'))
            // Change color space
            msg.payload = decodedPic.cvtColor(node.colorspace)
            // Encode
            msg.payload = cv.imencode('.jpg', msg.payload).toString('base64');
            node.send(msg);
        })
    }
    RED.nodes.registerType("cvtcolor",CvtColor);
};

