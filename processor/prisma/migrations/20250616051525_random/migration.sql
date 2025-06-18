-- AlterTable
CREATE SEQUENCE actions_sortingorder_seq;
ALTER TABLE "Actions" ALTER COLUMN "sortingOrder" SET DEFAULT nextval('actions_sortingorder_seq');
ALTER SEQUENCE actions_sortingorder_seq OWNED BY "Actions"."sortingOrder";
