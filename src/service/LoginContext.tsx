import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { login } from './API/Auth';

interface LoginContextProps {
    loading: boolean;
    user: any;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const encryptedToken = localStorage.getItem('encryptedGithubAccessToken');

                    const myProfileData = await login(encryptedToken as string, user.email as string, user.uid as string);

                    console.log(myProfileData);

                    setUser(myProfileData as any);

                    setLoading(false);

                } catch (error) {
                    console.error('Error fetching repositories:', error);
                    setLoading(false);
                }
            } else {
                console.log("User is logged out");
                setLoading(false);
            }
        });
    }, []);

    return (
        <LoginContext.Provider value={{ loading, setLoading, user, setUser }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (context === undefined) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
};