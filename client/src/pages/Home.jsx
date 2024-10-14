import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DarkModeSwitcher from '../components/DarkModeSwitcher';
import { useNavigate } from 'react-router-dom';
import { Card, Dropdown } from 'flowbite-react';

const Home = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    const fetchdata = () => {
        const storedData = localStorage.getItem('user');
        if (storedData) {
            try {
                const data = JSON.parse(storedData);
                if (data) {
                    setUserData(data);
                }
            } catch (error) {
                console.error("Error parsing JSON from localStorage:", error);
            }
        }
    };

    const logout = () => {
        localStorage.setItem('user', "")
        window.location = '/'
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <Box component={'section'} className="w-full min-h-[100vh] py-[2rem] dark:bg-black dark:text-white flex gap-3 flex-col items-center justify-center">
            <div className="max-w-[50rem] flex items-center gap-5">
                <h1 className="heading-l flex gap-4 items-center">
                    User Details
                    <DarkModeSwitcher />
                </h1>
                <span
                    className="md:text-[2rem] hover:text-blue-800 font-semibold underline cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    Back
                </span>
            </div>
            <Card className="max-w-sm">
                <div className="flex flex-col items-center px-[2rem] gap-4 pb-10">
                    <div className='w-full flex justify-end'>
                        <span className='text-red-500 cursor-pointer hover:underline' onClick={logout}>logout</span>
                    </div>
                    {/* Dynamically set the background image with inline styles */}
                    <div
                        className="w-[10rem] h-[10rem] rounded-full bg-cover bg-center border-solid border-4 border-black dark:border-white"
                        style={{ backgroundImage: `url(${userData?.image})` }}
                    ></div>
                    <div className='text-center flex flex-col gap-1'>
                        <h5 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                            {userData?.fname || 'username'}
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {userData?.email || 'country'}
                        </span>
                        <span>{userData?.date || 'dob'} || {userData?.gender || 'gender'}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {userData?.phoneNo || 'phone no'}
                        </span>
                    </div>

                </div>
            </Card>
        </Box>
    );
};

export default Home;
