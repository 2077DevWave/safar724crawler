import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
	test: {
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.jsonc' },
			},
		},
		deps: {
			// 👇 This tells Vite to inline the deps (like miniflare) instead of trying to resolve "node:*"
			inline: ['miniflare'],
		},
	},
	resolve: {
		alias: {
		  'node:crypto': 'crypto',
		  'node:assert': 'assert',
		},
	},
});
