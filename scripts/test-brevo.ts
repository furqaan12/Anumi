import { config } from 'dotenv';
import { sendWaitlistEmailNotification } from '../lib/brevo';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function testBrevoEmail() {
    console.log('='.repeat(80));
    console.log('Testing Brevo Email Integration');
    console.log('='.repeat(80));
    console.log('\n');

    // Simulate a waitlist signup
    const testEmail = 'test.user@example.com';
    const testCountry = 'India';

    console.log('Simulating waitlist signup with:');
    console.log(`  Email: ${testEmail}`);
    console.log(`  Country: ${testCountry}`);
    console.log('\n');

    console.log('Sending email notification to furqaan616@gmail.com...');
    console.log('\n');

    try {
        const result = await sendWaitlistEmailNotification(testEmail, testCountry);

        console.log('\n');
        console.log('='.repeat(80));
        console.log('✅ Test completed successfully!');
        console.log('='.repeat(80));
        console.log('\nCheck your inbox at furqaan616@gmail.com');
        console.log('The email should contain details about the test waitlist signup.');

    } catch (error) {
        console.error('\n');
        console.error('='.repeat(80));
        console.error('❌ Test failed!');
        console.error('='.repeat(80));
        console.error('\nError:', error);
    }

    process.exit(0);
}

testBrevoEmail();
