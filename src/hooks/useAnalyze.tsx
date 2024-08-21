import {launchImageLibrary} from 'react-native-image-picker';
import useNavigator from '../navigators/hooks/useNavigator';
import {ShareData} from 'react-native-share-menu';

export default function useAnalyze() {
  const {stackNavigation} = useNavigator();

  const handleGoToGallery = async () => {
    const {didCancel, errorCode, errorMessage, assets} =
      await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 10,
      });

    if (didCancel || errorCode) {
      console.log(
        `didCancel: ${didCancel} errorCode: ${errorCode} errorMessage: ${errorMessage}`,
      );
    }

    const formData = new FormData();
    if (assets) {
      for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];

        const photo = {
          uri: asset.uri,
          type: 'multipart/form-data',
          name: `${asset.fileName}`,
        };

        formData.append(`file`, photo);
      }

      console.log('[handleGoToGallery] FormData ', formData);
      stackNavigation.navigate('Analyze', {formData});
    }
  };

  const handleShareExtension = (item: ShareData) => {
    const formData = new FormData();
    if (item?.data?.length === 1) {
      const imagePath = item.data[0].data;
      const fileName = imagePath.split('/').pop();

      const photo = {
        uri: imagePath,
        type: 'multipart/form-data',
        name: `${fileName}`,
      };

      formData.append(`file`, photo);

      console.log('[handleShareExtension] FormData ', formData);
      stackNavigation.navigate('Analyze', {formData});
    }
  };

  return {handleGoToGallery, handleShareExtension};
}
