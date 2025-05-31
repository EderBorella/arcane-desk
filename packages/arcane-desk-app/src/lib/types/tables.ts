// d:\Projects\Arcane-Desk\arcane-desk\packages\arcane-desk-app\src\lib\types\rpgTable.ts
import type { ObjectId } from 'mongodb';

// This represents the structure of the data you expect to receive,
// and the core fields you'll store, excluding MongoDB-generated ones.
export interface RpgTableData {
    name: string;
    rpgSystem: string;
    sourceBook: string;
    sourceReference: string;
    description: string;
    tags: string[];
    rollType: string | null;
    table: {
        columns: string[];
        values: (string | number | null)[][];
    };
}

// This represents the document as it's stored in MongoDB, including _id and timestamps.
export interface RpgTableDocument extends RpgTableData {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// This is a client-friendly version, where _id is converted to a string 'id'.
export interface RpgTable extends Omit<RpgTableDocument, '_id'> {
    id: string;
}

/**
 * Helper function to transform a MongoDB document to a client-friendly RpgTable object.
 * It converts the ObjectId _id to a string id.
 */
export function fromDocumentToRpgTable(doc: RpgTableDocument): RpgTable {
    const { _id, ...rest } = doc;
    return {
        id: _id.toHexString(),
        ...rest
    };
}
