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

export const userStreaks = pgTable('user_streaks', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull().unique(),
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  lastActivityDate: timestamp('last_activity_date'),
});

export const leaderboard = pgTable('leaderboard', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull().unique(),
  totalXp: integer('total_xp').default(0),
  updatedAt: timestamp('updated_at').defaultNow(),
});
