const cv = require('opencv4nodejs')

module.exports = function(RED){

    function Resize(config){
        RED.nodes.createNode(this, config);
        var node  = this;
        node.on('input', function(msg) {
            // Decode img
            decodedPic = cv.imdecode(Buffer.from(msg.payload,'base64'))

            // Resize picture according to method choosen by the user
            switch(config.method) {
                case "Rescale":
                    node.rescale = parseFloat(config.rescale);
                    msg.payload = decodedPic.rescale(node.rescale)
                    break;
                case "Resize":
                    node.resizeX = parseFloat(config.resizeX);
                    node.resizeY = parseFloat(config.resizeY);
                    msg.payload = decodedPic.resize(node.resizeX, node.resizeY)
                    break;
                case "ResizeToMax":
                    node.resizetomax = parseFloat(config.resizetomax);
                    msg.payload = decodedPic.resizeToMax(node.resizetomax)
            }
            // Encode
            msg.payload = cv.imencode('.jpg', msg.payload).toString('base64');
            node.send(msg);
        });
    }
    RED.nodes.registerType("resize",Resize);
}