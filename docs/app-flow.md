```mermaid
graph TD
    A[User Interface] --> B[TodoList Component]
    B --> C[TodoItem Component]
    B --> D[Add New Todo]
    B --> E[Suggested Tasks Section]
    
    D --> F[handleSubmit]
    F --> G[Add Todo to Store]
    F --> H[Fetch Suggested Tasks]
    H --> I[DeepSeek API]
    I --> J[Update Suggested Tasks]
    
    E --> K[handleSuggestedTaskClick]
    K --> L[Add to Todo List]
    K --> M[Remove from Suggested List]
    
    C --> N[Toggle Todo Status]
    C --> O[Remove Todo]
    
    subgraph State Management
        P[Zustand Store]
        P --> Q[todos]
        P --> R[suggestedTodos]
        P --> S[addTodo]
        P --> T[toggleTodo]
        P --> U[removeTodo]
        P --> V[setSuggestedTodos]
    end
    
    G --> P
    L --> P
    M --> P
    N --> P
    O --> P
    J --> P

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style P fill:#bbf,stroke:#333,stroke-width:2px
```

## Application Flow Description

1. **User Interface**
   - Main entry point of the application
   - Renders TodoList component

2. **TodoList Component**
   - Manages the main todo list interface
   - Handles form submission for new todos
   - Displays suggested tasks
   - Renders individual TodoItem components

3. **TodoItem Component**
   - Displays individual todo items
   - Handles todo status toggling
   - Handles todo deletion

4. **State Management (Zustand Store)**
   - Manages todos array
   - Manages suggestedTodos array
   - Provides actions:
     - addTodo
     - toggleTodo
     - removeTodo
     - setSuggestedTodos

5. **DeepSeek API Integration**
   - Fetches suggested tasks when new todo is added
   - Updates suggested tasks in the store

6. **User Interactions**
   - Adding new todos
   - Toggling todo completion
   - Removing todos
   - Adding suggested tasks
   - Removing suggested tasks after selection 