import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { Octokit } from 'octokit';
import CryptoJS from 'crypto-js';

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
                    const token = decryptToken(encryptedToken ?? "", user.uid);

                    const octokit = new Octokit({ auth: token });
                    const userData = await getGithubProfile(octokit);

                    console.log({ ...userData, email: user.email });

                    setUser({ ...userData, email: user.email } as any);

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

    const decryptToken = (encryptedToken: string, key: string) => {
        // Sử dụng AES để giải mã token với key chỉ định
        const bytes = CryptoJS.AES.decrypt(encryptedToken, key);
        const originalToken = bytes.toString(CryptoJS.enc.Utf8);
        return originalToken;
    }

    const getGithubProfile = async (octokit: Octokit) => {
        const { data } = await octokit.request("GET /user");
        return data;
    }

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