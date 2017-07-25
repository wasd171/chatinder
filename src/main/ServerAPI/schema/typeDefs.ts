import gql from 'graphql-tag'

export default gql`
	type FB {
		id: String
		token: String
	}

	type Query {
		fb: FB!
	}

	type GenericMutation {
		status: String!
	}

	type Mutation {
		loginFB: FB!
		showWindow: GenericMutation!
		logout: GenericMutation!
	}

	schema {
		query: Query
		mutation: Mutation
	}
`
