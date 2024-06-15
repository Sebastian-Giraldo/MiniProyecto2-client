import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export const Introduction = () => {
    // const navigate = useNavigate();

    return (
        <>
            {/* <Flex gap="middle" wrap="wrap"> */}
            <Typography style={{ padding: 100 }}>
                <Title>Mini proyecto 2</Title>

                <Paragraph>
                    Este proyecto tiene como objetivo desarrollar una plataforma web de videoconferencia que
                    permita la comunicación en tiempo real entre dos participantes, utilizando tecnologías
                    modernas como React, SASS, Redux, Typescript, WebSockets y WebRTC. La plataforma
                    se integrará con servicios en la nube como Firebase y Google Auth para la gestión de
                    usuarios y autenticación.
                </Paragraph>

            </Typography>
            {/* </Flex> */}
        </>
    );
};