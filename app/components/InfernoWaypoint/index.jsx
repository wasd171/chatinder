import Inferno from 'inferno'
import Component from 'inferno-component'


class InfernoWaypoint extends Component {
	waypoint;

	componentDidMount() {
		this.waypoint = new window.Waypoint({
			element: this.refs.waypoint,
			handler: (direction) => {
				alert('I WAS TRIGGERED!')
			},
			offset: 'bottom-in-view'
		})
	}

	componentWillUnmount() {
		this.waypoint.destroy();
		this.waypoint = null;
	}

	render() {
		return (
			<div ref="waypoint">Here's Johny!</div>
		)
	}
}

export default InfernoWaypoint