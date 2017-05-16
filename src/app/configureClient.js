import { ApolloClient, toIdValue } from 'apollo-client'
import { createElectronInterface } from './graphql'

function dataIdFromObject(obj) {
	return obj._id || obj.id
}

export default function configureClient() {
	const electronInterface = createElectronInterface()

	const client = new ApolloClient({
		networkInterface: electronInterface
	})

	return client
}
