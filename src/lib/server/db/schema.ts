import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const members = sqliteTable('members', {
	cometCardID: text('comet_card_id').primaryKey(),
	netID: text('net_id'),
	name: text('name'),
	attendance: integer('attendance')
});

export const projects = sqliteTable('projects', {
	id: integer('id').primaryKey(),
	name: text('name')
});

export const memberProjects = sqliteTable('memberProjects', {
	memberID: integer('comet_card_id').references(() => members.cometCardID),
	projectID: integer('project_id').references(() => projects.id)
});
