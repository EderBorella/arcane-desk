import mongoose, { type Mongoose as MongooseInstanceType } from 'mongoose';
import { env } from '$env/dynamic/private'; // For SvelteKit environment variables
import GameTableModel, { type IGameTableInput } from '$lib/server/models/GameTable';
import dndTablesData from '$lib/tables/D&D.json'; // SvelteKit's $lib alias should resolve this

const MONGODB_URI = env.MONGODB_URI || 'mongodb://localhost:27017/arcane_desk_db';

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env or your environment'
    );
}

async function seedDatabaseIfEmpty(): Promise<void> {
    try {
        // Ensure GameTableModel is initialized (Mongoose typically handles this well)
        const count = await GameTableModel.countDocuments().exec();
        if (count === 0) {
            console.log('MongoDB: GameTable collection is empty. Seeding data...');
            const tablesToSeed = dndTablesData as IGameTableInput[];
            await GameTableModel.insertMany(tablesToSeed);
            console.log('MongoDB: GameTable data seeded successfully.');
        } else {
            // console.log('MongoDB: GameTable collection is not empty. Skipping seed.'); // Optional: for less verbose logs
        }
    } catch (error) {
        console.error('MongoDB: Error during database seeding:', error);
        // Depending on your app's needs, you might want to throw this error
        // or handle it more gracefully if seeding is not critical for startup.
    }
}

interface MongooseCache {
    conn: MongooseInstanceType | null;
    promise: Promise<MongooseInstanceType> | null;
}

// Augment NodeJS.Global to include mongoose cache
declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<MongooseInstanceType> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        console.log('MongoDB: Creating new connection');
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongooseInstance) => {
            console.log('MongoDB: Connected');
            // This .then block runs once the initial connection is successful.
            // It's a good place to run one-time setup tasks.
            return seedDatabaseIfEmpty().then(() => {
                console.log('MongoDB: Connected and initial checks/seeding complete.');
                return mongooseInstance;
            });
        });

    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;