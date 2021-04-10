import { FC } from "react";

import { FoodProvider } from "./useFood";

const Provider: FC = ({ children }) => {
  return (
    <FoodProvider>{children}</FoodProvider>
  )
}

export { Provider }