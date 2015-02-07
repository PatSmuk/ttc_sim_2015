module.exports = (function () {
    function issueCommand(trainID, command) {
        var fs = require('fs');
        if(!fs.existsSync('Output.txt'))
        {
            fs.writeFileSync("Output.txt","TrainID          Command");
            console.log("Output.txt was created");
        }
        var line = "\n"+trainID +"             "+ command;//adding line together
        fs.appendFileSync("Output.txt", line);
    }

    return {
        issueCommand: issueCommand
    }
})();