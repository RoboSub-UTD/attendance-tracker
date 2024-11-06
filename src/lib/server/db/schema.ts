import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const members = sqliteTable('members', {
	netID: text('net_id').primaryKey(),
	name: text('name'),
	attendance: integer('attendance')
});

export const projects = sqliteTable('projects', {
	id: integer('id').primaryKey(),
	name: text('name')
});

export const memberProjects = sqliteTable('memberProjects', {
	memberID: integer('member_net_id').references(() => members.netID),
	projectID: integer('project_id').references(() => projects.id)
});
