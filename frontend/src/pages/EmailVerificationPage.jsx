import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EmailVerificationPage = () => {
    const [message, setMessage] = useState('Verifying your email...');
    const { token } = useParams();

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setMessage('Verification token not found.');
                return;
            }
            try {
                const response = await api.get(`http://localhost:3002/api/auth/verify-email/${token}`);
                setMessage(response.data.message);
            } catch (error) {
                const errorMsg = error.response?.data?.message || 'Email verification failed. The link may have expired.';
                setMessage(errorMsg);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
                <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
                <p>{message}</p>
                <Link to="/login" className="mt-4 inline-block bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    Proceed to Login
                </Link>
            </div>
        </div>
    );
};

export default EmailVerificationPage;