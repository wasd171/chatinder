import { ApolloClient } from 'apollo-client'
import { createElectronInterface } from './graphql'

export default function configureClient() {
	const electronInterface = createElectronInterface()

	const client = new ApolloClient({
		networkInterface: electronInterface
	})

	return client
}
