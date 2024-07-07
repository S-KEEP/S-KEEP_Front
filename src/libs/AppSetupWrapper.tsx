import React, {ReactNode} from 'react';
import ReactQuerySetting from './react-query';

type AppSetupWrapperProps = {children: ReactNode};

export default function AppSetupWrapper({children}: AppSetupWrapperProps) {
  return (
      <ReactQuerySetting>{children}</ReactQuerySetting>

  );
}
