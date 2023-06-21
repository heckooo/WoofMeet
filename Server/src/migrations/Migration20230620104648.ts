import { Migration } from '@mikro-orm/migrations';

export class Migration20230620104648 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" drop column "like_status";');

    this.addSql('alter table "like" drop column "count";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" add column "like_status" boolean not null default false;');

    this.addSql('alter table "like" add column "count" int not null;');
  }

}
