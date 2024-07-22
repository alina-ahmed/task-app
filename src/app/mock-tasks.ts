import { Task } from "./task";

export const TASKS: Task[]=[
      { 
        title: "Task in Progress",
        description:"",
        status: "In Progress",
        icon:"../assets/clock.png",
        statusIcon:["../assets/Time_atack_duotone.svg","#E9A23B"]
        
        
      },
      { 
        title: "Task Completed",
        description:"",
        status: "Completed",
        icon:"../assets/person-lifting-weights.png",
        statusIcon:["../assets/Done_round_duotone.svg","#32D657"]


      },
      { 
        title: "Task Won’t Do",
        description:"",
        status: "Won't Do",
        icon:"../assets/hot-beverage.png",
        statusIcon:["../assets/close_ring_duotone.svg","#DD524C"]


      },
      { 
        title: "Task To Do",
        description:"Work on a challenge on devChallenges.io, learn TypeScript",
        status: "pending",
        icon:"../assets/books.png",
        statusIcon:["",""]


      }
];