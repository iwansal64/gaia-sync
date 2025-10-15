-- CreateTable
CREATE TABLE "public"."connections" (
    "user_id" VARCHAR(5) NOT NULL,
    "device_id" VARCHAR(5) NOT NULL,
    "id" VARCHAR(5) NOT NULL,
    "user_accepted" BOOLEAN NOT NULL DEFAULT false,
    "device_accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."devices" (
    "id" VARCHAR(24) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_token" VARCHAR(20),
    "device_name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(80),
    "status" BOOLEAN NOT NULL DEFAULT false,
    "num_sensors" INTEGER NOT NULL DEFAULT 0,
    "last_online" TIMESTAMP(3),

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" VARCHAR(5) NOT NULL,
    "username" VARCHAR(35),
    "password" VARCHAR(70),
    "email" VARCHAR(50) NOT NULL,
    "verification_token" VARCHAR(5),
    "access_token" VARCHAR(20),
    "access_token_expire" TIMESTAMP(6)
);

-- CreateIndex
CREATE UNIQUE INDEX "connections_user_id_device_id_key" ON "public"."connections"("user_id", "device_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "public"."users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_access_token_key" ON "public"."users"("access_token");

-- AddForeignKey
ALTER TABLE "public"."connections" ADD CONSTRAINT "fk_device" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."connections" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
