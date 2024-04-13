import React from 'react'

const CompanySList = (props) => {
    const { company } = props;
    return (
        <div>
            <div className="ml-12 w-80 border-2 border-black bg-white rounded-lg p-6">
            <div className=" flex flex-row">
 <br/>
        <img
            class="mr-2 mb-8 h-14 w-14 rounded-full object-cover shadow"
            src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="avatar"
        />
 
    <div className="display: inline-block ml-2 mt-2">
        <h1 className="text-black text-2xl font-semibold">Raini Perera</h1>
        <div className="text-gray-500 text-xs">Rank 1/86 &nbsp;&nbsp;&nbsp; Score 98%</div>
    </div>
</div>




                <div className="sm:grid sm:grid-cols-1">
                    <div>
                        <dl>
                            <dt className="text-sm text-blue-800 font-semibold dark:text-gray-400">Visual Communication</dt>
                            <dd className="flex items-center mb-3">
                                <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                                    <div className="bg-yellow-500 h-2.5 rounded dark:bg-blue-500" style={{ width: '85%' }}></div>
                                </div>
                                <span className="text-sm  text-black font-semibold dark:text-gray-400">85%</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt className="text-sm text-blue-800 font-semibold dark:text-gray-400">SEO Skills</dt>
                            <dd className="flex items-center mb-3">
                                <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                                    <div className="bg-blue-600 h-2.5 rounded dark:bg-blue-500" style={{ width: '80%' }}></div>
                                </div>
                                <span className="text-sm  text-black font-semibold dark:text-gray-400">80%</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt className="text-sm text-blue-800 font-semibold dark:text-gray-400">Product Marketing</dt>
                            <dd className="flex items-center mb-3">
                                <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                                    <div className="bg-green-500 h-2.5 rounded dark:bg-blue-500" style={{ width: '90%' }}></div>
                                </div>
                                <span className="text-sm  text-black font-semibold dark:text-gray-400">90%</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt className="text-sm text-blue-800 font-semibold dark:text-gray-400">Digital Designing</dt>
                            <dd className="flex items-center">
                                <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                                    <div className="bg-red-500 h-2.5 rounded dark:bg-blue-500" style={{ width: '96%' }}></div>
                                </div>
                                <span className="text-sm  text-black font-semibold dark:text-gray-400">96%</span>
                            </dd>
                        </dl>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CompanySList;