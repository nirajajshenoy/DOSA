import Fastify from "fastify";
import mongoose from "mongoose";
import DataModel from "./dataModel.js";

const fastify = Fastify({ logger: true });
let url = "mongodb+srv://nirajashenoy:Srinav2017@cluster0.63qi020.mongodb.net/Devops?retryWrites=true&w=majority"
mongoose.connect(url)
fastify.get("/", async (request, reply) => {
    return { hello: "world" };
});
fastify.post('/data', async (request, reply) => {
    const existingData = await DataModel.findOne({ key: "store" })
    if (existingData) {
        existingData.data = request.body.data
        await existingData.save()
    } else {
        const data = new DataModel({ data: request.body.data })
        await data.save()
    }
    reply.code(201).send({ message: "Success" })
}) 

fastify.get('/data', async (request, reply) => {
    const data = await DataModel.find()
    let result = data[0].data
    reply.code(200).send({ data: result })
})

const start = async () => {
    try {
        await fastify.listen({ port: 3001, host: '0.0.0.0' })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
    
