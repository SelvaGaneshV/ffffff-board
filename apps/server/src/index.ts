import { cors } from "@elysiajs/cors";
import { node } from "@elysiajs/node";
import "dotenv/config";
import { Elysia } from "elysia";
import helloRoute from "./hello";

const elysia = new Elysia({ adapter: node() })
	.use(
		cors({
			origin: process.env.CORS_ORIGIN || "",
			methods: ["GET", "POST", "OPTIONS"],
		}),
	)
	.use(helloRoute)
	.listen(3060, () => {
		console.log("Server is running on http://localhost:3060");
	});


export type App = typeof elysia