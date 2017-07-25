import { AbstractAppManager, AbstractFB } from '.'
import { GraphQLSchema } from 'graphql'

export abstract class AbstractServerAPIParams {
	schema: GraphQLSchema
	app: AbstractAppManager
	fb: AbstractFB
}
