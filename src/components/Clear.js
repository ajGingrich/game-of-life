var React = require('react');

var Clear = React.createClass({

    clearBoard: function() {
        this.props.onClick(this.props.count, this.props.arrAlive, this.props.running);
    },
    render: function() {
        return (
            <button className="btn clear" onClick={this.clearBoard}>Clear</button>
      );
    }

});

module.exports = Clear;