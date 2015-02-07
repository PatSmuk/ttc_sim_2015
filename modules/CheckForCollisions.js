module.exports = (function () {
    function checkForCollisions(nextState, issueCommand) {
        var trains = nextState.trains;

        //loop through all the trains
        trains.forEach(function (train1) {

            //compare the first train to the rest of the trains
            trains.forEach(function (train2) {

                //if it is the same train, do nothing
                if(train1.id == train2.id)
                    return;

                //if the trains are not on the same track, do nothing
                if(train1.track != train2.track)
                    return;

                //if the train locations are opposite, do nothing
                //to avoid repeated commands
                if(train1.front_loc > train2.rear_loc)
                    return;

                //switches the speed of the trains to m/s for calculation
                var speed2 = train2.speed * 1000.0 / 3600;
                var speed1 = train1.speed * 1000.0 / 3600;

                //gets the zone distances
                var blue = speed2*(-1.26) + 100;
                var yellow = 100;
                var red = 50;

                //find which zone equation to use
                if(train1.speed > 1 && train1.speed < 30){
                    yellow = yellow + speed1 * 6.48;
                    red = red + speed1 * 3.96;
                }
                else if(train1.speed > 31 && train1.speed < 50) {
                    yellow = yellow + speed1 * 7.2;
                    red = red + speed1 * 4.5;
                }
                else if(train1.speed > 1 && train1.speed < 30) {
                    yellow = yellow + speed1 * 8.28;
                    red = red + speed1 * 5.04;
                }

                //finds the total distance between the front of the rear train and
                //the rear of the front train
                var delta_d = (train2.rear_loc - train1.front_loc) * 75;

                //issue command to stop or slow down depending on distance
                if((red+blue) > delta_d){
                    //stop
                    issueCommand(train1.id, 'stop');
                }
                else if((yellow+blue) > delta_d) {
                    //slow down
                    issueCommand(train1.id, 'slow');
                }
            });
        });
    }

    return {
        checkForCollisions: checkForCollisions
    }
})();