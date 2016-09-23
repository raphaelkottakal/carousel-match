'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _carousel = require('./src/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

var _gsap = require('gsap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CarouselMatch = function (_React$Component) {
	_inherits(CarouselMatch, _React$Component);

	function CarouselMatch() {
		_classCallCheck(this, CarouselMatch);

		var _this = _possibleConstructorReturn(this, (CarouselMatch.__proto__ || Object.getPrototypeOf(CarouselMatch)).call(this));

		_this.state = {
			slideIndex: 0
		};
		return _this;
	}

	_createClass(CarouselMatch, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			// console.log(this.refs.resultSlider);
			_gsap.TweenLite.from(this.refs.resultSlider, 1, { x: '100%' });
		}
	}, {
		key: 'handelAfterSlide',
		value: function handelAfterSlide(slideIndex) {

			if (slideIndex != this.state.slideIndex) {
				this.setState({ slideIndex: slideIndex });
				_gsap.TweenLite.from(this.refs.resultSlider, 1, { x: '100%' });
				_gsap.TweenLite.to(this.refs.resultSlider, 1, { x: '0%' });
			}
		}
	}, {
		key: 'renderMatchingSlide',
		value: function renderMatchingSlide() {
			var _this2 = this;

			var images = this.props.data[this.state.slideIndex].combos.map(function (val, key) {

				if (_this2.props.linkTop) {
					return _react2.default.createElement('img', { key: key, style: { width: '100%', height: 'auto', padding: 10 }, src: val.image });
				} else {
					return _react2.default.createElement(
						'a',
						{ key: key, href: val.link, target: '_blank' },
						_react2.default.createElement('img', { src: val.image })
					);
				}
			});

			return _react2.default.createElement(
				'div',
				{ ref: 'resultSlider' },
				_react2.default.createElement(
					_carousel2.default,
					{ initialSlideHeight: 100, decorators: [], autoplay: true, slidesToShow: this.props.slidesToShow },
					images
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {

			var css = {
				backgroundImage: this.props.bgImage ? 'url(' + this.props.bgImage + ')' : '',
				backgroundSize: '100%',
				backgroundRepeat: 'no-repeat',
				paddingTop: this.props.paddingTop ? this.props.paddingTop : ''
			};

			var mainSlideImgaes = this.props.data.map(function (val, key) {
				// if (this.props.linkTop) {
				return _react2.default.createElement(
					'a',
					{ key: key, href: val.main.link, target: '_blank' },
					_react2.default.createElement('img', { src: val.main.image })
				);
				// } else {
				// 	return (
				// 		<img key={key} style={{width: '100%', height: 'auto', display: 'block'}} src={val.main.image} />
				// 	);
				// }
			});

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ style: css },
					_react2.default.createElement(
						_carousel2.default,
						{ initialSlideHeight: 200, slideIndex: this.state.slideIndex, decorators: [], afterSlide: this.handelAfterSlide.bind(this), cellAlign: 'center', slidesToShow: 2 },
						mainSlideImgaes,
						_react2.default.createElement('div', null)
					)
				),
				this.renderMatchingSlide()
			);
		}
	}]);

	return CarouselMatch;
}(_react2.default.Component);

exports.default = CarouselMatch;
