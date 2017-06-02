import React, { Component } from 'react'
import CommonConnection from './components/CommonConnection'
import styled from 'styled-components'
import { AutoSizer } from 'react-virtualized'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { FlatButton } from 'material-ui'

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: ${props => props.width}px;
	cursor: default;
`

const ConnectionCount = styled.span`
    color: ${props => props.theme.palette.textColor};
`

const ConnectionsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: ${props => (props.stick ? 'flex-start' : 'space-between')};
    margin: 15px 0;
`

@muiThemeable()
@observer
class UserCommonConnections extends Component {
	@observable open = false

	@action toggleOpen = () => {
		this.open = !this.open
	}

	renderConnection(connection) {
		return <CommonConnection connection={connection} key={connection.id} />
	}

	renderContent = ({ width }) => {
		const { muiTheme, connectionCount, commonConnections } = this.props

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
				<ConnectionCount theme={muiTheme}>
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
				commonConnections={this.props.commonConnections}
				open={this.open}
			>
				{this.renderContent}
			</AutoSizer>
		)
	}
}

export default UserCommonConnections
