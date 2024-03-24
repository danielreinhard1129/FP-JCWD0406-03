/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import MainTransaction from './components/MainTrasaction';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { baseUrl } from '@/utils/config';
import { ITransaction } from '../../../../types/types';
export interface DataTransaction {
  data: ITransaction[];
}
const Transaction = () => {
  const params = useParams();
  const [getData, setGetData] = useState<DataTransaction | null>(null);

  const handleGetTransaction = async () => {
    const { data } = await axios.get(baseUrl + `/transaction/${params.uuid}`);
    setGetData(data.data);
  };
  useEffect(() => {
    handleGetTransaction();
  }, []);
  return (
    <div className=" pt-[5rem]">
      <MainTransaction data={getData} />
    </div>
  );
};

export default Transaction;
