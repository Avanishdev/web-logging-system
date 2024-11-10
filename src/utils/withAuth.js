import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth(Component) {
    return function ProtectedComponent(props) {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.replace('/login');
            }
        }, [router]);

        const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
        if (!token) return null;

        return <Component {...props} />;
    };
}
