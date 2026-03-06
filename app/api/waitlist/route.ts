import { NextResponse } from 'next/server';
import { db, hasDatabase } from '@/lib/db';
import { waitlist } from '@/db/schema';
import { addToWaitlistLocal, DuplicateEmailError } from '@/lib/waitlist-local';
import { z } from 'zod';

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = formSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.format().email?._errors[0] || "Invalid input" }, { status: 400 });
        }

        const { email } = result.data;

        const country = request.headers.get('x-vercel-ip-country') || null;
        const city = request.headers.get('x-vercel-ip-city') || null;
        const region = request.headers.get('x-vercel-ip-country-region') || null;
        const ip = request.headers.get('x-forwarded-for') || null;

        try {
            if (hasDatabase && db) {
                await db.insert(waitlist).values({
                    email,
                    country,
                    city,
                    region,
                    ip
                });
            } else {
                await addToWaitlistLocal({ email, country, city, region, ip });
            }

            console.log(`[Waitlist API] ✅ Successfully added ${email} to ${hasDatabase ? 'DB' : 'local store'}`);
            console.log(`[Waitlist API] 📍 Location: ${city || 'Unknown'}, ${region || 'Unknown'}, ${country || 'Unknown'}`);
            console.log(`[Waitlist API] 🌐 IP: ${ip || 'Unknown'}`);
            console.log(`[Waitlist API] Triggering notifications...`);

            // Send Brevo email notification
            const { sendWaitlistEmailNotification } = await import('@/lib/brevo');
            try {
                await sendWaitlistEmailNotification(email, country);
            } catch (err) {
                console.error('[API] ❌ Brevo Email Notification Failed:', err);
            }

            console.log(`[Waitlist API] ✅ All notifications sent for ${email}`);

            return NextResponse.json({ success: true, message: 'Joined waitlist successfully' }, { status: 201 });
        } catch (error: unknown) {
            if (error instanceof DuplicateEmailError || (error as { code?: string })?.code === '23505') {
                return NextResponse.json({ error: 'This email is already on the waitlist' }, { status: 409 });
            }
            throw error;
        }
    } catch (error) {
        console.error('Waitlist API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
