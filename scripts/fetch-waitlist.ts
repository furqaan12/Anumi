import { config } from 'dotenv';
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { waitlist } from "@/db/schema";

// Load environment variables
config();

const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_furDZhM5gPx4@ep-patient-firefly-a11ycgdw-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

async function fetchWaitlist() {
    try {
        console.log('Connecting to database...');
        const sql = neon(databaseUrl);
        const db = drizzle(sql, { schema: { waitlist } });

        console.log('Fetching waitlist entries...\n');
        const entries = await db.select().from(waitlist);

        console.log(`Total entries: ${entries.length}\n`);
        console.log('='.repeat(80));

        entries.forEach((entry, index) => {
            console.log(`\n${index + 1}. Email: ${entry.email}`);
            console.log(`   Country: ${entry.country || 'N/A'}`);
            console.log(`   City: ${entry.city || 'N/A'}`);
            console.log(`   Region: ${entry.region || 'N/A'}`);
            console.log(`   IP: ${entry.ip || 'N/A'}`);
            console.log(`   Joined: ${entry.createdAt}`);
        });

        console.log('\n' + '='.repeat(80));
        console.log('\nEmails only:');
        console.log(entries.map(e => e.email).join(', '));

        console.log('\n\nCSV Format:');
        console.log('Email,Country,City,Region,IP,Created At');
        entries.forEach(entry => {
            console.log(`${entry.email},${entry.country || ''},${entry.city || ''},${entry.region || ''},${entry.ip || ''},${entry.createdAt}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error fetching waitlist:', error);
        process.exit(1);
    }
}

fetchWaitlist();
