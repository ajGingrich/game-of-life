var React = require('react');

var Slow = React.createClass({

    slowSpeed: function() {
        this.props.onClick(this.props.speed);
    },
    render: function() {
        return (
            <button className="btn slow" onClick={this.slowSpeed}>Slow</button>
      );
    }

});

module.exports = Slow;