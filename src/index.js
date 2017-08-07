var React = require('react');
var ReactDOM = require('react-dom');
var Square = require('./components/Square.js');
var Clear = require('./components/Clear.js');
var Start = require('./components/Start.js');
var Stop = require('./components/Stop.js');
var Slow = require('./components/Slow.js');
var Medium = require('./components/Medium.js');
var Fast = require('./components/Fast.js');

//glider
//var arrAlive = [154, 155, 156, 106, 55];

/*initial  Random generation and alive squares*/
var arrAlive = [];
for (var k=0; k<1500; k++) {
    if (Math.random() < 0.25) {
        arrAlive.push(k)
    }
}

var count = 0;
var running = true;
var arrDying = [];
var speed = 5;
var isMouseDown = false;

var Game = React.createClass({

    getInitialState: function() {
        return {
            aliveIndex: null,
            arrAlive: arrAlive,
            arrDying: arrDying,
            running: running,
            count: count,
            speed: speed,
            isMouseDown: isMouseDown
        };
    },

    slowSpeed: function() {
        this.state.speed = 500;
    },

    mediumSpeed: function() {
        this.state.speed = 50;
    },

    fastSpeed: function() {
        this.state.speed = 5;
    },

    clearBoard: function() {
        //var arrAlive = this.state.arrAlive.slice();
        var arrAlive = [];
        this.setState({
            count: 0,
            arrAlive: arrAlive,
            running: false
        });
    },

    startGame: function() {
        this.setState({
            running: true
        });
    },
    stopGame: function() {
        this.setState({
            running: false
        });
    },



    componentDidMount: function() {
      var arrAlive = this.state.arrAlive.slice();
      if (arrAlive.length > 0 && this.state.running) {
          setTimeout(function() {
              this.setState({
                  arrAlive: arrAlive
              });
          }.bind(this), this.state.speed);
      }
    },

    componentDidUpdate: function() {
        var arrAlive = this.state.arrAlive.slice();
        if (arrAlive.length > 0 && this.state.running) {
            setTimeout(function() {
                this.setState({
                    arrAlive: arrAlive
                });
            }.bind(this), this.state.speed);
        }
    },

    handleMouseDown: function() {
        this.setState({
            isMouseDown: true
        });
    },

    handleMouseUp: function() {
        this.setState({
            isMouseDown: false
        });
    },

    handleClick: function() {
        var arrAlive = this.state.arrAlive.slice();
        this.setState({
            arrAlive: arrAlive
        });
    },

    handleMouseOver: function() {
        var arrAlive = this.state.arrAlive.slice();
        this.setState({
            arrAlive: arrAlive
        });
    },

    render: function() {

        var numNeighbors = 0,
            neighborTopLeft = 0,
            neighborTopCenter = 0,
            neighborTopRight = 0,
            neighborCenterLeft = 0,
            neighborCenterRight = 0,
            neighborBottomLeft = 0,
            neighborBottomCenter = 0,
            neighborBottomRight = 0;

        //Clear Dying Array
        this.state.arrDying = [];

        ///only change state if the program is on
        if (this.state.running) {
            //check the counter and update if necessary
            this.state.count++;

            //make temporary array for simultaneous births and deaths
            var currentState = this.state.arrAlive.slice();

            //do this for every square in a loop
            for (var j=0; j<1500; j++) {



                //Define the neighbors for all the middle squares
                neighborTopLeft = j-51;
                neighborTopCenter = j-50;
                neighborTopRight = j-49;
                neighborCenterLeft = j-1;
                neighborCenterRight = j+1;
                neighborBottomLeft = j+49;
                neighborBottomCenter = j+50;
                neighborBottomRight = j+51;

                //Overwrite appropriate neighbors on borders for free-flow
                if (j < 50) {
                    neighborTopLeft = j+1449;
                    neighborTopCenter = j+1450;
                    neighborTopRight = j+1451;
                }
                if (j % 50 == 0) {
                    neighborTopLeft = j-1;
                    neighborCenterLeft = j+49;
                    neighborBottomLeft = j+99;
                }
                if ((j+1) % 50 == 0) {
                    neighborTopRight = j-99;
                    neighborCenterRight = j-49;
                    neighborBottomRight = j+1;
                }
                if (j > 1449) {
                    neighborBottomLeft = j-1451;
                    neighborBottomCenter = j-1450;
                    neighborBottomRight = j-1449;
                }

                //Check if the neighbors are in the array
                if (currentState.indexOf(neighborTopLeft) != -1) {
                    numNeighbors++;
                }
                if (currentState.indexOf(neighborTopCenter) != -1) {
                    numNeighbors++;
                }
                if (currentState.indexOf(neighborTopRight) != -1) {
                    numNeighbors++;
                }
                if (currentState.indexOf(neighborCenterLeft) != -1) {
                    numNeighbors++;
                }
                if (currentState.indexOf(neighborCenterRight) != -1) {
                    numNeighbors++;
                }
                if (currentState.indexOf(neighborBottomLeft) != -1) {
                    numNeighbors++;
                }
                if (currentState.indexOf(neighborBottomCenter) != -1) {
                    numNeighbors++;
                }
                if (currentState.indexOf(neighborBottomRight) != -1) {
                    numNeighbors++;
                }

                //check if square is alive
                if (currentState.indexOf(j) != -1) {

                    //0 or 1 neighbors, kill it
                    if (numNeighbors < 2) {
                        this.state.arrAlive.splice(this.state.arrAlive.indexOf(j),1);
                        this.state.arrDying.push(j);
                    }
                    //4 or more neighbors, kill it
                    if (numNeighbors > 3) {
                        this.state.arrAlive.splice(this.state.arrAlive.indexOf(j),1);
                        this.state.arrDying.push(j);
                    }
                }
                //see if any new squares are born
                else {
                    //if exactly three neighbors, give birth
                    if (numNeighbors == 3) {
                        this.state.arrAlive.push(j)
                    }
                }

                //reset variables
                numNeighbors = 0;
                neighborTopLeft = 0;
                neighborTopCenter = 0;
                neighborTopRight = 0;
                neighborCenterLeft = 0;
                neighborCenterRight = 0;
                neighborBottomLeft = 0;
                neighborBottomCenter = 0;
                neighborBottomRight = 0;
            }

        }

        //generate grid display all squares
        var grid = [];
        for (var i=0; i<1500; i++) {
            grid.push(
                <Square
                    onMouseOver={this.handleMouseOver}
                    onClick={this.handleClick}
                    index={i}
                    isAlive={this.state.arrAlive.indexOf(i) != -1}
                    isDying={this.state.arrDying.indexOf(i) != -1}
                    arrAlive={this.state.arrAlive}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    isMouseDown={this.state.isMouseDown}
                />);
        }

        return (
            <div>
                <div className = "gameBorder">
                    <div className="gameContainer">
                        {grid}
                    </div>
                </div>
                <div id="controls">
                    <Start
                        arrAlive={this.state.arrAlive}
                        running={this.state.running}
                        onClick ={this.startGame}
                    />
                    <Stop
                        arrAlive={this.state.arrAlive}
                        running={this.state.running}
                        onClick ={this.stopGame}
                    />
                    <Clear
                        arrAlive={this.state.arrAlive}
                        running={this.state.running}
                        onClick ={this.clearBoard}
                        count={this.state.count}
                    />
                    <span id="generation">Generation: {this.state.count}</span>
                    <Slow
                        onClick ={this.slowSpeed}
                        speed={this.state.speed}
                    />
                    <Medium
                        onClick ={this.mediumSpeed}
                        speed={this.state.speed}
                    />
                    <Fast
                        onClick ={this.fastSpeed}
                        speed={this.state.speed}
                    />
                </div>
            </div>

        );
    }

});


ReactDOM.render(<Game />, document.getElementById('Life'));
