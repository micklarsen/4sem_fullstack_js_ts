import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `

type Coordinate {
  latitude: Float!
  longitude:Float!
}

type Coordinates {
  coordinates: [Coordinate]
}

type Status{
  """TRUE if coordinates was inside gameArea, otherwise FALSE"""
  status: String

  """Contains a string with a description of whether the given coordinates was inside or not inside the gameArea"""
  msg: String
}

"""Contains the userName of a team found"""
type Name{
  name: String
}

type Point{
  """Will Always have the value Point"""
  type: String
  coordinates: [Float]
}

type Player{
  """Will ALWAYS have the value -->Feature<--"""
  type: String

  """userName of the player (Or team)"""
  properties: [Name]

  """GeoJson point with the users location"""
  geometry: [Point]
 
}

"""Represents a user found, with the distance to the caller"""
type User{
  """Distance to the user searched for"""
  distance: Float
  
  """username of the user found"""
  to: String
}

type Query {

  """Returns a GeoJson Polygon representing the legal gameArea"""
  gameArea : Coordinates 

  """ Check whether caller, given his latitude and longtitude, is inside the gamearea"""
  isUserInArea("""callers latitude""" latitude:Float!,
               """callers longtitude""" longtitude:Float!):Status!

  """Given callers latitude and longtitude all nearby teams will be found (Inside the given radius) """
  findNearbyPlayers(latitude:Float!,longtitude:Float!,distance:Int!):[Player]!

  """Given callers latitude and longtitude and the userName of the team to find. Returns the distance to this team"""
  distanceToUser("""callers latitude""" latitude:Float!, 
                 """callers longtitude""" longtitude:Float!,
                 """user to find""" userName:String):User!
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
