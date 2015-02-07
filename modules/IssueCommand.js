module.exports = (function () {
    function issueCommand(trainID, command) {
        var fs = require('fs');
        var line = "\n"+trainID +"             "+ command;//adding line together
        fs.appendFileSync("Output.txt", line);
    }

    return {
        issueCommand: issueCommand
    }
})();