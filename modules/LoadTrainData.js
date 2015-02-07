module.exports = (function () {
    function loadTrainData(dataFileName) {

        var fs = require('fs');
        fs.readFile(dataFileName, function(err, data) {
            if(err) throw err;
            var array = data.toString().split("\n");
            for(var line in array) {
                console.log(array[line]);
            }
        });

    }

    return {
        loadTrainData: loadTrainData
    }
})();