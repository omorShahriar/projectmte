import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
// Use this object to send drizzle queries to your DB

// Create a pgTable that maps to a table in your DB
export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.email),
    };
  }
);

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
}));

export const profiles = pgTable(
  "profiles",
  {
    id: text("id")
      .$defaultFn(() => createId())
      .primaryKey(),
    userId: text("user_id").references(() => users.id),
    bio: text("bio"),
    role: text("role").notNull().default("user"),
    githubLink: text("github_link"),
    linkedinLink: text("linkedin_link"),
    coverPhoto: text("cover_photo"),
  },
  (profile) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(profile.userId),
    };
  }
);

export const profilesRelations = relations(profiles, ({ many }) => ({
  projects: many(projects),
}));

export const projects = pgTable(
  "projects",
  {
    id: text("id")
      .$defaultFn(() => createId())
      .primaryKey(),
    name: text("name").notNull(),
    image: text("image"),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    authorId: text("author_id"),
  },
  (projects) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(projects.name),
    };
  }
);

export const projectsRelations = relations(projects, ({ one }) => ({
  author: one(profiles, {
    fields: [projects.authorId],
    references: [profiles.id],
  }),
}));
