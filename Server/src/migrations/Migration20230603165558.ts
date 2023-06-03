import { Migration } from '@mikro-orm/migrations';

export class Migration20230603165558 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "drop_off" varchar(255) null, add column "pick_up" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop column "drop_off";');
    this.addSql('alter table "post" drop column "pick_up";');
  }

}
