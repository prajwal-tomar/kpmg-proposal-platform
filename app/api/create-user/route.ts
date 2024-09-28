import { NextResponse } from 'next/server';
import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const { name, email, role, password } = await request.json();

        // Validate input
        if (!name || !email || !role || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const client = await db.connect();

        // Check if user already exists
        const existingUser = await client.sql`
			SELECT * FROM users WHERE email = ${email}
		`;

        if (existingUser.rows.length > 0) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const result = await client.sql`
			INSERT INTO users (name, email, password)
			VALUES (${name}, ${email}, ${hashedPassword})
			RETURNING id, name, email
		`;

        const user = result.rows[0];

        // Insert user role
        await client.sql`
			INSERT INTO user_roles (user_id, role)
			VALUES (${user.id}, ${role})
		`;

        return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role } }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}