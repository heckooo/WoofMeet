import { Migration } from '@mikro-orm/migrations';

export class Migration20230607222015 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "like" ("user_id" int not null, "post_id" int not null, "count" int not null, constraint "like_pkey" primary key ("user_id", "post_id"));');

    this.addSql('alter table "like" add constraint "like_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "like" add constraint "like_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "post" add column "points" int not null default 0;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "like" cascade;');

    this.addSql('alter table "post" drop column "points";');
  }

}
