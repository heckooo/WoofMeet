import { Migration } from '@mikro-orm/migrations';

export class Migration20230527175855 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "accomodation" text not null, add column "address" text not null, add column "drop_off" timestamptz(0) null, add column "pick_up" timestamptz(0) null, add column "size" text not null;');
    this.addSql('alter table "post" rename column "title" to "pet";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" add column "title" text not null;');
    this.addSql('alter table "post" drop column "pet";');
    this.addSql('alter table "post" drop column "accomodation";');
    this.addSql('alter table "post" drop column "address";');
    this.addSql('alter table "post" drop column "drop_off";');
    this.addSql('alter table "post" drop column "pick_up";');
    this.addSql('alter table "post" drop column "size";');
  }

}
