import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Start = () => {

    return (
        <>
            {/* <Flex gap="middle" wrap="wrap"> */}
            <Typography style={{padding: 100}}>
                <Title style={{color: 'white'}}>Welcome!</Title>

                <Paragraph style={{color: 'white'}}>
                    Comenzar la videoconferencia. 
                </Paragraph>

            </Typography>
            {/* </Flex> */}
        </>
    );
};

export default Start;