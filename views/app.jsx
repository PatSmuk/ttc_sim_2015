module.exports = (function () {

    var React = require('react/addons');

    var App = React.createClass({
        getInitialState: function () {
            return { trainID: '' }
        },

        // Called when the user types into the train ID input box.
        changeTrainID: function (event) {
            this.setState({trainID: event.target.value})
        },

        // Called when the OK button is clicked.
        clickButton: function () {
            var sim = this.props.simulation_state;
            var ui = this.props.ui_state;
            var self = this;

            ui.selected_train = self.state.trainID;
        },

        render: function () {
            var sim = this.props.simulation_state;
            var ui = this.props.ui_state;

            var trainInfo = null;

            if (ui.selected_train) {
                var train;
                sim.trains.forEach(function (train_i) {
                    if (ui.selected_train == train_i.id) {
                        train = train_i;
                    }
                });

                // If a real train is selected, show info.
                if (train) {
                    trainInfo = (<div>
                        <p>Location: {train.front_loc}</p>
                        <p>Speed: {train.speed} km/h</p>
                        <p>Status: {train.status}</p>
                    </div>);
                }
                else {
                    // If an invalid ID is entered, show an error.
                    // Otherwise, nothing.
                    trainInfo = (this.state.trainID.length > 0) ? (<p>Train not found.</p>) : '';
                }
            }

            return (
                <div>
                    <div>
                        <input type="text" value={this.state.trainID} onChange={this.changeTrainID} />
                        <button onClick={this.clickButton}>OK</button>
                    {trainInfo ? trainInfo : ''}
                    </div>
                </div>
            );
        }
    });

    return App;
})();