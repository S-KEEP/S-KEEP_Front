import React, {ReactNode} from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '../../apis/queryClient';

type ReactQuerySettingProps = {children: ReactNode};

export default function ReactQuerySetting({children}: ReactQuerySettingProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
