import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users, lessons } from './schema.ts';

export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  lessonId: integer('lesson_id').references(() => lessons.id).notNull(),
  completed: integer('completed').default(0),
  score: integer('score').default(0),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const xpTransactions = pgTable('xp_transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  amount: integer('amount').notNull(),
  activityType: text('activity_type').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userAchievements = pgTable('user_achievements', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  achievementName: text('achievement_name').notNull(),
  unlockedAt: timestamp('unlocked_at').defaultNow(),
});
