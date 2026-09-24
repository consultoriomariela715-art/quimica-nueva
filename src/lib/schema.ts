import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  title: text("title").notNull(),
  level: text("level").notNull().default("Grado"),
  semester: text("semester").notNull().default(""),
  credits: integer("credits").notNull().default(0),
  room: text("room").notNull().default(""),
  schedule: text("schedule").notNull().default(""),
  description: text("description").notNull().default(""),
  formula: text("formula").notNull().default(""),
  accent: text("accent").notNull().default("cyan"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const materials = pgTable("materials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  courseCode: text("course_code").notNull(),
  category: text("category").notNull().default("Apuntes"),
  format: text("format").notNull().default("PDF"),
  size: text("size").notNull().default(""),
  downloads: integer("downloads").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notices = pgTable("notices", {
  id: serial("id").primaryKey(),
  type: text("type").notNull().default("general"),
  courseCode: text("course_code").notNull().default("General"),
  title: text("title").notNull(),
  body: text("body").notNull().default(""),
  dateLabel: text("date_label").notNull().default(""),
  pinned: boolean("pinned").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const agendaEvents = pgTable("agenda_events", {
  id: serial("id").primaryKey(),
  day: integer("day").notNull(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  type: text("type").notNull().default("general"),
  title: text("title").notNull(),
  courseCode: text("course_code").notNull().default(""),
  time: text("time"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const panelUsers = pgTable("panel_users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("editor"),
  createdAt: timestamp("created_at").defaultNow(),
});
