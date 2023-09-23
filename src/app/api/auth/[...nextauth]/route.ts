import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
      providers: [
        CredentialsProvider({
          
          name: "Credentials",
          credentials: {
            email: { label: "email", type: "email", placeholder: "test@test.com" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
              {
                method: "POST",
                body: JSON.stringify({
                  email: credentials?.email,
                  password: credentials?.password,
                }),
                headers: { "Content-Type": "application/json" },
              }
            );
            const user = await res.json();
            console.log(user);
            
    
            if (user.error) throw user;
    
            return user; // Any object returned will be saved in `user` property of the JWT
      
            
              // If you return null then an error will be displayed advising the user to check their details.
              
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            
          }


        })
      ],
      callbacks: {
        async jwt({ token, user }) {
          return { ...token, ...user };
        },
        async session({ session, token }) {
          session.user = token as any;
          return session;
        },
      },
      pages: {
        signIn: "/login",
      }
})

export { handler as GET, handler as POST }