import { members } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const data = await request.json();

	// get all the member data for a given cometCardID
	const memberData = (
		await db.select().from(members).where(eq(members.cometCardID, data.cometCardID))
	)[0];

	if (memberData) {
		// if the member data exists, increase their attendance count by 1
		await db
			.update(members)
			.set({ attendance: (memberData.attendance || 0) + 1 })
			.where(eq(members.cometCardID, data.cometCardID));

		// OK!
		return json(null, { status: 200 });
	} else {
		// not OK ;(
		return json(null, { status: 400 });
	}
}
