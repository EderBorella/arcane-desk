import mongoose, { Schema, type Document, type Model, Types } from 'mongoose';

// Interface for the 'table' subdocument data (for input and schema)
export interface ITableData {
    columns: string[];
    values: (string | number | null)[][];
}

// Interface for the GameTable data (for input)
export interface IGameTableInput {
    name: string;
    rpgSystem: string;
    sourceBook: string;
    sourceReference: string;
    description: string;
    tags?: string[]; // Optional in input, schema defaults to []
    rollType?: string | null; // Optional in input, schema defaults to null
    table: ITableData;
}

// Interface for the GameTable document (includes Mongoose Document properties)
export interface IGameTableDocument extends IGameTableInput, Document {
    createdAt?: Date;
    updatedAt?: Date;
}

// Interface for the plain JavaScript object returned by .lean()
// This includes all fields from IGameTableInput, plus _id and timestamps.
export interface IGameTableLean extends IGameTableInput {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const TableSubdocumentSchema = new Schema<ITableData>(
    {
        columns: { type: [String], required: true },
        values: { type: [[Schema.Types.Mixed]], required: true } // Array of arrays of Mixed
    },
    { _id: false }
); // No separate _id for subdocument

const GameTableSchema = new Schema<IGameTableDocument>(
    {
        name: { type: String, required: true, trim: true },
        rpgSystem: { type: String, required: true, trim: true },
        sourceBook: { type: String, required: true, trim: true },
        sourceReference: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        tags: { type: [String], default: [] },
        rollType: { type: String, default: null, trim: true },
        table: { type: TableSubdocumentSchema, required: true }
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
        collection: 'game_tables' // Optional: specify collection name
    }
);

GameTableSchema.index({ name: 1, rpgSystem: 1 });
GameTableSchema.index({ tags: 1 });

const GameTableModel: Model<IGameTableDocument> =
    mongoose.models.GameTable || mongoose.model<IGameTableDocument>('GameTable', GameTableSchema);

export default GameTableModel;