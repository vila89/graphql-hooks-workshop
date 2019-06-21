const fastifyGQL = require('fastify-gql')

const schema = `
  type User {
    name: String
  }

  type Query {
    users(skip: Int, limit: Int): [User]
    firstUser: User
    hello(name: String): String
  }

  type Mutation {
    createUser(name: String!): User
  }`

const users = [
  {
    name: 'Brian'
  },
  {
    name: 'Jack'
  },
  {
    name: 'Joe'
  },
  {
    name: 'Kristin'
  }
]

const resolvers = {
  Query: {
    users() {
      return users
    }
  },
  Mutation: {
    createUser(_, user) {
      users.push(user)
      return user
    }
  }
}

function registerGraphQL(fastify, opts, next) {
  fastify.register(fastifyGQL, {
    schema,
    resolvers,
    graphiql: true
  })

  next()
}

module.exports = registerGraphQL