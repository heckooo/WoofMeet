import { Migration } from '@mikro-orm/migrations';

export class Migration20230603002449 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" drop column "drop_off";');
    this.addSql('alter table "post" drop column "pick_up";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" add column "drop_off" timestamptz(0) null, add column "pick_up" timestamptz(0) null;');
  }

}
