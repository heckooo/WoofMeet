import { Migration } from '@mikro-orm/migrations';

export class Migration20230603002127 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" alter column "drop_off" type timestamptz(0) using ("drop_off"::timestamptz(0));');
    this.addSql('alter table "post" alter column "pick_up" type timestamptz(0) using ("pick_up"::timestamptz(0));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" alter column "drop_off" type date using ("drop_off"::date);');
    this.addSql('alter table "post" alter column "pick_up" type date using ("pick_up"::date);');
  }

}
