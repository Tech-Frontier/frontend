import { Tag } from '@tech-frontier/shared-tag';
import { Text } from '@tech-frontier/shared-text';

export default function Test() {
  return (
    <>
      <Text typography='Large'>하이</Text>
      <Text typography='T1'>하이</Text>
      <Text typography='T2'>하이</Text>
      <Text typography='T3'>하이</Text>
      <Text typography='Normal'>하이</Text>
      <Text typography='Small'>하이</Text>
      <br />
      <Tag size="large">Tag</Tag>
      <br />
      <br />
      <Tag size="medium">Tag</Tag>
      <br />
      <br />
      <Tag size="small">Tag</Tag>
      <br />
      <br />
      <Tag size="large" variant='border' bgColor="transparent">Tag</Tag>
      <br />
      <br />
      <Tag size="medium" variant='border' bgColor="transparent">Tag</Tag>
      <br />
      <br />
      <Tag size="small" variant='border' bgColor="transparent">Tag</Tag>
    </>
  );
}
