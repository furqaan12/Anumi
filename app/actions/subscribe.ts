'use server';

import { db, hasDatabase } from '@/lib/db';
import { waitlist } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { addToWaitlistLocal, DuplicateEmailError } from '@/lib/waitlist-local';

import { z } from 'zod';

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

export async function joinWaitlist(formData: FormData) {
    const emailInput = formData.get('email');

    const result = formSchema.safeParse({ email: emailInput });

    if (!result.success) {
        const createErrorMessage = () => {
            const formatted = result.error.format();
            return formatted.email?._errors[0] || "Invalid input";
        }
        return { error: createErrorMessage() };
    }

    const { email } = result.data;

    const headersList = await headers();
    const country = headersList.get('x-vercel-ip-country') || null;
    const city = headersList.get('x-vercel-ip-city') || null;
    const region = headersList.get('x-vercel-ip-country-region') || null;
    const ip = headersList.get('x-forwarded-for') || null;

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

        console.log(`[Subscribe Action] ✅ Successfully added ${email} to ${hasDatabase ? 'DB' : 'local store'}`);
        console.log(`[Subscribe Action] 📍 Location: ${city || 'Unknown'}, ${region || 'Unknown'}, ${country || 'Unknown'}`);
        console.log(`[Subscribe Action] 🌐 IP: ${ip || 'Unknown'}`);
        console.log(`[Subscribe Action] Triggering notifications...`);

        // Send Brevo email notification
        const { sendWaitlistEmailNotification } = await import('@/lib/brevo');
        try {
            await sendWaitlistEmailNotification(email, country);
        } catch (err) {
            console.error('[Action] ❌ Brevo Email Notification Failed:', err);
        }

        console.log(`[Subscribe Action] ✅ All notifications sent for ${email}`);

        revalidatePath('/');
        return { success: true, message: "You're on the waitlist! We'll be in touch soon." };
    } catch (error: unknown) {
        console.error('Waitlist submission error:', error);
        const err = error as { code?: string; cause?: { code?: string }; message?: string };
        if (error instanceof DuplicateEmailError || err?.code === '23505' || err?.cause?.code === '23505') {
            return { error: 'You are already on our waitlist. We will get back to you shortly!' };
        }
        if (err?.code === 'EAI_AGAIN' || err?.cause?.code === 'EAI_AGAIN') {
            return { error: 'Network connection issue. Please check your internet and try again.' };
        }
        return { error: `Something went wrong. Please try again. Debug: ${err?.message || JSON.stringify(error)}` };
    }
}
