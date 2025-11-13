import Elysia from "elysia";


const helloRoute = new Elysia().get("/hello:id", (ctx) => {
 console.log(ctx)
})


export default helloRoute