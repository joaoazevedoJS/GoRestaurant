import { FC } from 'react';
import { FiPlusSquare } from 'react-icons/fi';

import { useFood } from '../../hooks/useFood';

import Logo from '../../assets/logo.svg';

import { Container } from './styles';

const Header: FC = () => {
  const { handleToggleModal } = useFood()

  return (
    <Container>
        <header>
          <img src={Logo} alt="GoRestaurant" />

          <nav>
            <div>
              <button
                type="button"
                onClick={handleToggleModal}
              >
                <div className="text">Novo Prato</div>

                <div className="icon">
                  <FiPlusSquare size={24} />
                </div>
              </button>
            </div>
          </nav>
        </header>
      </Container>
  )
}

export default Header;
