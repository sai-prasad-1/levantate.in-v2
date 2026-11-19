CREATE TYPE "public"."contact_status" AS ENUM('new', 'in_progress', 'done');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('open', 'done');--> statement-breakpoint
CREATE TABLE "contact_replies" (
	"id" text PRIMARY KEY NOT NULL,
	"contact_message_id" text NOT NULL,
	"subject" text NOT NULL,
	"body" text NOT NULL,
	"template" text,
	"sent_by_email" text,
	"provider_message_id" text,
	"sent_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text DEFAULT '' NOT NULL,
	"label" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"body" text,
	"status" "task_status" DEFAULT 'open' NOT NULL,
	"due_at" timestamp,
	"contact_message_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contact_messages" ADD COLUMN "status" "contact_status" DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_messages" ADD COLUMN "admin_notes" text;--> statement-breakpoint
ALTER TABLE "contact_messages" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_replies" ADD CONSTRAINT "contact_replies_contact_message_id_contact_messages_id_fk" FOREIGN KEY ("contact_message_id") REFERENCES "public"."contact_messages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_contact_message_id_contact_messages_id_fk" FOREIGN KEY ("contact_message_id") REFERENCES "public"."contact_messages"("id") ON DELETE set null ON UPDATE no action;