import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { memberProjects, members, projects } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	const data = await request.json();

	const memberData = (
		await db
			.select({ member_net_id: members.netID })
			.from(members)
			.where(eq(members.netID, data.netID))
	)[0];

	console.log(data.netID);

	if (memberData) {
		console.log(`${members.netID} already registered`);
		return json({}, { status: 400 });
	} else {
		await db.insert(members).values({
			netID: data.netID,
			name: data.name,
			attendance: 1
		});

		for (const project of Object.entries(data.projects)) {
			if (project[1]) {
				const projectID = (
					await db
						.select({ projectID: projects.id })
						.from(projects)
						.where(eq(projects.name, project[0]))
				)[0].projectID;

				await db.insert(memberProjects).values({
					memberID: data.netID,
					projectID
				});
			}
		}

		console.log(`Successfully registered ${data.name} (${data.netID})`);

		return json({}, { status: 200 });
	}
}
