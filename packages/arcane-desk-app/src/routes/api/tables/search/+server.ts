import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import GameTableModel, { type IGameTableLean } from '$lib/server/models/GameTable'; // Use IGameTableLean
import connectDB from '$lib/server/db/mongoose';
import type { SearchCriteria } from '$lib/components/SearchFilter.svelte';

export const POST: RequestHandler = async ({ request }) => {
    try {
        await connectDB();

        const criteria = (await request.json()) as SearchCriteria;

        // Basic validation for criteria
        if (!criteria || typeof criteria.searchTerm !== 'string') {
            throw error(400, 'Invalid search criteria provided.');
        }

        const { searchTerm, searchByName, searchByTag, searchByBook, searchBySystem } = criteria;
        let tablesFromDB: IGameTableLean[]; // Use IGameTableLean

        // If search term is empty, and no specific fields are forced (e.g. by a future 'show all from system X' feature),
        // it's often best to return all or an empty set.
        // For now, if searchTerm is empty, let's return all tables.
        // If you prefer to return an empty list if the search term is empty, adjust this logic.
        if (!searchTerm.trim()) {
            tablesFromDB = await GameTableModel.find().lean<IGameTableLean[]>().exec();
        } else {
            const queryConditions: Record<string, any>[] = [];
            const regexQuery = { $regex: searchTerm.trim(), $options: 'i' }; // Case-insensitive regex

            if (searchByName) {
                queryConditions.push({ name: regexQuery });
            }
            if (searchByTag) {
                // For arrays, $regex matches if any element in the array matches.
                queryConditions.push({ tags: regexQuery });
            }
            if (searchByBook) {
                queryConditions.push({ sourceBook: regexQuery });
            }
            if (searchBySystem) {
                queryConditions.push({ rpgSystem: regexQuery });
            }

            let finalQuery = {};
            if (queryConditions.length > 0) {
                finalQuery = { $or: queryConditions };
            } else {
                // If a search term is provided but no search fields are selected,
                // it means there's nowhere to apply the search. Return empty.
                return json([]);
            }

            tablesFromDB = await GameTableModel.find(finalQuery).lean<IGameTableLean[]>().exec();
        }
        // Serialize _id to string for all tables before sending
        const serializedTables = tablesFromDB.map(table => ({
            ...table,
            _id: table._id.toString(), // table._id is Types.ObjectId
            createdAt: table.createdAt?.toISOString(), // Serialize Date
            updatedAt: table.updatedAt?.toISOString(), // Serialize Date
        }));

        return json(serializedTables);
    } catch (e: any) {
        console.error('Error searching tables:', e);
        if (e.status && e.body) {
            // Re-throw SvelteKit errors
            throw e;
        }
        throw error(500, e.message || 'Failed to search tables');
    }
};