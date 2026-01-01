import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { auth } from "./utils/auth";
import matchRoutes from "./routes/matchRoute";
import fastifyIO from "fastify-socket.io";



const app=fastify({
    logger:true
})

const PORT=3000

await app.register(fastifyIO,{
  cors: {
    origin: ["http://localhost:4000"]
  }
});

app.register(fastifyCors, {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:4000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With"
  ],
  credentials: true,
  maxAge: 86400
});

app.register(matchRoutes);


app.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    try {
      // Construct request URL
      const url = new URL(request.url, `http://${request.headers.host}`);
      
      // Convert Fastify headers to standard Headers object
      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) headers.append(key, value.toString());
      });
      // Create Fetch API-compatible request
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
      });
      // Process authentication request
      const response = await auth.handler(req);
      // Forward response to client
      reply.status(response.status);
      response.headers.forEach((value, key) => reply.header(key, value));
      reply.send(response.body ? await response.text() : null);
    } catch (err:any) {
      app.log.error("Authentication Error:", err);
      reply.status(500).send({ 
        error: "Internal authentication error",
        code: "AUTH_FAILURE"
      });
    }
  }
});



app.get("/", (req, reply) => {
  if (app.io) {
    app.io.emit("Hello");
    reply.send({ message: "Socket.IO event emitted" });
  } else {
    reply.status(500).send({ error: "Socket.IO not initialized" });
  }
});

app.ready().then(() => {
  app.io.on("connection", (socket) => {
    console.log("Socket connected");
    socket.emit("Hello from server");
    socket.on("message", (data) => {
      console.log("Message received from client:", data);
      console.log(socket.id);
    });
  });
});


app.listen({port:PORT},()=>{
    console.log(`server running on port : ${PORT}`)
})