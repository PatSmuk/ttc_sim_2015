module.exports = (function () {

    var React = require('react/addons');

    var App = React.createClass({
        render: function () {
            var sim = this.props.simulation_state;
            var ui = this.props.ui_data;

            return (
                <div>
                {sim.trains.map(function (train) {
                    return <p>{train.id} {train.front_loc} {train.rear_loc} {train.track} {train.speed} {train.status}</p>;
                })}
                </div>
            );
        }
    });

    return App;
})();