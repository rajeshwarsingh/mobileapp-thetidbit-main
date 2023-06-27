import React from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
const { height, width } = Dimensions.get('window');

class Pulse extends React.Component {
	constructor(props) {
		super(props);
		this.anim = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(this.anim, {
			toValue: 1,
			duration: this.props.interval,
			useNativeDriver: false, // or useNativeDriver: fals
			easing: Easing.in,
		})
			.start();
	}

	render() {
		const { size, pulseMaxSize, borderColor, backgroundColor, getStyle } = this.props;

		return (
			<View style={[styles.circleWrapper, {
				width: pulseMaxSize,
				height: pulseMaxSize,
				marginLeft: -pulseMaxSize / 2,
				marginTop: -pulseMaxSize / 2,
			}]}>
				<Animated.View
					style={[styles.circle, {
						borderColor,
						backgroundColor,
						width: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [size, pulseMaxSize]
						}),
						height: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [size, pulseMaxSize]
						}),
						borderRadius: pulseMaxSize / 2,
						opacity: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [1, 0]
						})
					}, getStyle && getStyle(this.anim)]}
				/>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	circleWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		left: width / 2,
		top: height / 2,
	},
	circle: {
		borderWidth: 4 * StyleSheet.hairlineWidth,
	},
});

export default class LocationPulseLoader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			circles: []
		};

		this.counter = 1;
		this.setInterval = null;
		this.anim = new Animated.Value(1);
	}

	componentDidMount() {
		this.setCircleInterval();
	}

	setCircleInterval() {
		this.setInterval = setInterval(this.addCircle.bind(this), this.props.interval);
		this.addCircle();
	}

	addCircle() {
		this.setState({ circles: [...this.state.circles, this.counter] });
		this.counter++;
	}

	onPressIn() {
		Animated.timing(this.anim, {
			toValue: this.props.pressInValue,
			duration: this.props.pressDuration,
			easing: this.props.pressInEasing,
			useNativeDriver: false, // or useNativeDriver: fals
		}).start(() => clearInterval(this.setInterval));
	}

	onPressOut() {
		Animated.timing(this.anim, {
			toValue: 1,
			duration: this.props.pressDuration,
			easing: this.props.pressOutEasing,
			useNativeDriver: false, // or useNativeDriver: fals
		}).start(this.setCircleInterval.bind(this));
	}

	render() {
		const { size, avatar, avatarBackgroundColor, interval } = this.props;

		return (
			<View style={{
				flex: 1,
				backgroundColor: 'transparent',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				{this.state.circles.map((circle) => (
					<Pulse
						key={circle}
						{...this.props}
					/>
				))}

				<TouchableOpacity
					activeOpacity={1}
					onPressIn={this.onPressIn.bind(this)}
					onPressOut={this.onPressOut.bind(this)}
					style={{
						transform: [{
							scale: this.anim
						}]
					}}
				>
					<Image
						source={{ uri: avatar }}
						style={{
							width: size,
							height: size,
							borderRadius: size / 2,
							backgroundColor: avatarBackgroundColor
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

LocationPulseLoader.propTypes = {
	interval: PropTypes.number,
	size: PropTypes.number,
	pulseMaxSize: PropTypes.number,
	avatar: PropTypes.string,
	avatarBackgroundColor: PropTypes.string,
	pressInValue: PropTypes.number,
	pressDuration: PropTypes.number,
	borderColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	getStyle: PropTypes.func,
};

LocationPulseLoader.defaultProps = {
	interval: 2000,
	size: 100,
	pulseMaxSize: 250,
	avatar: "https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700",
	avatarBackgroundColor: 'white',
	pressInValue: 0.8,
	pressDuration: 150,
	pressInEasing: Easing.in,
	pressOutEasing: Easing.in,
	borderColor: '#2196f3',
	backgroundColor: '#2196f3',
	getStyle: undefined,
};
