import { useState, useCallback, useEffect } from 'react';
import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export function useCamera() {
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      if (cameraPermission?.status === 'granted') {
        const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
        setHasPermission(mediaStatus === 'granted');
      } else {
        const permission = await requestPermission();
        if (permission.granted) {
          const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
          setHasPermission(mediaStatus === 'granted');
        } else {
          setHasPermission(false);
        }
      }
    })();
  }, [cameraPermission, requestPermission]);

  const toggleCameraType = useCallback(() => {
    setCameraType(current => 
      current === 'back' ? 'front' : 'back'
    );
  }, []);

  const toggleFlash = useCallback(() => {
    setFlashMode(current => 
      current === 'off' ? 'on' : 'off'
    );
  }, []);

  const onCameraReady = useCallback(() => {
    console.log('Camera is ready');
    setIsCameraReady(true);
  }, []);

  return {
    hasPermission,
    cameraType,
    flashMode,
    isCameraReady,
    toggleCameraType,
    toggleFlash,
    onCameraReady,
  };
}
