import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { name, email, password, role } = await request.json();

    // Create a Supabase client with the service role key
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    try {
        // Create the user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        });

        if (authError) throw authError;

        // If user creation was successful, add the user's role to the user_roles table
        if (authData.user) {
            // Map the role to the correct value
            const mappedRole = role.toLowerCase() === 'proposal coordinator' ? 'coordinator' : role.toLowerCase();

            const { error: roleError } = await supabase
                .from('user_roles')
                .insert({ user_id: authData.user.id, role: mappedRole });

            if (roleError) throw roleError;

            // Add user details to a custom users table if needed
            const { error: userError } = await supabase
                .from('users')
                .insert({ id: authData.user.id, name, email });

            if (userError) throw userError;
        }

        return NextResponse.json({
            id: authData.user.id,
            name,
            email,
            role
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}