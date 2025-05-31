import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import GameTableModel, {
    type IGameTableDocument,
    type IGameTableInput
} from '$lib/server/models/GameTable';

import connectDB from '$lib/server/db/mongoose';

export const GET: RequestHandler = async () => {
    try {
        await connectDB();
        const tables = await GameTableModel.find().lean<IGameTableDocument>().exec();
        return json(tables);
    } catch (e: any) {
        console.error('Error fetching tables:', e);
        throw error(500, e.message || 'Failed to fetch tables');
    }
};