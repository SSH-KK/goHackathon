import React from "react";
import styled from "styled-components";
import { ButtonCustom } from "../../components/ButtonCustom";
import { MAIN_URL } from "../../constants/routes";

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  align-items: left;
  max-width: 1210px;
  margin: 0 auto;
  padding: 100px 0;
`;
const Title = styled.p`
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
`;

const Content = styled.div`
  margin-top: 26px;
  margin-bottom: 42px;
  height: auto;
  overflow: hidden;
  overflow-y: scroll;
`;
const Text = styled.p`
  font-size: 24px;
  line-height: 28px;
`;

const Info = ({ history }) => {
  return (
    <Wrapper>
      <Title>Информация для участников</Title>
      <Content>
        <Text>
          <p>
            Для подключения к серверу хакатона используйте ключ API высланный
            вам на почту.
          </p>
          <p>
            Методы, доступные для реализации в вашей версии клиента перечислены
            ниже:
          </p>
          <p>POST </p>
          <p>​/game​/create​/random</p>
          <p>Отправляем заявку на игру со случайным игроком</p>
          <p>POST </p>
          <p>​/game​/create​/code </p>
          <p>Отправляем заявку на игру по сгенерированному коду </p>
          <p>POST ​</p>
          <p>/game​/create​/random</p>
          <p>Отправляем заявку на игру со случайным игроком </p>
          <p>POST</p>
          <p>​/game​/create​/code </p>
          <p>Отправляем заявку на игру по сгенерированному</p>
          коду
          <p>POST ​</p>
          <p>/game​/create​/random</p>
          <p>
            Для подключения к серверу хакатона используйте ключ API высланный
            вам на почту.
          </p>
          <p>
            Методы, доступные для реализации в вашей версии клиента перечислены
            ниже:
          </p>
          <p>POST </p>
          <p>​/game​/create​/random</p>
          <p>Отправляем заявку на игру со случайным игроком</p>
          <p>POST </p>
          <p>​/game​/create​/code </p>
          <p>Отправляем заявку на игру по сгенерированному коду </p>
          <p>POST ​</p>
          <p>/game​/create​/random</p>
          <p>Отправляем заявку на игру со случайным игроком </p>
          <p>POST</p>
          <p>​/game​/create​/code </p>
          <p>Отправляем заявку на игру по сгенерированному</p>
          коду
          <p>POST ​</p>
          <p>/game​/create​/random</p>
        </Text>
      </Content>
      <ButtonCustom
        width="327px"
        onClick={() => {
          history.push(MAIN_URL);
        }}
      >
        В меню
      </ButtonCustom>
    </Wrapper>
  );
};

export default Info;
