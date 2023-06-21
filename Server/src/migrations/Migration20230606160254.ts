import { Migration } from '@mikro-orm/migrations';

export class Migration20230606160254 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "creator_id" int not null;');
    this.addSql('alter table "post" add constraint "post_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop constraint "post_creator_id_foreign";');

    this.addSql('alter table "post" drop column "creator_id";');
  }

}
