import { Migration } from '@mikro-orm/migrations';

export class Migration20230606160520 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" drop constraint "post_creator_id_foreign";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" add constraint "post_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');
  }

}
