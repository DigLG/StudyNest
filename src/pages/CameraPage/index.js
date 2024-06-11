import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'



export default function CameraPage() {
    const device = useCameraDevice('back')
    const { hasPermission , requestPermission } = useCameraPermission()
  
    if (!hasPermission) requestPermission()
    if (device == null) return "Deu ruim"
    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    )
  }