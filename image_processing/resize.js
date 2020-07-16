const cv = require('opencv4nodejs')

module.exports = function(RED){

    function Resize(config){
        RED.nodes.createNode(this, config);
        var node  = this;
        node.x = config.x
        node.y = config.y
    }
    node.on('input', function(msg) {
        // Decode img
        decodedPic = cv.imdecode(Buffer.from(msg.payload,'base64'))
        // Resize picture according to X and Y values provided by user
        msg.payload = decodedPic.resize(node.x, node.y);
        // Encode
        msg.payload = cv.imencode('.jpg', msg.payload).toString('base64');
        node.send(msg);
    })

    RED.nodes.registerType("resize",Resize);

}