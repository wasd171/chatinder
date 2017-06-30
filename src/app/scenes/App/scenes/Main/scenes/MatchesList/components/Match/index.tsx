import * as React from 'react'
import Avatar from '~/app/components/Avatar'
import muiThemeable from 'material-ui/styles/muiThemeable'
import styled from 'styled-components'
import { fade } from 'material-ui/utils/colorManipulator'
import { MuiTheme } from 'material-ui/styles'

const paddingNum = 12

export interface IMatchContainerProps {
	isSelected: boolean
	theme: MuiTheme
}
const MatchContainer = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	padding-left: ${paddingNum}px;
	cursor: pointer;
	width: 100%;
	overflow-x: hidden;
	box-sizing: border-box;
	${(props: IMatchContainerProps) =>
		props.isSelected
			? `background-color: ${fade(props.theme.palette!.textColor!, 0.2)};`
			: ''};
`

export interface ITextContainerProps {
	showBorder: boolean
	theme: MuiTheme
}
const TextContainer = styled.div`
	marginLeft: ${paddingNum}px;
	paddingRight: ${paddingNum}px;
	width: 100%;
	overflow: hidden;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-top: 1px solid
		${(props: ITextContainerProps) =>
			props.showBorder
				? props.theme.palette!.borderColor!
				: 'rgba(0, 0, 0, 0)'};
	box-sizing: border-box;
`

const NameContainer = styled.div`
	color: ${props => props.theme.palette.textColor};
`

const MessageContainer = styled.div`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	color: ${props => props.theme.palette.secondaryTextColor};
	font-size: 14px;
`
export interface IMatchProps {
	muiTheme?: MuiTheme
	isSelected: boolean
	isPreviousSelected: boolean
	firstVisible: boolean
	goToChat: ({ id, index }: { id: string; index: number }) => any
	style: Object
	match: {
		_id: string
		person: {
			smallPhoto: string
			formattedName: string
		}
		lastMessage: {
			formattedMessage: string
		}
	}
	index: number
}

@muiThemeable()
class Match extends React.Component<IMatchProps> {
	get showBorder(): boolean {
		return !(
			this.props.isSelected ||
			this.props.isPreviousSelected ||
			this.props.firstVisible
		)
	}

	handleClick = () => {
		this.props.goToChat({
			id: this.props.match._id,
			index: this.props.index
		})
	}

	render() {
		const { match, style, muiTheme, isSelected } = this.props

		return (
			<MatchContainer
				theme={muiTheme}
				style={style}
				isSelected={isSelected}
				onClick={this.handleClick}
			>
				<Avatar src={match.person.smallPhoto} size={46} />
				<TextContainer showBorder={this.showBorder} theme={muiTheme}>
					<NameContainer
						theme={muiTheme}
						dangerouslySetInnerHTML={{
							__html: match.person.formattedName
						}}
					/>
					<MessageContainer theme={muiTheme}>
						<span
							dangerouslySetInnerHTML={{
								__html: match.lastMessage.formattedMessage
							}}
						/>
					</MessageContainer>
				</TextContainer>
			</MatchContainer>
		)
	}
}

export default Match
