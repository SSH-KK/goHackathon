import React from 'react'
import styled from 'styled-components'
import { ButtonCustom } from '../components/ButtonCustom'
import { MAIN_URL } from '../constants/routes'

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
`
const Title = styled.p`
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
`

const Content = styled.div`
  margin-top: 26px;
  margin-bottom: 42px;
  height: auto;
  overflow: hidden;
  overflow-y: scroll;
`
const Text = styled.p`
  font-size: 24px;
  line-height: 32px;
`
const SubTitle = styled.h2`
  margin-bottom: 26px;
  margin-top: 26px;
`

const MyButton = styled.div`
  height: 5vh;
  border: 3px solid #20e7c1;
  border-radius: 2rem;
  display: inline-block;
  text-align: center;
  margin-right: 26px;
  color: ${props => (props.active ? '#FFFFFF' : '#20e7c1')};
  width: ${props => props.width};
  transition: all 0.3s;
  background-color: ${props => (props.active ? '#20e7c1' : 'inherit')};
  &:hover {
    background-color: #20e7c1;
    color: #ffffff;
    cursor: pointer;
  }
`

const CustomP = styled.p`
  margin-bottom: 13px;
`

const Info = ({ history }) => {
  return (
    <Wrapper>
      <Title>Информация для участников</Title>
      <Content>
        <Text>
          <SubTitle>Основная инфрмация</SubTitle>
          Данный клиент для игры в ГО предоставляет возможность использовать
          подсказки двух уровней сложности от ИИ, а также дополнительный
          визуальный интерфейс, упрощающий процесс игры.
          <SubTitle>Дополнительный визуальный интерфейс</SubTitle>
          <MyButton width={'5vh'}>
            <p style={{ 'font-size': '1rem' }}>T</p>
          </MyButton>
          Включение/Отключение отображения захваченных территорий. Помогает
          понять кому из игроков вероятнее всего будет принадлежать данная
          позиция.
          <hr />
          <MyButton width={'5vh'}>
            <p style={{ 'font-size': '1rem' }}>D</p>
          </MyButton>
          Включение/Отключение отображения групп камней, у которых осталось 1
          дыхание. Помогает избежать неожиданной потери камней :).
          <SubTitle>Подсказки от ИИ</SubTitle>
          <CustomP>
            <strong>Стоит ли пасовать:</strong> Позволяет узнать то, как много
            территорий вы потеряете, если сделаете пасс на следующем ходе.
          </CustomP>
          <CustomP>
            <strong>В какой четверти доски сейчас лучший ход:</strong> Позволяет
            узнать, в какой четверти доски следует вести игру (очевидно).
          </CustomP>
          <CustomP>
            <strong>Показать лучшие ходы:</strong> Позволяет узнать от 1 до 5
            лучших следующих ходов.
          </CustomP>
          <CustomP>
            <strong>Выбрать лучший ход:</strong> Позволяет узнать какой из
            выбранных вами ходов является лучшим.
          </CustomP>
          <CustomP>
            <strong>Показать тепловую карту:</strong>Показывает наиболее удачные
            позиции для совершения хода.
          </CustomP>
        </Text>
      </Content>
      <ButtonCustom
        width="327px"
        onClick={() => {
          history.push(MAIN_URL)
        }}
      >
        В меню
      </ButtonCustom>
    </Wrapper>
  )
}

export default Info
