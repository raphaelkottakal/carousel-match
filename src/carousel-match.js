import React from 'react';
import Carousel from './carousel';
import { TweenLite } from 'gsap';

export default class CarouselMatch extends React.Component {

	constructor() {
		super();
		this.state = {
			slideIndex: 0
		}
	}

	componentDidMount() {
		// console.log(this.refs.resultSlider);
		TweenLite.from(this.refs.resultSlider, 1, { x: '100%' });
	}

	handelAfterSlide(slideIndex) {

		if (slideIndex != this.state.slideIndex) {
			this.setState({ slideIndex });
			TweenLite.from(this.refs.resultSlider, 1, { x: '100%' });
			TweenLite.to(this.refs.resultSlider, 1, { x: '0%' });
		}
	}

	renderMatchingSlide() {

		const images = this.props.data[this.state.slideIndex].combos.map((val,key) => {

			if (this.props.linkTop) {
				return (
						<img key={key} style={{width: '100%', height: 'auto', padding: 10}} src={val.image} />
				);

			} else {
				return (
					<a key={key} href={val.link} target="_blank">
						<img src={val.image} />
					</a>
				);
			}
		});

		return (
			<div ref="resultSlider">
				<Carousel initialSlideHeight={100} decorators={[]} autoplay={true} slidesToShow={this.props.slidesToShow}>
					{images}
				</Carousel>
			</div>
		);
	}

	render() {

		const css = {
			backgroundImage: (this.props.bgImage) ? `url(${this.props.bgImage})` : '',
			backgroundSize: '100%',
			backgroundRepeat: 'no-repeat',
			paddingTop: (this.props.paddingTop) ? this.props.paddingTop : ''
		}

		const mainSlideImgaes = this.props.data.map((val,key) => {
			// if (this.props.linkTop) {
				return (
					<a key={key} href={val.main.link} target="_blank">
						<img src={val.main.image} />
					</a>
				);
			// } else {
			// 	return (
			// 		<img key={key} style={{width: '100%', height: 'auto', display: 'block'}} src={val.main.image} />
			// 	);
			// }
		});

		return(
			<div >
				<div style={css}>
					<Carousel initialSlideHeight={200} slideIndex={this.state.slideIndex} decorators={[]} afterSlide={this.handelAfterSlide.bind(this)} cellAlign="center" slidesToShow={2}>
						{mainSlideImgaes}
						<div></div>
					</Carousel>
				</div>
				{this.renderMatchingSlide()}
			</div>			
		);

	}

}
