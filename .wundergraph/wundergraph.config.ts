import { configureWunderGraphApplication, cors, EnvironmentVariable, introspect, templates } from '@wundergraph/sdk';
import server from './wundergraph.server';
import operations from './wundergraph.operations';

const strapi = introspect.graphql({
	apiNamespace: 'backend',
	url: 'http://localhost:1337/graphql',
})
const spaceX = introspect.graphql({
	apiNamespace: 'spacex',
	url: 'https://spacex-api.fly.dev/graphql/',
})
// configureWunderGraph emits the configuration
configureWunderGraphApplication({
	apis: [spaceX, strapi],
	server,
	operations,
	codeGenerators: [
		{
			templates: [...templates.typescript.all],
		},
		{
			templates: [templates.typescript.client],
			path: '../components/generated',
		},
	],
	cors: {
		...cors.allowAll,
		allowedOrigins:
			process.env.NODE_ENV === 'production'
				? [
					// change this before deploying to production to the actual domain where you're deploying your app
					'http://localhost:3000',
				]
				: ['http://localhost:3000', new EnvironmentVariable('WG_ALLOWED_ORIGIN')],
	},
	security: {
		enableGraphQLEndpoint: process.env.NODE_ENV !== 'production' || process.env.GITPOD_WORKSPACE_ID !== undefined,
	},
});
