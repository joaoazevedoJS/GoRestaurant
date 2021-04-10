import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import ModalAddFood from "../components/ModalAddFood";
import ModalEditFood from "../components/ModalEditFood";

import api from "../services/api";

export interface IFood {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export type CreateFood = Omit<IFood, 'id' | 'available'>

interface FoodContextData {
  foods: IFood[];
  editingFood: IFood;
  createFood(food: CreateFood): Promise<void>;
  updateFood(food: IFood): Promise<void>;
  deleteFood(id: number): Promise<void>;
  handleToggleModal(): void;
  handleToggleEditModal(): void;
  handleEditFood(Food: IFood): void;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData)

const FoodProvider: FC = ({ children }) => {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    api.get('/foods').then(response => setFoods(response.data))
  }, [])

  const createFood = useCallback(async (food: CreateFood) => {
    try {
      const response = await api.post<IFood>('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err);
    }
  }, [foods])

  const updateFood = useCallback(async (food: IFood) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${food.id}`, food,
      );

      const foodsUpdated = foods.map(food =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data,
      );

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }, [foods])

  const deleteFood = useCallback(async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered)
  }, [foods])

  const handleToggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen])

  const handleToggleEditModal = useCallback(() => {
    setEditModalOpen(!editModalOpen)
  }, [editModalOpen])

  const handleEditFood = useCallback((food: IFood) => {
    setEditingFood(food)

    setEditModalOpen(true)
  }, [])

  return (
    <FoodContext.Provider value={{ 
      foods, 
      editingFood,
      createFood, 
      updateFood, 
      deleteFood, 
      handleToggleModal, 
      handleToggleEditModal, 
      handleEditFood 
      }}
    >
      <ModalAddFood isOpen={modalOpen} />
      <ModalEditFood isOpen={editModalOpen} />

      {children}
    </FoodContext.Provider>
  )
}

function useFood(): FoodContextData {
  const context = useContext(FoodContext);

  return context ? context : {} as FoodContextData
}

export { FoodProvider, useFood }