import React, { Component } from 'react';
import { Layer, Circle, Stage, Line } from 'react-konva';

let canvas, canvasPos;

function getPosition(el){
	var xPos = 0;
  var yPos = 0;
  while (el) {
    if (el.tagName == "BODY") {
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

function updateCanvas() {
	canvasPos = getPosition(canvas);
}


class MyLine extends Component {
	constructor(){
		super();
		this.state = {
			initialArr:[]
		};
	}
	render(){
		const { x,y, initial } = this.props;
		let c = [...initial];
		c.push(x);
		c.push(y);
		return (<Line
      stroke="#FF6A6A"
      draggable="true"
      points= {c}
      strokeWidth={3}
      x={10} y={10}
    />);
	}
}

class MyDot extends Component {
	constructor(){
		super();
		this.snap = false;
	}
	render(){
		const { x,y,click,key1 } = this.props;
		return (<Circle
			fill="#000"
			x={x}
			y={y}
			radius={8}
			opacity={0.5}
			onMouseOver = {(e) => {click.call(this, e, x,y,this.snap,key1); this.snap=true;}}
		/>);
	}
}

class Pattern extends Component {
	constructor(){
		super();
		this.state = {
			xFinal:null,
			yFinal:null,
			lineStart:false,
			dotCoordinateArray: [[90,100],[270,100], [450,100], [90,280],[270,280], [450,280], [90,460],[270,460], [450,460]],
			initialArr:[],
			patternComplete:false,
			patternCode:[]
		};
		this.setMousePosition = this.setMousePosition.bind(this);
		this.handleLine = this.handleLine.bind(this);
	}

	setMousePosition = (e) => {
		this.setState({
			xFinal: e.clientX - canvasPos.x,
			yFinal: e.clientY - canvasPos.y,
		});
	}

	handleLine(e, x,y,snap,key){
		const {lineStart, initialArr, patternCode} = this.state;
		const { afterPatternComplete } = this.props;
		patternCode.push(key);
		if(snap){
			this.setState({
				patternComplete:true,
				patternCode:patternCode
			}, () => afterPatternComplete(patternCode))
		}

		if(!snap){
			initialArr.push(x-10);
			initialArr.push(y-10);
		}
		
		if(!lineStart){
			this.setState({
				lineStart:true,
				initialArr:initialArr,
				patternCode:patternCode
			});
		} else {
			if(!snap){
				this.setState({
					initialArr:initialArr,
					patternCode:patternCode
				});	
			}
		}
	}
	render(){
		const {xFinal, yFinal, lineStart, dotCoordinateArray, initialArr, patternComplete, patternCode} = this.state;
		
		let dotJsx = dotCoordinateArray.length>0 && dotCoordinateArray.map((v,i) => <MyDot click={this.handleLine} key={i} key1={i} x={v[0]} y={v[1]} />);
		return (<div>
      {!patternComplete && <Stage width={1000} height={600} >
        <Layer>
						{lineStart && <MyLine initial={initialArr} x={xFinal} y={yFinal} />}           
            {dotJsx}

        </Layer>
      </Stage>}
      
    </div>);
	}
	componentDidMount() {
		canvas = document.querySelector('canvas');
		canvasPos = getPosition(canvas);
		canvas.addEventListener("mousemove", this.setMousePosition, false);
	}
}

export default Pattern;