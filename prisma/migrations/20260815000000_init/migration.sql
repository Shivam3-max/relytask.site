-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "message" TEXT,
    "source" TEXT NOT NULL,
    "service" TEXT,
    "budget" TEXT,
    "timeline" TEXT,
    "payload" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "score" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "liveUrl" TEXT,
    "summary" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "services" TEXT NOT NULL,
    "stack" TEXT,
    "approach" TEXT NOT NULL,
    "metrics" TEXT NOT NULL,
    "quoteText" TEXT,
    "quoteName" TEXT,
    "quoteRole" TEXT,
    "seed" INTEGER NOT NULL DEFAULT 1,
    "confidential" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT,
    "mediaUrl" TEXT,
    "mediaType" TEXT,
    "posterUrl" TEXT,
    "aspect" TEXT NOT NULL DEFAULT '16/9',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_source_idx" ON "Lead"("source");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_slug_key" ON "CaseStudy"("slug");

