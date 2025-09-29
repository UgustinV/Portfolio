-- CreateTable
CREATE TABLE "public"."Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectUrl" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "public"."Project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "public"."Project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Project_description_key" ON "public"."Project"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectUrl_key" ON "public"."Project"("projectUrl");
