module.exports = (function () {
    function loadTrainData(dataFileName) {

        var simulationData = [];

        var fs = require('fs');
        var data =  fs.readFileSync(dataFileName);

        // Split the data file line-by-line.
        var array = data.toString().split("\n");

        // For each line...
        for(var line in array) {
            // Skip line 0 (the labels).
            if(line>0) {
                var split = array[line].split("\t");//splits data by space
                if (split.length == 1)
                    continue;

                var time = split[0];
                var train = split[1];
                var frtloc = split[2];
                var rearloc = split[3];
                var tracknum = split [4];
                var speedVal = split[5];
                var statusTrain = split[6];//.replace('\r', '');
                statusTrain = statusTrain.replace('\r', '');


                // If this time doesn't exist yet, create a new object and add it to the data set.
                var simState = simulationData[time] || { time: time, trains: [] };
                if (simulationData[time] === undefined) {
                    simulationData[time] = simState;
                }

                // Add the train state to the simulation data set.
                simState.trains.push({
                    id: train,
                    front_loc: frtloc,
                    rear_loc: rearloc,
                    track: tracknum,
                    speed: speedVal,
                    status: statusTrain
                });
            }
        }

        return simulationData;
    }

    return {
        loadTrainData: loadTrainData
    }
})();