import { FC, useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import Modal from '../Modal';
import Input from '../Input';

import { useFood, CreateFood } from '../../hooks/useFood';

import { Form } from './styles';

interface ModalProps {
  isOpen: boolean;
}

const ModalAddFood: FC<ModalProps> = ({ isOpen }) => {
  const formRef = useRef(null);

  const { createFood, handleToggleModal } = useFood();

  const handleSubmit = useCallback((data: CreateFood) => {
    createFood(data);

    handleToggleModal()
  }, [createFood, handleToggleModal])
  
  return (
    <Modal isOpen={isOpen} setIsOpen={handleToggleModal}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>

        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
        
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalAddFood;
