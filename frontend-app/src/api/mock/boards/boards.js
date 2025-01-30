const mockData = {
    "user1": [
        {
            Id: 1,
            Name: "Project Alpha",
            Color: "blue",
            Lists: [
                { Index: 0, NumOfItem: 5 },
                { Index: 1, NumOfItem: 3 },
                { Index: 2, NumOfItem: 8 }
            ]
        },
        {
            Id: 2,
            Name: "Vacation Planning",
            Color: "green",
            Lists: [
                { Index: 0, NumOfItem: 4 },
                { Index: 1, NumOfItem: 2 }
            ]
        }
    ],
    "user2": [
        {
            Id: 3,
            Name: "Work Tasks",
            Color: "red",
            Lists: [
                { Index: 0, NumOfItem: 10 },
                { Index: 1, NumOfItem: 6 }
            ]
        },
        {
            Id: 4,
            Name: "Hobbies",
            Color: "yellow",
            Lists: [
                { Index: 0, NumOfItem: 7 }
            ]
        },
        {
            Id: 5,
            Name: "Learning Goals",
            Color: "purple",
            Lists: [
                { Index: 0, NumOfItem: 3 },
                { Index: 1, NumOfItem: 4 },
                { Index: 2, NumOfItem: 2 }
            ]
        }
    ]
};
function getUserBoards(username) {
    return mockData[username] || [];
}

export default getUserBoards;