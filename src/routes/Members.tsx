import { Divider, Typography } from 'antd';

const { Title } = Typography;

export const Members = () => {

    return (
        <>
            {/* <Flex gap="middle" wrap="wrap"> */}
            <Typography style={{ padding: 100 }}>
                <Title>Sebastian Dario Giraldo Rodas - 202259391</Title>

                <Divider />

                <Title>John Breydi Pasichana Muñoz - 201941012</Title>
            </Typography>
            {/* </Flex> */}
        </>
    );
};