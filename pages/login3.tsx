import { Auth, Typography, Button } from "@supabase/ui";
import { createClient } from "@supabase/supabase-js";

const { Text } = Typography

// Create a single supabase client for interacting with your database
const supabase = createClient(
    'https://mqxekapplpiloyxzfisd.supabase.co/',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeGVrYXBwbHBpbG95eHpmaXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMxNTY0NDQsImV4cCI6MTk3ODczMjQ0NH0.1lHgTQgH9B0jVngPJ3R1ZKzrPNoP_hKWig3uHZJ4k2Q'
);

const Container = (props: any) => {
    const { user } = Auth.useUser();
    if (user)
        return (
            <>
                <Text>Signed in: {user.email}</Text>
                <Button block onClick={() => props.supabaseClient.auth.signOut()}>
                    Sign out
                </Button>
            </>
        );
    return props.children;
};

export default function Home() {
    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
            <Container supabaseClient={supabase}>
                <Auth providers={['facebook', 'github']} supabaseClient={supabase} />
            </Container>
        </Auth.UserContextProvider>
    );
};