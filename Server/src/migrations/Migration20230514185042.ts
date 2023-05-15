import { Migration } from '@mikro-orm/migrations';

export class Migration20230514185042 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "migrations" cascade;');

    this.addSql('alter table "post" add column "created_at" date null default \'NOW()\', add column "updated_at" date null;');
    this.addSql('alter table "post" alter column "title" type text using ("title"::text);');
    this.addSql('alter table "post" drop column "CreatedAt";');
    this.addSql('alter table "post" drop column "UpdatedAt";');
  }

  async down(): Promise<void> {
    this.addSql('create table "migrations" ("id" serial, "timestamp" int8 not null default null, "name" varchar not null default null, constraint "PK_8c82d7f526340ab734260ea46be" primary key ("id"));');

    this.addSql('alter table "post" add column "CreatedAt" timestamp not null default now(), add column "UpdatedAt" timestamp not null default now();');
    this.addSql('alter table "post" alter column "title" type varchar using ("title"::varchar);');
    this.addSql('alter table "post" drop column "created_at";');
    this.addSql('alter table "post" drop column "updated_at";');
  }

}
