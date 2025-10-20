/*
  Warnings:

  - The primary key for the `devices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `num_sensors` on the `devices` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `devices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(24)` to `VarChar(5)`.
  - A unique constraint covering the columns `[access_token]` on the table `devices` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."devices" DROP CONSTRAINT "devices_pkey",
DROP COLUMN "num_sensors",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(5),
ADD CONSTRAINT "devices_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "public"."ai_reports" (
    "id" VARCHAR(5) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(50) NOT NULL,
    "suggesstions" VARCHAR(200) NOT NULL,
    "fact" VARCHAR(200) NOT NULL,
    "device_id" VARCHAR(5) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_reports_id_key" ON "public"."ai_reports"("id");

-- CreateIndex
CREATE UNIQUE INDEX "devices_access_token_key" ON "public"."devices"("access_token");

-- AddForeignKey
ALTER TABLE "public"."ai_reports" ADD CONSTRAINT "fk_device" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
