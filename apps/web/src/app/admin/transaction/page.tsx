'use client';

import withAuthRedirect from '@/utils/HOC/AdminGuard';
import React, { useEffect, useState } from 'react';
import TableTransaction from './components/TableTransaction';
import axios from 'axios';
import { baseUrl } from '@/utils/config';
import { useAppSelector } from '@/lib/hooks';
import { IProperty, ITransaction } from '../../../../types/types';

const TransactionPage = () => {
  return (
    <div>
      <TableTransaction />
    </div>
  );
};

export default TransactionPage;
