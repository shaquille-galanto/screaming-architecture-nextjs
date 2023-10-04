import { TodoProvider, TodoSection } from '@features/todos'

const HomePage = () => (
  <TodoProvider>
    <TodoSection />
  </TodoProvider>
)

export default HomePage
