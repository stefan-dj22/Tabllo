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
const mockUsers = [ 'user1','user2'];
let genId = 5;
const setDelay = (ms) => new Promise((res) => {setTimeout(res,ms)});

export function getUserMockData(username) {
    return mockData[username] || [];
}

export const getUserMock = (userOrderNum) =>
{
    if(userOrderNum > mockUsers.length-1)
        throw RangeError("The number of mock users is:" + mockUsers.length); 
    return mockUsers[userOrderNum];
}

export async function getUserTablesMock(username){
    await setDelay(1000);
    const responseBody = JSON.stringify(getUserMockData(username)); // Convert data to String
    return new Response(responseBody, {
      status: 200, // HTTP status code
      statusText: "OK",
      headers: { "Content-Type": "application/json" }});
}

// Mock POST request
export const reqTimeoutTime = 1000;
export async function createTableReqMock(newData,username) {
  await setDelay(reqTimeoutTime); // Simulate 1-second delay

  let okRespBody = JSON.stringify({status: "ok", message: "Data successfully added."});
  let errRespBody= JSON.stringify({status: "error", message: "Failed to add data."})
  // Simulate success or error
  const isReqAccepted = Math.random() > 0.2; // 80% chance of success
  if (isReqAccepted) {
    genId++;
    newData.Id = genId;
    mockData[username].push(newData);
    return new Response(
        okRespBody,
        {
            status: 200, // HTTP status code
            statusText: "OK",
            headers: { "Content-Type": "application/json" }
        }
    );
    } 
    else {
    return new Response(
        errRespBody,
        { 
            status: 500,
            statusText: "Failed to add data.",
            headers: { "Content-Type": "application/json" }
        });

    }
}