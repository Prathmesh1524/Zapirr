"use strict";
// RUN THE INFINTE LOOP WEHRE IT PICK PROCESE FROM DATABASE AND PUT THEM TO THE KAFAK QUEUE
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const kafkajs_1 = require("kafkajs");
const TOPIC_NAME = "zap-events";
const client = new client_1.PrismaClient();
//initialize the kafka  
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox_processor',
    brokers: ['localhost:9092']
});
//PRODUCER -> PUTTING THE ACTIONS TO THE QUEUE
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = kafka.producer();
        yield producer.connect();
        // runs the infinit loop
        while (1) {
            const pendingRows = yield client.zapRunOutBox.findMany({
                where: {},
                take: 10
            });
            // puuting the bulk elements in the kafka queue
            producer.send({
                topic: TOPIC_NAME,
                messages: pendingRows.map(r => ({
                    value: r.zaprunid
                }))
            });
            yield client.zapRunOutBox.deleteMany({
                where: {
                    id: {
                        in: pendingRows.map(r => r.id)
                    }
                }
            });
        }
    });
}
main();
