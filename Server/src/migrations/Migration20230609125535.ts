import { Migration } from '@mikro-orm/migrations';

export class Migration20230609125535 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "like_status" boolean not null default false;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop column "like_status";');
  }

}
