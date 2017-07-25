import * as React from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader'

class ProfileStub extends React.Component {
	render() {
		return (
			<ContentLoader width={270} height={46}>
				<Circle x={29} y={23} radius={17} />
				<Rect x={58} y={15} height={16} radius={5} width={76} />
			</ContentLoader>
		)
	}
}

export default ProfileStub
