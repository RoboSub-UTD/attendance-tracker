import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { memberProjects, members, projects } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	const data = await request.json();

	// check if the member already exists in the database
	const memberData = (
		await db
			.select({ cometCardID: members.cometCardID })
			.from(members)
			.where(eq(members.cometCardID, data.cometCardID))
	)[0];

	if (memberData) {
		// if they already exist in the database, don't let them re-register!
		return json({}, { status: 400 });
	} else {
		// if they don't exist, insert them into the database
		await db.insert(members).values({
			cometCardID: data.cometCardID,
			netID: data.netID,
			name: data.name,
			attendance: 0
		});

		// for every project
		for (const project of Object.entries(data.projects)) {
			// if the member is a part of that projects
			if (project[1]) {
				// get the project id from its name
				const projectID = (
					await db
						.select({ projectID: projects.id })
						.from(projects)
						.where(eq(projects.name, project[0]))
				)[0].projectID;

				// insert the member and project ids into the 'memberProjects' table
				await db.insert(memberProjects).values({
					memberID: data.cometCardID,
					projectID
				});
			}
		}

		// :+1:
		return json({}, { status: 200 });
	}
}
