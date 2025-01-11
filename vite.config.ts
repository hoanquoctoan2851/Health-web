import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "sass";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnvConfig";
import tailwindcss from "tailwindcss";
export default defineConfig((mode: ConfigEnv): UserConfig => {
	const env = loadEnv(mode.mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	return {
		server: {
			port: viteEnv.VITE_PORT
		},
		preview: {
			port: viteEnv.VITE_PORT
		},
		plugins: [react()],
		css: {
			preprocessorOptions: {
				scss: {
					implementation: sass
				}
			},
			postcss: {
				plugins: [tailwindcss()]
			}
		},
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		}
	};
});
