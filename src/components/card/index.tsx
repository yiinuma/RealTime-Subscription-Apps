import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Grid } from '@mantine/core'

const CardItem = () => {
  const theme = useMantineTheme()

  const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  return (
    <Grid.Col span={4}>
      <Card className='min-h-[320px]' shadow='sm' p='lg'>
        <Card.Section>
          <Image src='/vercel.svg' height={180} fit='contain' alt='Norway' />
        </Card.Section>

        <Group position='apart' style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>Norway Fjord Adventures</Text>
          <Badge color='pink' variant='light'>
            On Sale
          </Badge>
        </Group>

        <Text size='sm' style={{ color: secondaryColor, lineHeight: 1.5 }}>
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway
        </Text>

        <Button variant='light' color='blue' fullWidth style={{ marginTop: 14 }}>
          Book classic tour now
        </Button>
      </Card>
    </Grid.Col>
  )
}

export default CardItem
