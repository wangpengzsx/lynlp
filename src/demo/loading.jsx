import React from 'react';
export default class Loading extends React.Component {
	render (){
		return (
			<div style={{textAlign: 'center', padding: 65}}>
				<img src={require('../../images/loading.gif')} alt="loading..." />
			</div>
		)
	}
}
