module.exports = (function () {
    var coordinateMappings = {
        '1E': {
            x: 60,
            y: 768-618-31,
            start: 101
        },
        '1W': {
            x: 60+480,
            y: 768-585-31,
            start: 501
        },
        '2N': {
            x: 410-32,
            y: 768-85,
            start: 101
        },
        '2S': {
            x: 442-32,
            y: 768-85-640,
            start: 501
        },
        '3E': {
            x: 60,
            y: 768-212-2,
            start: 101
        },
        '3W': {
            x: 60+800,
            y: 768-183-2,
            start: 501
        }
    };

    function getCoords(track, block) {
        var map = coordinateMappings[track];
        var blockID = block % 1000;
        var x = map.x,
            y = map.y,
            start = map.start;

        var block_offset = blockID - start;
        var kilo_offset = block_offset * 0.075; // 75 meters per block.
        var pix_offset = kilo_offset * 32; // 32 pixels per kilometer.

        if (track[1] == 'E') {
            x += pix_offset;
        }
        else if (track[1] == 'W') {
            x -= pix_offset;
        }
        else if (track[1] == 'S') {
            y += pix_offset;
        }
        else {
            y -= pix_offset;
        }

        return {x: x, y: y};
    }

    function renderTrains(canvasID, simulation_state, ui_state, images) {
        var canvas = document.getElementById(canvasID);
        var context = canvas.getContext("2d");
        context.drawImage(images.bg, 0, 0);
        context.font = "20px Courier New";
        context.fillStyle = 'white';

        simulation_state.trains.forEach(function (train) {
            var loc = getCoords(train.track, train.front_loc);
            var x = loc.x,
                y = loc.y;
            var image = (train.track[1] == 'E' || train.track[1] == 'W') ?
                images.train : images.train_v;
            context.drawImage(image, x, y);
            context.fillText(train.id, x+20, y+20);
        });
    }

    return {
        renderTrains: renderTrains
    }
})();