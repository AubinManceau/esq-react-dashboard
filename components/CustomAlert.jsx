"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomAlert({ type = "default", title, description, duration = 5000, onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-4 md:bottom-4 md:top-auto right-4 w-[90%] max-w-md sm:w-96 z-50"
                >
                    <Alert variant={type}>
                        <AlertTitle>{title}</AlertTitle>
                        {description && <AlertDescription>{description}</AlertDescription>}
                    </Alert>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
