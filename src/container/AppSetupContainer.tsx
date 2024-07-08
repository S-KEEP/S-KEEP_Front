import React, {ReactNode} from 'react';
import ReactQuerySetting from '@libs/react-query';

type AppSetupWrapperProps = {children: ReactNode};

export default function AppSetupWrapper({children}: AppSetupWrapperProps) {
  return (
      <ReactQuerySetting>{children}</ReactQuerySetting>

  );
}
