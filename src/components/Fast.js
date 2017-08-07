var React = require('react');

var Fast = React.createClass({

    fastSpeed: function() {
        this.props.onClick(this.props.speed);
    },
    render: function() {
        return (
            <button className="btn fast" onClick={this.fastSpeed}>Fast</button>
      );
    }

});

module.exports = Fast;