
const MytestPage = () => {

    return (
        <div>
            <div className="relative w-full rounded-xl bg-gray-400 px-8 py-8 shadow-lg">
                <div className="flex flex-col gap-10">
                    <div className="mb-5 flex flex-row">
                        <h1 className="text-balck absolute left-36 right-36 top-0 mr-4 mt-4 text-center text-4xl font-extrabold">NavRas</h1>
                        <div className="absolute right-5 top-5 mr-4 mt-4">
                            <button className="border-black-900 rounded-full border-black bg-blue-200 px-4 py-1 text-sm font-semibold text-blue-800 outline-black hover:border-transparent hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">Follow</button>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-row place-content-evenly items-center">
                            <div className="h-60 w-60 outline-none outline-black">
                                <img className="h-26 mx-auto block rounded-full sm:mx-0 sm:shrink-0" src="/img/erin-lindford.jpg" alt="Woman's Face" />
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="relative flex flex-col items-center gap-6">
                                    <div className="flex items-center">
                                        <svg className="me-1 h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="me-1 h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="me-1 h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="me-1 h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="me-1 h-4 w-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">Reveiws</p>
                                    </div>

                                    <div className="relativew-30 max-w-md rounded-lg bg-slate-300 p-4 shadow sm:p-8 dark:bg-gray-800">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-row gap-10">
                                                <span className="text-left font-medium text-gray-900 dark:text-white">Website</span>
                                                <span className="text-left font-semibold text-gray-600 dark:text-white">www.navras.com</span>
                                            </div>
                                            <div className="flex flex-row gap-10">
                                                <span className="text-left font-medium text-gray-900 dark:text-white">Website</span>
                                                <span className="text-left font-semibold text-gray-600 dark:text-white">www.navras.com</span>
                                            </div>
                                            <div className="flex flex-row gap-10">
                                                <span className="text-left font-medium text-gray-900 dark:text-white">Website</span>
                                                <span className="text-left font-semibold text-gray-600 dark:text-white">www.navras.com</span>
                                            </div>
                                            <div className="flex flex-row gap-10">
                                                <span className="text-left font-medium text-gray-900 dark:text-white">Website</span>
                                                <span className="text-left font-semibold text-gray-600 dark:text-white">www.navras.com</span>
                                            </div>
                                            <div className="flex flex-row gap-10">
                                                <span className="text-left font-medium text-gray-900 dark:text-white">Website</span>
                                                <span className="text-left font-semibold text-gray-600 dark:text-white">www.navras.com</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 text-center">
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MytestPage;