import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      proxy: {
        "/api/kakao-local": {
          target: "https://dapi.kakao.com",
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/kakao-local/, ""),
          headers: {
            Authorization: `KakaoAK ${env.VITE_KAKAO_REST_API_KEY}`,
          },
        },
      },
    },
  };
});
