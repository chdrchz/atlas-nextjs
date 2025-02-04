import bcrypt from "bcryptjs";
import { neon } from '@neondatabase/serverless';
import { users, topics, questions } from "../../lib/placeholder-data";

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not defined');
}

const sql = neon(process.env.POSTGRES_URL);

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedTopics() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS topics (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    );
  `;

  const insertedTopics = await Promise.all(
    topics.map(
      (topic) => sql`
        INSERT INTO topics (id, title)
        VALUES (${topic.id}, ${topic.title})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedTopics;
}

async function seedQuestions() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS questions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      topic_id UUID NOT NULL,
      votes INT NOT NULL,
      FOREIGN KEY (topic_id) REFERENCES topics(id)
    );
  `;

  const insertedQuestions = await Promise.all(
    questions.map(
      (question) => sql`
        INSERT INTO questions (id, title, topic_id, votes)
        VALUES (${question.id}, ${question.title}, ${question.topic}, ${question.votes})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedQuestions;
}

export async function GET() {
  try {
    await sql`BEGIN`;
    await seedUsers();
    await seedTopics();
    await seedQuestions();
    await sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
