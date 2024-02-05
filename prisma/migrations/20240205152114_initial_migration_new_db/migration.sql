-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SALTIE', 'CLIENT', 'ADMIN');

-- CreateTable
CREATE TABLE "public.account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "public.account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public.session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "public.session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public.user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "developerId" TEXT,

    CONSTRAINT "public.user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public.verificationtoken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public.project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "githubLink" TEXT NOT NULL,

    CONSTRAINT "public.project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public.project_developer" (
    "id" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "public.project_developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public.developer" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gitHubUrl" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skills" TEXT[],
    "title" TEXT NOT NULL,
    "lastModified" TIMESTAMP(3) NOT NULL,
    "locationPref" TEXT[],

    CONSTRAINT "public.developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public.mob_developer" (
    "id" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "public.mob_developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public.mob" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "public.mob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public.cartItem" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "developerId" TEXT NOT NULL,
    "comment" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "public.cartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogClickDev" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogClickDev_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogSearch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "search" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogSearch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "public.account_provider_providerAccountId_key" ON "public.account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "public.session_sessionToken_key" ON "public.session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "public.user_email_key" ON "public.user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "public.verificationtoken_token_key" ON "public.verificationtoken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "public.verificationtoken_identifier_token_key" ON "public.verificationtoken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "public.developer_slug_key" ON "public.developer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "public.cartItem_developerId_userId_key" ON "public.cartItem"("developerId", "userId");

-- AddForeignKey
ALTER TABLE "public.account" ADD CONSTRAINT "public.account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public.user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public.session" ADD CONSTRAINT "public.session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public.user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public.user" ADD CONSTRAINT "public.user_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "public.developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public.project_developer" ADD CONSTRAINT "public.project_developer_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "public.developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public.project_developer" ADD CONSTRAINT "public.project_developer_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public.project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public.mob_developer" ADD CONSTRAINT "public.mob_developer_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "public.developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public.mob_developer" ADD CONSTRAINT "public.mob_developer_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public.mob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public.cartItem" ADD CONSTRAINT "public.cartItem_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "public.developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public.cartItem" ADD CONSTRAINT "public.cartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public.user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogClickDev" ADD CONSTRAINT "LogClickDev_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public.user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogClickDev" ADD CONSTRAINT "LogClickDev_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "public.developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogSearch" ADD CONSTRAINT "LogSearch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public.user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
