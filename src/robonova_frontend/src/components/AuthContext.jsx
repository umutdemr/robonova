import React, { createContext, useState, useContext, useEffect } from "react";
import { robonova_backend } from "declarations/ robonova_backend";
import { Principal } from "@dfinity/principal";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isUser, setIsUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [principalId, setPrincipalId] = useState(null);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                const identity = await window.ic.agent.getPrincipal();
                setPrincipalId(identity.toText());
                checkUser(identity);
            } catch (error) {
                console.error("Error getting principal:", error);
            } finally {
                setLoading(false);
            }
        };
        authenticateUser();
    }, [isUser]);

    const checkUser = async (principalId) => {
        try {
            const result = await robonova_backend.checkUser(Principal.fromText(principalId));
            setIsUser(result);
        } catch (error) {
            console.error("Error checking user:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ isUser, loading, principalId, userName, setIsUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
