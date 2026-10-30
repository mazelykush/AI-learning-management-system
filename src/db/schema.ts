import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), 
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const learningPaths = pgTable('learning_paths', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  level: integer('level').notNull(),
});

export const modules = pgTable('modules', {
  id: serial('id').primaryKey(),
  pathId: integer('path_id').references(() => learningPaths.id).notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  order: integer('order').notNull(),
});

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  moduleId: integer('module_id').references(() => modules.id).notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  type: text('type').notNull(), 
  order: integer('order').notNull(),
});
