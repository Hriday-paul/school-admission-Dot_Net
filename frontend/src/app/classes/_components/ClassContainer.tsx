"use client"
import { useGetClassesQuery } from '@/redux/api/baseApi';
import { Empty, Spin } from 'antd';
import React from 'react'
import Classcard from './Classcard';

function ClassContainer() {

    const { data: classes = [], isLoading, isFetching, refetch } = useGetClassesQuery(
        undefined,
        { pollingInterval: 10000 }
    );

    return (
        <div>

            {isLoading ? (
                <div className="py-24 flex flex-col items-center justify-center gap-3">
                    <Spin size="large" />
                    <p className="text-sm text-gray-400 font-medium">
                        Checking seat availability in real time...
                    </p>
                </div>
            ) : classes.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
                    <Empty
                        description={"No classes available at this time."}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((item) => {
                        return (
                            <Classcard key={item.id} item={item} />
                        );
                    })}
                </div>
            )}

        </div>
    )
}

export default ClassContainer
