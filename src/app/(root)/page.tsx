import { TodoProvider } from '@features/todos'
import { TodoSection } from './sections'

const HomePage = () => (
  <TodoProvider>
    <TodoSection />
  </TodoProvider>
)

export default HomePage
