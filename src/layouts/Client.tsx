import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useLogin } from "@/service/LoginContext";
import Loader from "@/components/ui/loader";
import Footer from "@/components/Footer";

import { Link, Route, Routes, useLocation } from "react-router-dom";

import HomePage from "@/pages/client/Home";
import Contest from "@/pages/client/Contest";
import Message from "@/pages/client/Message";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Course from "@/pages/client/Course";


function ClientLayout() {

    const clientContentRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const location = useLocation();

    const loginContext = useLogin();

    useEffect(() => {
        if (clientContentRef.current) {
            clientContentRef.current.scrollTop = 0;
        }
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = clientContentRef.current?.scrollTop || 0;
            setShowScrollButton(scrollY > 250);
        };

        clientContentRef.current?.addEventListener('scroll', handleScroll);

        return () => {
            clientContentRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, [loginContext.loading]);

    const scrollToTop = () => {
        clientContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="ClientLayout flex flex-col h-[100vh]">
            {
                loginContext.loading ? <Loader /> :
                    loginContext.user ?
                        <>
                            <Header />
                            <div className="flex flex-1 overflow-hidden">
                                <Navbar/>
                                <div className="flex flex-col flex-1 bg-white dark:bg-zinc-950 h-full overflow-auto justify-between" ref={clientContentRef}>
                                    <div>
                                        <Routes>
                                            <Route path="" element={<HomePage />} />
                                            <Route path="message" element={<Message />} />
                                            <Route path="contest" element={<Contest />} />
                                            <Route path="course/:id" element={<Course />} />
                                        </Routes>
                                    </div>
                                    <Footer />
                                </div>
                            </div>
                            {
                                showScrollButton &&
                                <Button variant="secondary" className='scroll-to-top-button fixed bottom-8 right-10' onClick={scrollToTop} style={{ display: showScrollButton ? 'block' : 'none' }}>
                                    <i className='fa-solid fa-chevron-up'></i>
                                </Button>
                            }
                        </>
                        : ""
            }
        </div >
    );
};

export default ClientLayout;