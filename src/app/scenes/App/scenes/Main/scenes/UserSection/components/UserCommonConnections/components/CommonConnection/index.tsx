import * as React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import Avatar from '~/app/components/Avatar'
import { MuiTheme } from 'material-ui/styles'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 110px;
	padding: 5px;
`

const NameSpan = styled.span`
	color: ${props => props.theme.palette.secondaryTextColor};
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 14px;
	margin-top: 5px;
`

export interface ICommonConnectionData {
	photo: {
		small: string
	}
	name: string
}

export interface ICommonConnectionProps {
	muiTheme?: MuiTheme
	connection: ICommonConnectionData
}

@muiThemeable()
class CommonConnection extends React.Component<ICommonConnectionProps> {
	render() {
		return (
			<Container>
				<Avatar src={this.props.connection.photo.small} size={90} />
				<NameSpan theme={this.props.muiTheme}>
					{this.props.connection.name}
				</NameSpan>
			</Container>
		)
	}
}

export default CommonConnection
