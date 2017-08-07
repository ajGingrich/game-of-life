var React = require('react');

var Stop = React.createClass({

    stopGame: function() {
        this.props.onClick(
            this.props.running
        );
    },
    render: function() {
        return (
            <button className="btn stop" onClick={this.stopGame}>Stop</button>
      );
    }

});

module.exports = Stop;