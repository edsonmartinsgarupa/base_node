require('dotenv').config()

console.log(process.env.NODE_ENV)

const eProducao = process.env.NODE_ENV.toLocaleLowerCase() === 'production'

const pastaRaiz = eProducao
  ? 'dist'
  : 'src'

let config = {}

if (process.env.NODE_ENV.toLocaleLowerCase() === 'test') {
  config = {
    type: 'sqlite',
    database: './testdb.sql',
    entities: [
      pastaRaiz + '/infra/database/entities/**/*'
    ],
    migrations: [
      pastaRaiz + '/infra/database/migrations/**/*'
    ]
  }
} else {
  config = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: [
      pastaRaiz + '/infra/database/entities/**/*'
    ],
    migrations: [
      pastaRaiz + '/infra/database/migrations/**/*'
    ],
    cli: {
      entitiesDir: 'src/infra/database/entities',
      migrationsDir: 'src/infra/database/migrations'
    }
  }
}

module.exports = config
