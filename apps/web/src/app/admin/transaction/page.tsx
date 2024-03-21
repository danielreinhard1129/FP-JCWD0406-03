'use client';

import withAuthRedirect from '@/utils/HOC/AdminGuard';
import React, { useEffect, useState } from 'react';
import TableTransaction from './components/TableTransaction';
import axios from 'axios';
import { baseUrl } from '@/utils/config';
import { useAppSelector } from '@/lib/hooks';
import { IProperty } from '../../../../types/types';

const TransactionPage = () => {
  const user = useAppSelector((state) => state.user);
  const [getData, setGetData] = useState<IProperty[]>([]);

  useEffect(() => {
    const handleGetData = async () => {
      const { data } = await axios.get(
        baseUrl + `/management/property/${user.id}`,
      );
      setGetData(data.data);
    };
    handleGetData();
  }, []);
  console.log('bercinta dengan putri', getData, user.id);
  return (
    <div>
      <TableTransaction data={getData} />
    </div>
  );
};

export default TransactionPage;
