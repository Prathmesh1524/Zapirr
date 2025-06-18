// RUN THE INFINTE LOOP WEHRE IT PICK PROCESE FROM DATABASE AND PUT THEM TO THE KAFAK QUEUE

import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events"

const client = new PrismaClient();


//initialize the kafka  
const kafka = new Kafka({
    clientId: 'outbox_processor',
    brokers: ['localhost:9092']
})

//PRODUCER -> PUTTING THE ACTIONS TO THE QUEUE
async function main() {
    const producer = kafka.producer()
    await producer.connect();
    // runs the infinit loop
    while (1) {
        const pendingRows = await client.zapRunOutBox.findMany({
            where: {},
            take: 10
        })
        // puuting the bulk elements in the kafka queue
        
        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map(r => ({
                value: r.zaprunid
            }))
        })
        await client.zapRunOutBox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(r => r.id)
                }
            }
        })
    }

}

main();