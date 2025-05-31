import GameTableModel, { type IGameTableInput, type IGameTableLean } from '$lib/server/models/GameTable';
import connectDB from '$lib/server/db/mongoose';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'; // Corrected import path

// This type defines the structure of a single table object as it will be passed to the +page.svelte component.
// It ensures _id is a string and other necessary transformations are considered.
// It's based on IGameTableInput, which contains the core data fields.
export type TableViewData = IGameTableInput & {
    _id: string;
    createdAt?: string; // Optional: if you want to pass dates as strings
    updatedAt?: string; // Optional: if you want to pass dates as strings
};

export const load: PageServerLoad = async () => {
    try {
        await connectDB();

        // Fetch all tables initially.
        // Use .lean<IGameTableLean[]>() to get plain JS objects with correct typing.
        const initialTableDocs = await GameTableModel.find()
            .lean<IGameTableLean[]>()
            .exec();

        // Serialize data for the client: convert ObjectId to string, handle Dates, etc.
        const tables: TableViewData[] = initialTableDocs.map(doc => ({
            ...doc, // Spread properties from IGameTableLean
            _id: doc._id.toString(), // doc._id is now Types.ObjectId, .toString() is safe
            createdAt: doc.createdAt?.toISOString(), // Serialize Date to string
            updatedAt: doc.updatedAt?.toISOString(), // Serialize Date to string
        }));

        return { tables }; // This will be available as `data.tables` in +page.svelte
    } catch (e: any) {
        console.error('Failed to load initial tables for /tables page:', e);
        throw error(500, 'Could not retrieve the list of arcane tables. The archives may be disturbed.');
    }
};