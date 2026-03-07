import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { waitlist } from '../db/schema';
// Dynamic import to allow dotenv to load first
// import { db } from '../lib/db';

async function main() {
    try {
        console.log('Testing connection...');
        const { db, hasDatabase } = await import('../lib/db');
        if (!hasDatabase || !db) {
            console.log('No database configured (DATABASE_URL not set).');
            process.exit(0);
        }
        const result = await db.select().from(waitlist).limit(1);
        console.log('Connection successful:', result);
        process.exit(0);
    } catch (err) {
        console.error('Connection failed:', err);
        process.exit(1);
    }
}

main();
