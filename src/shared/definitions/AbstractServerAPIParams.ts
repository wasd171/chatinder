import {
	AbstractAppManager,
	AbstractFB
	// AbstractRefetcher,
	// AbstractNotifierServer,
	// AbstractTinderAPI
} from '.'
import { GraphQLSchema } from 'graphql'

export abstract class AbstractServerAPIParams {
	schema: GraphQLSchema
	db: {
		extra: Nedb
		matches: Nedb
		pending: Nedb
	}

	app: AbstractAppManager
	fb: AbstractFB
	// tinder: AbstractTinderAPI
	// refetcher: AbstractRefetcher
	// notifierServer: AbstractNotifierServer
}
