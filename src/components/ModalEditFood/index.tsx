import { FC, useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import Modal from '../Modal';
import Input from '../Input';

import { IFood, useFood } from '../../hooks/useFood';

import { Form } from './styles';

interface ModalProps {
  isOpen: boolean;
}

const ModalEditFood: FC<ModalProps> = ({ isOpen }) => {
  const formRef = useRef(null);

  const { updateFood, handleToggleEditModal, editingFood } = useFood()

  const handleSubmit = useCallback((data: Omit<IFood, 'id' | 'available'>) => {
    updateFood({ ...editingFood, ...data });

    handleToggleEditModal()
  }, [editingFood, handleToggleEditModal, updateFood])

  return (
    <Modal isOpen={isOpen} setIsOpen={handleToggleEditModal}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>

        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />

        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>

          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalEditFood;
