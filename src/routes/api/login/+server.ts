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
		const attendanceTimestamps: number[] = JSON.parse(memberData.attendanceTimestamps!);
		const now = Date.now();

		console.log(attendanceTimestamps[attendanceTimestamps.length - 1]);
		console.log(now - (2 * 60 * 60 *1000));
		if (attendanceTimestamps[attendanceTimestamps.length - 1] >= now - (2 * 60 * 60 * 1000)) {
			return json(null, { status: 403 });
		}

		attendanceTimestamps.push(now);

		// if the member data exists, increase their attendance count by 1
		await db
			.update(members)
			.set({
				attendanceCount: (memberData.attendanceCount || 0) + 1,
				attendanceTimestamps: JSON.stringify(attendanceTimestamps),
			})
			.where(eq(members.cometCardID, data.cometCardID));

		// OK!
		return json(null, { status: 200 });
	} else {
		// not OK ;(
		return json(null, { status: 400 });
	}
}
