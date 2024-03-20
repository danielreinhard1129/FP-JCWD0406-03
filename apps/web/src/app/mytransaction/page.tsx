'use client';
import { baseUrl } from '@/utils/config';
import MainTransaction from './components/MainTransaction';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ITransaction } from '../../../types/types';
import { useAppSelector } from '@/lib/hooks';

const Transactions = () => {
  const user = useAppSelector((state) => state.user);
  const [dataApi, setDataApi] = useState<ITransaction[]>([]);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const { data } = await axios.get(
          baseUrl + `/transaction/order-list/${user.id}`,
        );
        setDataApi(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getTransaction();
  }, [user.id]);

  return (
    <div className="flex w-full">
      <MainTransaction data={dataApi} />
    </div>
  );
};

export default Transactions;
