import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style/Main.style.css";

const messages = [
  {
    id: 1,
    sender: 'Cameron Phillips',
    date: '01/01/2021 19:10',
    title: '109220-Naturalization',
    content: 'Please check this out!',
    conversation: [
      {
        id: 1,
        sender: "Mary Hilda",
        date: "6/9/2021, 07:32:09 PM",
        content: "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks",
        type: "received",
      },
      {
        id: 2,
        sender: "You",
        date: "6/9/2021, 07:32:24 PM",
        content: "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
        type: "sent",
      },
    ],
  },
  {
    id: 2,
    sender: 'Ellen',
    date: '02/01/2021 10:45',
    title: 'Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]',
    content: 'Hey, please read.',
    conversation: [
      {
        id: 1,
        sender: "Ellen",
        date: "6/10/2021, 10:45:32 AM",
        content: "This is a different conversation, with more details specific to this message.",
        type: "received",
      },
      {
        id: 2,
        sender: "You",
        date: "6/10/2021, 10:50:21 AM",
        content: "Thanks, Ellen. I'll review it.",
        type: "sent",
      },
    ],
  },
  {
    id: 3,
    sender: 'Cameron Phillips',
    date: '01/06/2021 19:10',
    title: '8405-Diana SALAZAR MUNGUIA',
    content: 'I understand your initial concerns and that\'s very valid, Elizabeth. But you...',
    conversation: [],
  },
  {
    id: 1,
    sender: 'FastVisa Support',
    date: '01/06/2021 12:19',
    title: 'FastVisa Support',
    content: 'Hey there! Welcome to your inbox.',
    conversation: [],
  },
];

const tasksData = [
  {
    id: 1,
    title: "Close off Case #012920 - RODRIGUES, Amiguel",
    dueDate: "2021-06-12",
    description: "Closing off this case since this application has been cancelled. No one really understands how this case could possibly be cancelled. The options and the documents within this document were totally guaranteed for success!",
    daysLeft: 2,
    completed: false,
  },
  {
    id: 2,
    title: "Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203",
    dueDate: "2021-06-14",
    description: "All Cases must include all payment transactions, all documents and forms filled. All conversations in comments and messages in channels and emails should be provided as well in.",
    daysLeft: 4,
    completed: false,
  },
  {
    id: 3,
    title: "Set up appointment with Dr Blake",
    dueDate: "2021-06-22",
    description: "No Description",
    daysLeft: 10,
    completed: false,
  },
  {
    id: 4,
    title: "Contact Mr Caleb - video conference?",
    dueDate: "2021-06-03",
    completed: true,
  },
  {
    id: 5,
    title: "Assign 3 homework to Client A",
    dueDate: "2021-06-02",
    completed: true,
  },
];

function App() {
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState(null);
  const [activeMenuTask, setActiveMenuTask] = useState(null);
  const [newTask, setNewTask] = useState({
    id: '',
    title: '',
    daysLeft: 0,
    dueDate: '',
    description: '',
    completed: false,
  });
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskCategory, setTaskCategory] = useState("My Tasks");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => {
        const formattedTasks = response.data.map(task => ({
          id: task.id,
          title: task.title,
          dueDate: new Date().toISOString().split('T')[0],
          description: "No description available",
          daysLeft: 7,
          completed: task.completed,
        }));
        setTasks(formattedTasks);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const toggleButton = () => setIsButtonOpen(!isButtonOpen);
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleTask = () => setIsTaskOpen(!isTaskOpen);

  const toggleExpand = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const toggleMenu = (taskId) => {
    setActiveMenuTask(activeMenuTask === taskId ? null : taskId);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setActiveMenuTask(null);
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedTask = { ...newTask, [name]: value };

    if (name === 'dueDate') {
      const dueDate = new Date(value);
      const currentDate = new Date();
      const timeDiff = dueDate.getTime() - currentDate.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
      updatedTask.daysLeft = daysLeft;
    }

    setNewTask(updatedTask);
  };

  const addTask = () => {
    if (newTask.title && newTask.dueDate) {
      setTasks([...tasks, { ...newTask, id: Date.now().toString() }]);
      setNewTask({
        id: '',
        title: '',
        daysLeft: 0,
        dueDate: '',
        description: '',
        completed: false,
      });
      setIsAddingTask(false);
    }
  };

  const updateDueDate = (taskId, newDate) => {
    setTasks((prevTasks) => 
      prevTasks.map((task) => {
        if (task.if === taskId) {
          const dueDate = new Date(newDate);
          const currentDate = new Date();
          const timeDiff = dueDate.getTime() - currentDate.getTime();
          const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
          return { ...task, dueDate: newDate, daysLeft };
        }
        return task;
      })
    );
  };

  const handleCategoryChange = (category) => {
    setTaskCategory(category);
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObject = {
        id: selectedMessage.length + 1,
        sender: "You",
        date: new Date().toLocaleString(),
        content: newMessage,
        type: "sent",
      };
      setSelectedMessage({
        ...selectedMessage,
        conversation: [...selectedMessage.conversation, newMessageObject],
      });
      setNewMessage("");
    }
  };

  if (selectedMessage) {
    return (
      <>
      <main>
        <aside>
          <i className="fas fa-chevron-up"></i>
        </aside>
        <div id="content">
          <div className="form">
            <i className="fa fa-search"></i>
            <input type="text" className="form-control form-input" />
          </div>
          <button className="button-toggle-section" onClick={toggleButton}>
            {isButtonOpen ? <img src="icons/lightning.svg" className="lightning-icon" alt="" height={32} /> : <img src="icons/lightning.svg" className="lightning-icon" alt="" height={32} />}
          </button>
          {isButtonOpen && (
            <>
              <div className="button-chat-section">
                <p className="button-caption text-center fw-semibold">Inbox</p>
                <button className="button-chat" onClick={() => setSelectedMessage(null)}>
                  {isChatOpen ? <img src="icons/inbox.svg" className="close-icon" alt="" height={24} /> : <img src="icons/inbox.svg" className="inbox-icon" alt="" height={24} />}
                </button>
              </div>
              <div className="task-chat-section">
                <p className="task-caption text-center fw-semibold">Task</p>
                <button className="task-float" onClick={toggleTask}>
                  {isTaskOpen ? <img src="icons/task.svg" className="task-icon" alt="" height={24} /> : <img src="icons/task.svg" className="task-icon" alt="" height={24} />}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <div className="chat-section">
        <div className="chat-window">
          <div className="chat-header">
            <button onClick={() => setSelectedMessage(null)} className="back-button">
              &#x2190;
            </button>
            <div className="chat-header-title">
              <h2>{selectedMessage.title}</h2>
              <span className="chat-participants">3 Participants</span>
            </div>
          </div>
          <div className="chat-body">
            {selectedMessage.conversation.map((message) => (
              <div key={message.id} className={`message-bubble ${message.type === "sent" ? "sent" : "received"}`}>
                <div className="message-content-chat">
                  {message.type !== "sent" && <strong>{message.sender}</strong>}
                  <p>{message.content}</p>
                  <div className="message-meta">
                    <span className="message-date-chat">{message.date}</span>
                    <span className="message-options">⋮</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <div className="chat-input">
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a new message" />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <main>
        <aside>
          <i className="fas fa-chevron-up"></i>
        </aside>
        <div id="content">
          <div className="form">
            <i className="fa fa-search"></i>
            <input type="text" className="form-control form-input" />
          </div>
          <button className="button-toggle-section" onClick={toggleButton}>
            {isButtonOpen ? <img src="icons/lightning.svg" className="lightning-icon" alt="" height={32} /> : <img src="icons/lightning.svg" className="lightning-icon" alt="" height={32} />}
          </button>
          {isButtonOpen && (
            <>
              <div className="button-chat-section">
                <p className="button-caption text-center fw-semibold">Inbox</p>
                <button className="button-chat" onClick={toggleChat}>
                  {isChatOpen ? <img src="icons/inbox.svg" className="close-icon" alt="" height={24} /> : <img src="icons/inbox.svg" className="inbox-icon" alt="" height={24} />}
                </button>
              </div>
              {isChatOpen && (
                <div className="chat-section">
                  <div className="search-bar">
                    <input type="text" placeholder="Search" />
                    <i className="fa fa-search"></i>
                  </div>
                  <div className="message-list">
                    {messages.map((message) => (
                      <div key={message.id} className="message-item" onClick={() => handleSelectMessage(message)}>
                        <div className="avatar">
                          <i className="fa fa-user"></i>
                        </div>
                        <div className="message-content">
                          <div className="message-header">
                            <span className="message-title">{message.title}</span>
                            <span className="message-date">{message.date}</span>
                          </div>
                          <div className="message-sender">{message.sender}</div>
                          <div className="message-text">{message.content}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="task-chat-section">
                <p className="task-caption text-center fw-semibold">Task</p>
                <button className="task-float" onClick={toggleTask}>
                  {isTaskOpen ? <img src="icons/task.svg" className="task-icon" alt="" height={24} /> : <img src="icons/task.svg" className="task-icon" alt="" height={24} />}
                </button>
              </div>
              {isTaskOpen && (
                <div className="task-section">
                  <div className="task-header">
                    <div className="dropdown">
                      <button className="dropdown-button">
                        {taskCategory} <i className="fa fa-chevron-down"></i>
                      </button>
                      <div className="dropdown-content">
                        <div onClick={() => handleCategoryChange("Personal Errands")}>
                          Personal Errands
                        </div>
                        <div onClick={() => handleCategoryChange("Urgent To-Do")}>
                          Urgent To-Do
                        </div>
                      </div>
                    </div>
                    <button className="new-task-button" onClick={() => setIsAddingTask(!isAddingTask)}>New Task</button>
                  </div>
                  <div className="tasks">
                    {tasks.map((task) => (
                      <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <div className="task-info">
                          <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id)} />
                          <div className="task-details">
                            <div className="task-title-wrapper">
                              <div className="task-title">{task.title}</div>
                              {!task.completed && (
                                <div className="task-meta">
                                  <div className="days-left">{task.daysLeft} Days Left</div>
                                  <div className="task-due-date">{task.dueDate}</div>
                                </div>
                              )}
                            </div>
                            {expandedTask === task.id && (
                              <>
                                <div className="task-date">
                                  <i className="fa fa-calendar"></i>
                                  <input type="date" value={task.dueDate} className="task-due-date-input" />
                                </div>
                                {!task.completed && (
                                  <div className="task-description">
                                    <i className="fa fa-pencil"></i> {task.description}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="task-options">
                          <i className={`fa fa-chevron-${expandedTask === task.id ? 'up' : 'down'}`} onClick={() => toggleExpand(task.id)}></i>
                          <i className="fa fa-ellipsis-v" onClick={() => toggleMenu(task.id)}></i>
                          {activeMenuTask === task.id && (
                            <div className="popup-menu">
                              <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isAddingTask && (
                      <div className="task-form">
                        <input type="text" name="title" placeholder="Task Title" value={newTask.title} onChange={handleInputChange} />
                        <input type="date" name="dueDate" placeholder="Due Date" value={newTask.dueDate} onChange={handleInputChange} />
                        <textarea name="description" placeholder="Task Description" value={newTask.description} onChange={handleInputChange}></textarea>
                        <button onClick={addTask}>Add Task</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default App
