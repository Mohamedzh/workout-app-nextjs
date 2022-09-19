import { useUser } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import { loginUser } from "../lib/functions";


// Create a single supabase client for interacting with your database
const supabase = createClient(
    'https://mqxekapplpiloyxzfisd.supabase.co/',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xeGVrYXBwbHBpbG95eHpmaXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMxNTY0NDQsImV4cCI6MTk3ODczMjQ0NH0.1lHgTQgH9B0jVngPJ3R1ZKzrPNoP_hKWig3uHZJ4k2Q'
);

const Container = (props: any) => {
    const { user } = useUser();
    if (user)
        return (
            <>
                <p>Signed in: {user.email}</p>
                <button onClick={() => props.supabaseClient.auth.signOut()}>
                    Sign out
                </button>
            </>
        );
    return props.children;
};

export default function Home() {
    return (

        // <Auth.UserContextProvider supabaseClient={supabase}>
        <Container supabaseClient={supabase}>
            <h1>LoggedOut</h1>
            {/* <button onClick={()=>loginUser()}>SignIn</button> */}
            {/* <Auth providers={['facebook', 'github']} supabaseClient={supabase} /> */}
        </Container>
        // </Auth.UserContextProvider>
    );
};