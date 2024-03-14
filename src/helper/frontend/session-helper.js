export const hasSession = (session) => {
    return session && session.status === 'authenticated';
}