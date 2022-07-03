import { FC } from 'react'
import { Image } from '@tarojs/components';

import { Flex } from '@taroify/core'
import "@taroify/core/flex/style"

import './ImageList.less';

type Props = {
  urls: string[];
}

const ImageList: FC<Props> = ({ urls }) => {
  return (
    <Flex gutter={8} className='image-list' wrap='wrap'>
      {urls.map((url, index) => (
        <Flex.Item key={url + index} span={8}>
          <Image className='image-list-item' src={url} />
        </Flex.Item>
      ))}
    </Flex>
  )
}

export default ImageList