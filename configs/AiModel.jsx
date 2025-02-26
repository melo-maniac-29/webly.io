// Purpose: This file is used to create a chat session with the google generative AI model. It is used to generate responses to the user's input.

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; //API key for the google generative AI
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const chatGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const CodegenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  //exporting the chat session
  generationConfig: chatGenerationConfig, //chat generation configuration
  history: [],
});

export const GenAiCode = model.startChat({
  generationConfig: CodegenerationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'generate todo app: Generate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, \nwithout any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.\nalso you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n  "projectTitle": "",\n  "explanation": "",\n  "files": {\n    "/App.js": {\n      "code": ""\n    },\n    ...\n  },\n  "generatedFiles": []\n}\n\nHere’s the reformatted and improved version of your prompt:\n\nGenerate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.\n\nReturn the response in JSON format with the following schema:\n\njson\nCopy code\n{\n  "projectTitle": "",\n  "explanation": "",\n  "files": {\n    "/App.js": {\n      "code": ""\n    },\n    ...\n  },\n  "generatedFiles": []\n}\nEnsure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file\'s code should be included in the code field, following this example:\nfiles:{\n  "/App.js": {\n    "code": "import React from \'react\';\\nimport \'./styles.css\';\\nexport default function App() {\\n  return (\\n    <div className=\'p-4 bg-gray-100 text-center\'>\\n      <h1 className=\'text-2xl font-bold text-blue-500\'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className=\'mt-2 text-gray-700\'>This is a live code editor.</p>\\n    </div>\\n  );\\n}"\n  }\n}\n  Additionally, include an explanation of the project\'s structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.\n  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required\n  \n  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg\n  -Add Emoji icons whenever needed to give good user experinence\n  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\n- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\n- Use icons from lucide-react for logos.\n\n- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n   `,\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "projectTitle": "Todo App with Tailwind CSS",\n  "explanation": "This React project implements a Todo application styled with Tailwind CSS. It includes components for managing tasks, such as adding, deleting, marking as complete, and displaying a list of tasks. The application is structured with separate components for better organization and maintainability. It uses lucide-react for icons and date-fns for date formatting, and react-chartjs-2 chart, graph library.",\n  "files": {\n    "/App.js": {\n      "code": "import React from \'react\';\\nimport TodoList from \'./components/TodoList\';\\nimport TodoForm from \'./components/TodoForm\';\\nimport { useState, useEffect } from \'react\';\\nimport { format } from \'date-fns\';\\n\\nfunction App() {\\n  const [todos, setTodos] = useState(() => {\\n    const savedTodos = localStorage.getItem(\'todos\');\\n    if (savedTodos) {\\n      return JSON.parse(savedTodos);\\n    } else {\\n      return [];\\n    }\\n  });\\n\\n  useEffect(() => {\\n    localStorage.setItem(\'todos\', JSON.stringify(todos));\\n  }, [todos]);\\n\\n  const addTodo = (text) => {\\n    const newTodo = {\\n      id: Date.now(),\\n      text: text,\\n      completed: false,\\n      createdAt: new Date(),\\n    };\\n    setTodos([...todos, newTodo]);\\n  };\\n\\n  const completeTodo = (id) => {\\n    setTodos(\\n      todos.map((todo) => {\\n        if (todo.id === id) {\\n          return { ...todo, completed: !todo.completed };\\n        } else {\\n          return todo;\\n        }\\n      })\\n    );\\n  };\\n\\n  const deleteTodo = (id) => {\\n    setTodos(todos.filter((todo) => todo.id !== id));\\n  };\\n\\n  return (\\n    <div className=\\"flex justify-center items-center min-h-screen bg-gray-100\\">\\n      <div className=\\"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg\\">\\n        <h1 className=\\"block text-gray-700 text-center text-2xl font-bold mb-6\\">My Todo List 🚀</h1>\\n        <TodoForm addTodo={addTodo} />\\n        <TodoList todos={todos} completeTodo={completeTodo} deleteTodo={deleteTodo} />\\n      </div>\\n    </div>\\n  );\\n}\\n\\nexport default App;"\n    },\n    "/components/TodoForm.js": {\n      "code": "import React, { useState } from \'react\';\\nimport { Plus } from \'lucide-react\';\\n\\nfunction TodoForm({ addTodo }) {\\n  const [value, setValue] = useState(\'\');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (!value) return;\\n    addTodo(value);\\n    setValue(\'\');\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\"mb-4\\">\\n      <div className=\\"flex\\">\\n        <input\\n          type=\\"text\\"\\n          className=\\"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\\"\\n          placeholder=\\"Add a new todo...\\" // Changed placeholder text\\n          value={value}\\n          onChange={(e) => setValue(e.target.value)}\\n        />\\n        <button type=\\"submit\\" className=\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2\\">\\n          <Plus className=\\"h-5 w-5\\"/>\\n        </button>\\n      </div>\\n    </form>\\n  );\\n}\\n\\nexport default TodoForm;"\n    },\n    "/components/TodoList.js": {\n      "code": "import React from \'react\';\\nimport TodoItem from \'./TodoItem\';\\n\\nfunction TodoList({ todos, completeTodo, deleteTodo }) {\\n  return (\\n    <ul>\\n      {todos.map((todo) => (\\n        <TodoItem key={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} />\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TodoList;"\n    },\n    "/components/TodoItem.js": {\n      "code": "import React from \'react\';\\nimport { Trash, Check, Edit } from \'lucide-react\';\\nimport { format } from \'date-fns\';\\n\\nfunction TodoItem({ todo, completeTodo, deleteTodo }) {\\n  return (\\n    <li className=\\"flex items-center justify-between py-2 border-b border-gray-200\\">\\n      <div className=\\"flex items-center\\">\\n        <input\\n          type=\\"checkbox\\"\\n          checked={todo.completed}\\n          onChange={() => completeTodo(todo.id)}\\n          className=\\"mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer\\"\\n        />\\n        <span className={` ${todo.completed ? \'line-through text-gray-500\' : \'text-gray-700\'} `}>\\n          {todo.text}\\n        </span>\\n        <span className=\\"ml-2 text-sm text-gray-400\\">{format(todo.createdAt, \'MMM dd, yyyy HH:mm\')}</span>\\n      </div>\\n\\n      <div className=\\"flex\\">\\n        <button onClick={() => completeTodo(todo.id)} className=\\"text-green-500 hover:text-green-700 mr-2\\">\\n          <Check className=\\"h-5 w-5\\"/>\\n        </button>\\n\\n        <button onClick={() => deleteTodo(todo.id)} className=\\"text-red-500 hover:text-red-700\\">\\n          <Trash className=\\"h-5 w-5\\"/>\\n        </button>\\n      </div>\\n    </li>\\n  );\\n}\\n\\nexport default TodoItem;"\n    }\n  },\n  "generatedFiles": [\n    "/App.js",\n    "/components/TodoForm.js",\n    "/components/TodoList.js",\n    "/components/TodoItem.js"\n  ]\n}\n```',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
