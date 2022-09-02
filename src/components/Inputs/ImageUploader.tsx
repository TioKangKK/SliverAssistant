import { FC } from 'react'
import { Uploader } from '@taroify/core'
import { chooseImage, showLoading, hideLoading } from '@tarojs/taro'
import { View } from '@tarojs/components'
import "@taroify/core/uploader/style"
import { uploadFile } from '@/service'

import './ImageUploader.less'

const UploadInner: FC = () => (
  <View className='uploader-inner'>
    <View className='uploader-inner-icon'>+</View>
    <View className='uploader-inner-main'>点击上传</View>
    <View className='uploader-inner-tip'>不超过九张</View>
  </View>
)

type Props = {
  files: string[];
  onChange: (files: string[]) => void;
}

const upload = async (paths: string[]) => {
  showLoading({ title: '图片上传中' });
  const urls: string[] = []
  for (const path of paths) {
    const res = await uploadFile({ type: 'image', path });
    urls.push(res.fileID)
  }
  hideLoading();
  return urls
}

const ImageUploader: FC<Props> = ({
  files = [],
  onChange = () => {}
}) => {
  // const [files, setFiles] = useState<Uploader.File[]>([])

  const onUpload = () => {
    chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera']
    }).then(async ({ tempFiles }) => {
      const newImages = await upload(tempFiles.map(item => item.path))
      onChange([
        ...files,
        ...newImages,
      ].slice(0, 9))
    })
  }

  return (
    <Uploader maxFiles={9} multiple onUpload={onUpload}>
      {files.map((image) => (
        <Uploader.Image
          key={image}
          url={image}
          onRemove={() => onChange(files.filter((item) => item !== image))}
        />
      ))}
      {files.length < 9 && <Uploader.Upload icon={<UploadInner />} />}
    </Uploader>
  )
}


export default ImageUploader