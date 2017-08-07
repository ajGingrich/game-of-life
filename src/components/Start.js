var React = require('react');

var Start = React.createClass({

    startGame: function() {
        this.props.onClick(
            this.props.running
        );
    },
    render: function() {
        return (
            <button className="btn start" onClick={this.startGame}>Start</button>
      );
    }

});

module.exports = Start;