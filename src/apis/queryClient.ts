import {MutationCache, QueryCache, QueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {BaseResponse, GET} from './client';

// [TODO] 체크 필요
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onSuccess(data, query) {},
    onError: (error, query) => {
      console.log('🔯 Query onError');
      console.log(error, query.meta);

      handleAxiosError(error);
    },
  }),
  mutationCache: new MutationCache({
    async onSuccess(data, variables, context, mutation) {
      console.log('🔯 Mutation onSuccess');
      console.log(data);

      await handleOnSuccess(mutation?.meta?.response);
    },
    onError: (error, _variables, _context, mutation) => {
      console.log('🔯 Mutation onError');
      console.log(error);

      handleAxiosError(error);
    },
  }),
});

function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

async function handleOnSuccess(response: any) {
  if (response && response.status === 201) {
    const locationUrl = response.headers['location'];

    if (locationUrl) {
      try {
        const createdObjectData = await GET(locationUrl);
        console.log('>> Created object data:', createdObjectData.data);
        // 필요에 따라 createdObjectData를 다른 곳으로 전달하거나 추가 처리
      } catch (err) {
        console.error('Error fetching created object data:', err);
      }
    } else {
      console.warn('201 Created response missing Location header');
    }
  }
}

function handleAxiosError(error: any) {
  if (isAxiosError(error) && error.response) {
    const errorCode = (error.response.data as BaseResponse<string>).errorCode;
    const errorMessage = (error.response.data as BaseResponse<string>).message;

    if (errorCode) {
      error.message = `[${errorCode}] ${errorMessage}`;
    }
  }
}

export default queryClient;
