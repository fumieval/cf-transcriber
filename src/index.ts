import { Buffer } from 'buffer';

export interface Env {
	AI: Ai;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const blob = await request.arrayBuffer();

		const input = {
			audio: Buffer.from(blob).toString('base64'),
			language: 'ja',
			vad_filter: 'true',
			initial_prompt: `あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。`
		};

		const response = await env.AI.run(
			'@cf/openai/whisper-large-v3-turbo',
			input
		);

		return Response.json(response);
	},
};
