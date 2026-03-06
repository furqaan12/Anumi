import { config } from 'dotenv';
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { waitlist } from "@/db/schema";
import { desc } from "drizzle-orm";

// Load environment variables
config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL!;

async function showWaitlistLogs() {
    try {
        console.log('\n' + '='.repeat(80));
        console.log('                    📋 WAITLIST EMAIL SIGNUP LOGS');
        console.log('='.repeat(80) + '\n');

        console.log('Connecting to database...');
        const sql = neon(databaseUrl);
        const db = drizzle(sql, { schema: { waitlist } });

        console.log('Fetching waitlist entries (most recent first)...\n');
        const entries = await db.select().from(waitlist).orderBy(desc(waitlist.createdAt));

        if (entries.length === 0) {
            console.log('📭 No waitlist entries found.\n');
            process.exit(0);
        }

        console.log(`📊 Total Entries: ${entries.length}\n`);
        console.log('='.repeat(80));

        entries.forEach((entry, index) => {
            const createdDate = new Date(entry.createdAt!);
            const timeAgo = getTimeAgo(createdDate);

            console.log(`\n┌─ Entry #${entries.length - index} ─────────────────────────────────────`);
            console.log(`│`);
            console.log(`│ 📧 Email:       ${entry.email}`);
            console.log(`│ 📍 Location:    ${entry.city || 'N/A'}, ${entry.region || 'N/A'}, ${entry.country || 'N/A'}`);
            console.log(`│ 🌐 IP Address:  ${entry.ip || 'N/A'}`);
            console.log(`│ ⏰ Joined:       ${createdDate.toLocaleString()} (${timeAgo})`);
            console.log(`│`);
            console.log(`└${'─'.repeat(78)}`);
        });

        console.log('\n' + '='.repeat(80));
        console.log('\n📝 Summary by Country:\n');

        const countryStats: Record<string, number> = {};
        entries.forEach(entry => {
            const country = entry.country || 'Unknown';
            countryStats[country] = (countryStats[country] || 0) + 1;
        });

        Object.entries(countryStats)
            .sort((a, b) => b[1] - a[1])
            .forEach(([country, count]) => {
                const percentage = ((count / entries.length) * 100).toFixed(1);
                const bar = '█'.repeat(Math.ceil(count / 2));
                console.log(`  ${country.padEnd(20)} ${count.toString().padStart(3)} (${percentage}%) ${bar}`);
            });

        console.log('\n' + '='.repeat(80));
        console.log('\n📧 All Email Addresses:\n');
        console.log(entries.map(e => e.email).join('\n'));

        console.log('\n' + '='.repeat(80));
        console.log('\n📑 CSV Export Format:\n');
        console.log('Email,Country,City,Region,IP,Created At');
        entries.forEach(entry => {
            console.log(`${entry.email},${entry.country || ''},${entry.city || ''},${entry.region || ''},${entry.ip || ''},${entry.createdAt}`);
        });

        console.log('\n' + '='.repeat(80));
        console.log(`\n✅ Successfully retrieved ${entries.length} waitlist entries!\n`);

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error fetching waitlist:', error);
        process.exit(1);
    }
}

function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return `${diffSecs} seconds ago`;
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} months ago`;

    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears} years ago`;
}

showWaitlistLogs();
