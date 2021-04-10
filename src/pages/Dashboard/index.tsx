import { FC } from 'react';

import Header from '../../components/Header';
import Food from '../../components/Food';

import { FoodsContainer } from './styles';
import { useFood } from '../../hooks/useFood';

const Dashboard: FC = () => {
  const { foods } = useFood();

  return (
    <>
      <Header />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food key={food.id} food={food} />
          ))}
      </FoodsContainer>
    </>
  )
}

export default Dashboard;
