import React, { Component } from 'react';
import { Form, Projects } from './';
import { Jumbotron, Button, Progress, FormGroup, Label, Input } from 'reactstrap';
import retrostyles from '../styles/retrostyles.css';
import bootstrapStyles from 'bootstrap/dist/css/bootstrap.css';
import { getProjects } from '../services/api';
//import styles from 'material-components-web/dist/material-components-web.min.css';

const styles = {
	jumbotronStyle: {
		backgroundImage: 'url(https://pbs.twimg.com/media/DOkI3B0WkAEMf9H.jpg)',
		'backgroundRepeat': 'no-repeat',
		'backgroundSize': '100% auto',
		'height': '1200px',
		'width': '100vw'
	},
	titleStyle: {
		'textAlign': 'center'
	}

}

class Jumbo extends Component {

	constructor(props){
		super(props);
		this.state={
			originalityPercentage: 25,
			projectDescription: "",
			projects: undefined

		}
	}

	change = e => {
    const { value } = e.target;
    this.setState({projectDescription: value})
  	};

  	onSubmit = e => {
    e.preventDefault();
    getProjects(this.state.projectDescription)
    .then(res => {
    	console.log(res);
    	this.setState({
    		projectDescription: "",
    		projects: res
    	});
    });
}

	renderOriginalityBar(){
		if (this.state.originalityPercentage){
			return (
				<Progress value="25" style={{'bar-color': '#d94ac5', 'textAlign': 'center', 'width': '80%', 'marginLeft': '120px'}}>{this.state.originalityPercentage + '%'}</Progress>
				);
		}
	}
	
	render(){
		return (
			<div>
		      <Jumbotron style={styles.jumbotronStyle}>
		        <h1 className="title--metallic" style={styles.titleStyle}></h1>
		        <hr className="my-2" />
		        <p className="lead" style={{'textAlign': 'center', 'margin': 'auto'}}>
			        <FormGroup>
	          			<Input 
	          			type="search" 
	          			name="search" 
	          			id="exampleSearch" 
	          			autoComplete="off" 
	          			placeholder="project description" 
	          			value={this.state.projectDescription}
		    			onChange={e => this.change(e)}
	          			style={{width: '60%', 'textAlign': 'center', 'margin': 'auto'}}/>
	          			<br />
	          			<Button 
	          				color="primary"
	          				style={{'backgroundColor': '#d94ac5', 'textAlign': 'center', 'margin': 'auto'}}
	          				onClick={e => this.onSubmit(e)}
	          				>
	          				Search
	          				</Button>
	       			 </FormGroup>
	       			 {this.renderOriginalityBar()}
		        </p>
		        <Projects
		        	projects={this.state.projects}
		         />
		      </Jumbotron>
    		</div>
		);
	}
}

      // <input class="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text">
      // <div class="input-group-btn">
      //   <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>

export default Jumbo;