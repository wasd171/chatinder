export default function BaseSection(el) {
	return (
		el`
			height: 100vh;
			max-height: 100vh;
			position: relative;
			display: flex;
			flex-direction: column;
			overflow-x: hidden;
			&::-webkit-scrollbar {
				display: none;
			}
		`
	)
}