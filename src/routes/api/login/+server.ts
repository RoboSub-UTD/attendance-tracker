import { members } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const data = await request.json();

	const memberData = (await db.select().from(members).where(eq(members.netID, data.netID)))[0];

	if (memberData) {
		await db
			.update(members)
			.set({ attendance: (memberData.attendance || 0) + 1 })
			.where(eq(members.netID, data.netID));

		console.log(`Successfully counted attendance for ${memberData.name} (${memberData.netID})`);
		return json(null, { status: 200 });
	} else {
		console.log(
			`Failed to count attendance for netID ${data.netID}. Redirecting to registration page`
		);
		return json(null, { status: 303 });
	}
}
