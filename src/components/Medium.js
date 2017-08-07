var React = require('react');

var Medium = React.createClass({

    mediumSpeed: function() {
        this.props.onClick(this.props.speed);
    },
    render: function() {
        return (
            <button className="btn medium" onClick={this.mediumSpeed}>Medium</button>
      );
    }

});

module.exports = Medium;