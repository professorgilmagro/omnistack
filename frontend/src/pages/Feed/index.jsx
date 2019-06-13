import React, { Component } from 'react';
import api from '../../services/api';
import AppConfig from '../../config/app';
import io from 'socket.io-client';
import './styles.css';

import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';

class Feed extends Component {
	state = {
		feeds: []
	};

	async componentDidMount() {
		this.registerToSocket();
		const response = await api.get('posts');
		this.setState({ feeds: response.data });
	}

	/**
	 * Adiciona o recurso de 'escuta' do websocket para novas interações
	 * Esta feature atualiza em RealTime as informações do nosso App quando:
	 * 1 - Um novo post é criado
	 * 2 - Toda vez que uma curtida é realizada em um dos posts existentes
	 */
	registerToSocket = () => {
		const socket = io(AppConfig.server.getURL());

		// 1. Adiciona o novo post como primeiro item no feed.
		socket.on('post', newPost => {
			this.setState({ feeds: [newPost, ...this.state.feeds] });
		});

		// 2. Uma vez que o emit 'like' é recebido, localiza o post nos feeds e o atualiza
		socket.on('like', likedPost => {
			this.setState({
				feeds: this.state.feeds.map(post => {
					return post._id === likedPost._id ? likedPost : post;
				})
			});
		});
	};

	// adiciona +1 like ao post com o id informado
	handleLike = id => {
		api.post(`posts/${id}/like`);
	};

	render() {
		const { feeds } = this.state;
		return (
			<section id='post-list'>
				{feeds.map(post => (
					<article key={post._id}>
						<header>
							<div className='user-info'>
								<span className='uname'>{post.author}</span>
								<span className='place'>{post.place}</span>
							</div>
							<img src={more} alt='mais' />
						</header>
						<img
							src={`${AppConfig.server.getURL('files')}/${
								post.image
							}`}
							alt={post.place}
						/>
						<footer>
							<div className='actions'>
								<img
									src={like}
									alt='Curtir'
									className='like'
									onClick={() => this.handleLike(post._id)}
								/>
								<img src={comment} alt='' />
								<img src={send} alt='' />
							</div>
							<strong> {post.likes} curtidas</strong>
							<p>{post.description}</p>
							<span className='hashtags'>{post.hashtags}</span>
						</footer>
					</article>
				))}
			</section>
		);
	}
}

export default Feed;
