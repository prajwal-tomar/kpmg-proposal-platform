import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User, Session } from '@supabase/supabase-js';

type UserRole = 'coordinator' | 'contributor' | 'admin' | null;

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [role, setRole] = useState<UserRole>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function getActiveSession() {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                const { data, error } = await supabase
                    .from('user_roles')
                    .select('role')
                    .eq('user_id', session.user.id)
                    .single();

                if (error) {
                    console.error('Error fetching user role:', error);
                } else {
                    setRole(data.role as UserRole);
                }
            }
            setLoading(false);
        }

        getActiveSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                supabase
                    .from('user_roles')
                    .select('role')
                    .eq('user_id', session.user.id)
                    .single()
                    .then(({ data, error }) => {
                        if (error) {
                            console.error('Error fetching user role:', error);
                        } else {
                            setRole(data.role as UserRole);
                        }
                    });
            } else {
                setRole(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase]);

    return { user, session, role, loading };
}