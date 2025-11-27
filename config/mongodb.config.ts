import { registerAs } from '@nestjs/config';

export default function getMongoConfig() {
  return registerAs('mongodb', () => ({
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
}
