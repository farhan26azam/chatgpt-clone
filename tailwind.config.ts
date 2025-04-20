import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            table: {
              width: "100%",
              borderCollapse: "collapse"
            },
            th: {
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              padding: "0.5rem",
              fontWeight: "600"
            },
            td: {
              border: "1px solid #e5e7eb",
              padding: "0.5rem"
            }
          }
        },
      }
    }
  },
  plugins: [typography]
};
export default config;
