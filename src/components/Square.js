var React = require('react');

var Square = React.createClass({

    handleMouseOver: function() {
        //Make square alive or dead depending on current state
        if (this.props.isMouseDown) {
            if (this.props.arrAlive.indexOf(this.props.index) == -1) {
                this.props.onMouseOver(
                    this.props.arrAlive.push(this.props.index)
                );
            }
            else {
                this.props.onMouseOver(
                    this.props.arrAlive.splice(this.props.arrAlive.indexOf(this.props.index), 1)
                );
            }
        }
        //console.log(this.props.isMouseDown);
    },

    handleClick: function() {
        //Make square alive or dead depending on current state
        if (this.props.arrAlive.indexOf(this.props.index) == -1) {
            this.props.onClick(
                this.props.arrAlive.push(this.props.index)
            );
        }
        else {
            this.props.onClick(
                this.props.arrAlive.splice(this.props.arrAlive.indexOf(this.props.index), 1)
            );
        }
    },

    handleMouseDown: function() {
        this.props.onMouseDown(this.props.isMouseDown);
    },
    handleMouseUp: function() {
        this.props.onMouseUp(this.props.isMouseDown);
    },


    render: function() {

        return (
            <div className={this.props.isAlive ? 'alive' : this.props.isDying ? 'dying' : 'square'} onMouseOver={this.handleMouseOver}
                 onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onClick={this.handleClick}>
            </div>

      );
    }

});

module.exports = Square;