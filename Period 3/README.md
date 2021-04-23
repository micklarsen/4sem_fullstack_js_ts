# Learning goals: Period 3

Updated continuously

**Study group**

- [Alexander Pihl](https://github.com/AlexanderPihl)
- [Jean-Poul Leth-Møller](https://github.com/Jean-Poul)
- [Mick Larsen (Me)](https://github.com/micklarsen/)
- [Morten Rasmussen](https://github.com/Amazingh0rse)
- [Per Kringelbach](https://github.com/cph-pk)

# Exercises:

For exercises, please check the folders above or use the list here:

- [Week 1]()
- [Week 2]()
- Fullstack startcode [link](https://github.com/micklarsen/FullstackTS_Startcode)

### Explain shortly about GraphQL, its purpose and some of its use cases

GraphQL is a new API standard (As opposed to REST) that provides more flexibility.  
Insted of calling multiple endpoints like `../api/friend/2` and `../api/friend/all` we can call a single endpoint like `../api/friend`. Furthermore, we can specifiy exactly what we want in return! Instead of fetching a list of all friends with all their data, we can get all of them, but choose to only retrieve names, emails etc.  
This solves issues like under- and over fetching.

Another usecase could be to use GraphQL as a proxy for an existing REST API to "Filter" the data before using it.

<br>

### Explain some of the Server Architectures that can be implemented with a GraphQL backend

GraphQL server architectures are divided in three main categories:

1. GrapQL server with a _connected database_
2. GrapQL server that is a "Thin layer" in front of one or more third party systems that "Gathers" them in a single GraphQL endpoint.
3. A hybrid of both a connected database and a layer that connects all of them in a single GraphQL API.

<br>

### What is meant by the terms over- and under-fetching in GraphQL, compared to REST

Over fetching is fetching too much data, meaning that, in the data you fetch, you don't use all of it.  
Under fetchng is not having enough data from one fetch, requiring you to perform another fetch to another endpoint.

In GraphQL this problem is solved as described above.

<br>

### Explain shortly about GraphQL’s type system

GraphQL uses a type system to define a _schema_ for an API.  
The syntax used for this is called _Schema Definition Language (SDL)_  
Some example syntax for defining a type called _Person_:

```sdl
type Person{
      name: String!
      age: Int!
}
```

In this type there are two _fields_ called "name" and "age" with the types String and Int.  
We can use exclamation mark `!` to enforce that the fields are required.

We can utilize the type system to setup relations between types allowing us to customize our endpoint significantly.

<br>

### Explain shortly about GraphQL Schema Definition Language

By using tripe quotes, we can add an API doc when using a GUI interface such as GraphiQL.  
Example schema provided:

```javascript
const typeDefs = `
    type Friend {
        id: ID
        firstName: String
        lastName: String
        email: String
        role: String
    }

    """
    Queries available for Friends
    """
     type Query {
        """
        Returns all details for all Friends
        """
        getAllFriends : [Friend]!

        """
        Only required if you ALSO wan't to try a version where the result is fetched from the existing endpoint
        """
        getAllFriendsProxy: [Friend]!
        
        getFriendByEmail(input: String): Friend
        getFriendById(input: String): Friend
    }

    input FriendInput {
        firstName: String!
        lastName: String!
        password: String!
        email: String!
    }

    input FriendEditInput {
        firstName: String
        lastName: String
        password: String
        email: String!
    }

    type Mutation {
        """
        Allows anyone (non authenticated users) to create a new friend
        """
        createFriend(input: FriendInput): Friend
        updateFriend(input: FriendEditInput): Friend
        deleteFriend(id: ID!): String
    }
`;
```

<br>

### Provide examples demonstrating data fetching with GraphQL. You should provide examples both running in a Sandbox/playground and examples executed in an Apollo Client

<br>

**WITHOUT APOLLO**  

A fetch example without using apollo could be performed like this:

```javascript
async getAllFriendsV2(): Promise<Array<IFriend>> {
      const users: Array<any> = await this.friendCollection.find(
      {},
      { projection: { password: 0 } }
      ).toArray();
      const allFriends = users.map(user => this.convertObjectIdToId(user))
      return allFriends as Array<IFriend>
}
```
In this example we use projections to omit the (hashed) passwords from mongodb.

**USING APOLLO CLIENT**

First, we import apollo in app.tsx and prepare the client: 

```javascript
  client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
  client.resetStore();
}
makeClient()
```

We are then able to use the client by wrapping the entire router with the client: 
`<ApolloProvider client={client}>`

When using Apollo client with react, we can use the useQuery hook.

In this example we import the `gql` function to parse our query string into a query document. The apollo client contains the "Loading, error and data" properties we can work with. The `data` property can be used to render results on the client side.


```javascript
import { gql, useQuery } from "@apollo/client";

const ALL_FRIENDS = gql`
  {
    getAllFriends {
      id
      firstName
      lastName
      email
      role
    }
  }
`;

const { loading, error, data, startPolling } =
  useQuery < FriendData > (ALL_FRIENDS, { fetchPolicy: "cache-and-network" });

if (loading) return <p>Loading...</p>;

if (error) {
  console.log("---->", error);
  console.log("--2->", error.graphQLErrors);
  console.log("--3->", error.graphQLErrors[0]);
  console.log("--4->", error.networkError);
  console.log("--5->", error.message);
  console.log("--6->", error.name);
  console.log("--7->", error.extraInfo);

  console.log("-##->", JSON.stringify(error.toString()));
}
if (error) return <p>{error.toString()}</p>;

return (
  <div>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.getAllFriends.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.firstName}</td>
              <td>{f.lastName}</td>
              <td>{f.email}</td>
              <td>{f.role}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);
```

<br>

### Provide a number of examples demonstrating; creating, updating and deleting with Mutations.
Demonstrated in apolloclient week3. 
- [Create](https://github.com/micklarsen/4sem_fullstack_js_ts/blob/main/Period%203/Week%202/apollov2/src/components/AddFriend.tsx)
- [Update](https://github.com/micklarsen/4sem_fullstack_js_ts/blob/main/Period%203/Week%202/apollov2/src/components/UpdateFriend.tsx)
- [Delete](https://github.com/micklarsen/4sem_fullstack_js_ts/blob/main/Period%203/Week%202/apollov2/src/components/DeleteFriend.tsx)


<br>

### Explain the Concept of a Resolver function, and provide a number of simple examples of resolvers you have implemented in a GraphQL Server.

A resolver is a function that is responsible for populating the data for a single field in the schema.  
The fields in the schema needs resolver functions that each contain arguments and execution contexts (The latter is often the request object).  

An example schema could look like this: 
```sdl
type Query{
      numberSix: Int! #Should always return the number 6
      numberSeven: Int! #Should always return the number 7
}
```

We need to define resolvers for both fields of the root `Query` type so that they always return 6 and 7 when queried. 
The resolver definitions would look like this: 

```
const resolvers = {
      Query: {
            numberSix(){
                  return 6;
            },
            numberSeven(){
                  return 7;
            }
      }
};
```
All your servers resolvers should be defined in a single javascript object named `resolvers`. This object is called the `Resolver map`,

For handling arguments we could define a schema like this: 

```
type User{
      id: ID!
      name: String
}

type Query{
      user(id: ID!): User
}
```
Here, we want to be able to query the user field by its ID.
To do this, our server needs access to user data (We'll assume it's in a hardcoded array for this example)
```javascript
const users = [
      {
            id: '1',
            name: 'John'
      },
      {
            id: '2',
            name: 'Pochahontas'
      }
];
```

The resolvers would look like this:

```
const resolvers  = {
      Query: {
            user(parent, args, context, info){
                  return users.find(user => user.id === args.id);
            }
      }
}
```


<br>

### Explain the benefits we get from using a library like Apollo-client, compared to using the plain fetch-API
The Apollo client handles the request cycle from start to finish including loading and error states and even caching! We don't need any extra middleware to do this which saves a lot of coding. 

<br>

### In an Apollo-based React Component, demonstrate how to perform GraphQL Queries, including:

**Explain the purpose of ApolloClient and the ApolloProvider component**  
Apollo Client is a comprehensive state management library for JavaScript that enables us to manage both local and remote data with GraphQL.  
We can use it to fetch, cache, and modify application data, all while automatically updating our UI.

**Explain the purpose of the gql-function (imported from graphql-tag)**  
The gql template literal tag can be used to concisely write a GraphQL query that is parsed into a standard GraphQL AST (Abstract syntax tree). It is the recommended method for passing queries to Apollo Client. While it is primarily built for Apollo Client, it generates a generic GraphQL AST which can be used by any GraphQL client.

**Explain Custom Hooks used by your Client Code**
A custom hook example: 

```javascript
  const { loading, error, data, startPolling } = useQuery<FriendData>(
    ALL_FRIENDS,
    { fetchPolicy: "cache-first" }
  )
```
This hook uses a fetch-policy (Described in the next question)

**Explain and demonstrate the caching features built into Apollo Client**  
When using Apollo we initialize the cache in our app.tsx as shown earlier: 
```javascript
  client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
  client.resetStore();
}
makeClient()
```

In the last example we use a "cache-first" fetch policy, but there are several to choose from.  

- cache-first: First executes the query against the cache - If all requested data is preset in the cache this is returned. If not the GraphQL server is queried.
- cache-and-network: Executes the query against the cache and graphql server. This keeps the cached updated continously. 
- network only: Executes the full query against the graphql server without checking the cache (Though the result is stored in the cache).

There are more types to be found in apollographql docs.


### In an Apollo-based React Component, demonstrate how to perform GraphQL Mutations?

Demonstrated in [Updatefriend](https://github.com/micklarsen/4sem_fullstack_js_ts/blob/main/Period%203/Week%202/apollov2/src/components/UpdateFriend.tsx)

<br>

## Demonstrate and highlight important parts of a “complete” GraphQL-app using Express and MongoDB on the server-side, and Apollo-Client on the client.

Complete example with the [fullstack startcode](https://github.com/micklarsen/FullstackTS_Startcode) as the server, and the [Apollo server](https://github.com/micklarsen/4sem_fullstack_js_ts/tree/main/Period%203/Week%202/apollov2) as a React frontend. 

**BACKEND**
The most important parts of the backend is: 
- To import and integrate express with relevant middleware such as auth, debugging, etc. 
-Setup and configure a server to run everything. In the startcode the server is started in www.ts.
- Setup a facade for communicating with a database such as MongoDB
- Setup routes as API endpoints 
- Setup GraphQL schemas and resolvers to simplify and improve the API

**FRONTEND**
- Setup app.tsx that should contain routes and the apolloprovider & client to handle setup caching.
- Setup html/css for routes and build forms for interacting with an API using components.
- Integrate authentification by using localStorage.

<br>
