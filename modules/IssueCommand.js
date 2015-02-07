module.exports = (function () {
    function issueCommand(trainID, command) {
        var fs = require('fs');

        // If the file doesn't exist yet, create it and add the labels.
        if(!fs.existsSync('Output.txt'))
        {
            fs.writeFileSync("Output.txt","TrainID          Command");
        }

        // Append the new output to the file.
        var line = "\n"+trainID +"             "+ command;//adding line together
        fs.appendFileSync("Output.txt", line);
    }

    return {
        issueCommand: issueCommand
    }
})();