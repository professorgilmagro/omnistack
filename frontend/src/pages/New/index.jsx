import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

class New extends Component {
	state = {
		image: null,
		author: '',
		place: '',
		description: '',
		hashtags: ''
	};

	handleSubmit = async e => {
		e.preventDefault();
		const data = new FormData();
		data.append('image', this.state.image);
		data.append('author', this.state.author);
		data.append('place', this.state.place);
		data.append('description', this.state.description);
		data.append('hashtags', this.state.hashtags);

		await api.post('posts', data);
		this.props.history.push('/');
	};

	handleChange = e => {
		const el = e.target;
		const value = el.type === 'file' ? el.files[0] : el.value;
		this.setState({ [el.name]: value });
	};

	render() {
		return (
			<form id='new-post' onSubmit={this.handleSubmit}>
				<input type='file' name='image' onChange={this.handleChange} />
				<input
					type='text'
					name='author'
					onChange={this.handleChange}
					placeholder='Autor do post'
					value={this.state.author}
				/>
				<input
					type='text'
					name='place'
					onChange={this.handleChange}
					placeholder='Local do post'
					value={this.state.place}
				/>
				<input
					type='text'
					name='description'
					onChange={this.handleChange}
					placeholder='Descrição'
					value={this.state.description}
				/>
				<input
					type='text'
					name='hashtags'
					onChange={this.handleChange}
					placeholder='Hashtags'
					value={this.state.hashtags}
				/>
				<button type='submit'>Enviar</button>
			</form>
		);
	}
}

export default New;
