// PULL THE THINGS FROM QUEUE AND RUN THEM 

import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events"

//initialize the kafka  
const kafka = new Kafka({
    clientId: 'outbox_processor',
    brokers: ['localhost:9092']
})

//CONSUMER -> PULL THE ACTIONS FROM QUEUE AND WORK ON THEM
async function main() {
    const consumer = kafka.consumer({groupId:'main-worker'})
    await consumer.connect();   
    //dont need to run the infinte loop
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })
    await consumer.run({
        autoCommit:false,
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            partition,
            offset: message.offset,
            value: message.value.toString(),
          })

          await new Promise( r =>setTimeout(r,5000) )
          console.log("processeind done");
          
          await consumer.commitOffsets([{
            topic:TOPIC_NAME,
            partition:partition,
            offset: (parseInt(message.offset) +1 ).toString()
          }])
        },
      })  

}

main();