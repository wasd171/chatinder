import * as React from 'react'
import CommonConnection, {
	ICommonConnectionData
} from './components/CommonConnection'
import styled from 'styled-components'
import { AutoSizer } from 'react-virtualized'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { FlatButton } from 'material-ui'
import { MuiTheme } from 'material-ui/styles'

interface IContentContainerProps {
	width: number
}
const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: ${(props: IContentContainerProps) => props.width}px;
	cursor: default;
`

const ConnectionCount = styled.span`
	color: ${props => props.theme.palette.textColor};
`

interface IConnectionsContainerProps {
	stick: boolean
}

const ConnectionsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: ${(props: IConnectionsContainerProps) =>
		props.stick ? 'flex-start' : 'space-between'};
	margin: 15px 0;
`

interface IUserCommonConnectionData extends ICommonConnectionData {
	id: string
}

export interface IUserCommonConnections {
	connectionCount: number
	commonConnections: Array<IUserCommonConnectionData>
}

interface IInjectedProps extends IUserCommonConnections {
	muiTheme: MuiTheme
}

@muiThemeable()
@observer
class UserCommonConnections extends React.Component<IUserCommonConnections> {
	get injected() {
		return this.props as IInjectedProps
	}

	@observable open: boolean = false

	@action
	toggleOpen = () => {
		this.open = !this.open
	}

	renderConnection(connection: IUserCommonConnectionData) {
		return <CommonConnection connection={connection} key={connection.id} />
	}

	renderContent = ({ width }: { width: number }) => {
		const { connectionCount, commonConnections } = this.props

		let connections, stick

		if (this.open) {
			connections = commonConnections
		} else {
			if (width < 440) {
				if (connectionCount <= 3) {
					connections = commonConnections
				} else {
					connections = commonConnections.slice(0, 3)
				}
			} else {
				if (connectionCount <= 4) {
					connections = commonConnections
				} else {
					connections = commonConnections.slice(0, 4)
				}
			}
		}

		if (width < 440) {
			if (connectionCount < 3) {
				stick = true
			} else {
				stick = false
			}
		} else {
			if (connectionCount < 4) {
				stick = true
			} else {
				stick = false
			}
		}

		return (
			<ContentContainer width={width}>
				<ConnectionCount theme={this.injected.muiTheme}>
					Common connections: {connectionCount}
				</ConnectionCount>
				<ConnectionsContainer stick={stick}>
					{connections.map(this.renderConnection)}
				</ConnectionsContainer>
				{!stick &&
					<FlatButton
						label={this.open ? 'Hide' : 'Show all'}
						primary={true}
						onClick={this.toggleOpen}
					/>}
			</ContentContainer>
		)
	}

	render() {
		return (
			<AutoSizer
				disableHeight={true}
				forceUpdater={this.props.commonConnections}
				open={this.open}
			>
				{this.renderContent}
			</AutoSizer>
		)
	}
}

export default UserCommonConnections
