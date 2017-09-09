import React, { Component } from 'react';
import { Layer, Circle, Stage, Line } from 'react-konva';
import Pattern from './Pattern';


class Layout extends Component {
	constructor(){
		super();
		this.state = {
			mode:'',
			setPattern:[],
			result:null
		}
		this.setMode = this.setMode.bind(this);
		this.setPatternCode = this.setPatternCode.bind(this);
		this.testPatternCode = this.testPatternCode.bind(this);
	}
	setMode(mode){
		this.setState({mode:mode, result:null});
	}

	setPatternCode(arr) {
		this.setState({
			setPattern:arr,
			result:null
		});
	}

	testPatternCode(arr) {
		let { setPattern } = this.state;
		let v = JSON.stringify(arr);
		let v2 = JSON.stringify(setPattern);

		this.setState({
			result:((v===v2)?"Pattern Matches":"Pattern Doesnt Match")
		})
	}



	render(){
		const { mode, result } = this.state;
		return (<div>
			<h2>Welcome to Android Pattern Lock</h2>
			<button onClick={() => this.setMode('set')}>Create a pattern</button>
			<button onClick={() => this.setMode('test')}>Test Pattern</button>
			<div class="margin-top-30">
				{!result && mode === 'set' && <Pattern afterPatternComplete={this.setPatternCode}/>}
				{!result && mode === 'test' && <Pattern afterPatternComplete={this.testPatternCode}/>}
				{result && <h3>{result}</h3>}
			</div>
		</div>);
	}
}

export default Layout;