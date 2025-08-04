// 📌 Milestone 1

type Person = {
  readonly id: number;
  readonly name: string;
  birth_year: number;
  death_year?: number;
  biography: string;
  image: string;
}
// 📌 Milestone 2


type NationalityActresses = "American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese";

type Actress = Person & {
  most_famous_movies: [string, string, string];
  awards: string;
  nationality: NationalityActresses
}


// 📌 Milestone 3


function isActress(data: unknown): data is Actress {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data && typeof data.id === "number" &&
    "name" in data && typeof data.name === "string" &&
    "birth_year" in data && typeof data.birth_year === "number" &&
    ("death_year" in data ? typeof (data as any).death_year === "number" : true) &&
    "biography" in data && typeof data.biography === "string" &&
    "image" in data && typeof data.image === "string" &&
    "most_famous_movies" in data && data.most_famous_movies instanceof Array && data.most_famous_movies.length === 3 && data.most_famous_movies.every(m => typeof m === "string") &&
    "awards" in data && typeof data.awards === "string" &&
    "nationality" in data && typeof data.nationality === "string"
  )

}


async function getActress(id: number): Promise<Actress | null> {
  const endpoint = `http://localhost:3333/actresses/${id}`

  try {
    const response = await fetch(endpoint);
    const data: unknown = await response.json();
    if (!isActress(data)) {
      throw new Error("Formato dati non valido")
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante recuper attrice", error)
    } else {
      console.error("errore sconosciuto", error)
    }
    return null;
  }
}

getActress(1)
  .then(actress => {
    console.log(actress)
  })


// 📌 Milestone 4


async function getAllActress(): Promise<Actress[]> {
  const endpoint = `http://localhost:3333/actresses`

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`errore http ${response.status}: ${response.statusText}`)
    }
    const data: unknown = await response.json();

    if (!(data instanceof Array)) {
      throw new Error("Formato non valido")
    }

    const attriciValide: Actress[] = data.filter(isActress)
    return attriciValide;

  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante recuper attrici", error)
    } else {
      console.error("errore sconosciuto", error)
    }
    return [];
  }
}

getAllActress()
  .then(actress => {
    console.log(actress)
  })


// 📌 Milestone 5


async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
  try {
    const promises = ids.map(id => getActress(id))
    return await Promise.all(promises)

  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante recuper attrici", error)
    } else {
      console.error("errore sconosciuto", error)
    }
    return [];
  }
}

getActresses([1, 2, 3])
  .then(actress => {
    console.log(actress)
  })


//   🎯 BONUS 1

function createActress(data: Omit<Actress, "id">): Actress {
  return {
    ...data,
    id: Math.floor(Math.random() * 10000)
  }
}

function updateActress(actress: Actress, updates: Partial<Actress>): Actress {
  return {
    ...actress,
    ...updates,
    id: actress.id,
    name: actress.name
  }
}

//   🎯 BONUS 2

type ActorNationalities =
  | NationalityActresses
  | "Scottish"
  | "New Zealand"
  | "Hong Kong"
  | "German"
  | "Canadian"
  | "Irish"

type Actor = Person & {
  known_for: [string, string, string];
  awards: [string] | [string, string]
  nationality: ActorNationalities
}

function isActor(data: unknown): data is Actor {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data && typeof data.id === "number" &&
    "name" in data && typeof data.name === "string" &&
    "birth_year" in data && typeof data.birth_year === "number" &&
    ("death_year" in data ? typeof (data as any).death_year === "number" : true) &&
    "biography" in data && typeof data.biography === "string" &&
    "image" in data && typeof data.image === "string" &&
    "known_for" in data && data.known_for instanceof Array && data.known_for.length === 3 && data.known_for.every(m => typeof m === "string") &&
    "awards" in data && data.awards instanceof Array && (data.awards.length === 1 || data.awards.length === 2) && data.awards.every(m => typeof m === "string") &&
    "nationality" in data && typeof data.nationality === "string"
  )
}

//getActor
async function getActor(id: number): Promise<Actor | null> {
  const endpoint = `http://localhost:3333/actors/${id}`

  try {
    const response = await fetch(endpoint);
    const data: unknown = await response.json();
    if (!isActor(data)) {
      throw new Error("Formato dati non valido")
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante recuper attrice", error)
    } else {
      console.error("errore sconosciuto", error)
    }
    return null;
  }
}

getActor(1)
  .then(actress => {
    console.log(actress)
  })

//getAllActors

async function getAllActor(): Promise<Actor[]> {
  const endpoint = `http://localhost:3333/actors`

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`errore http ${response.status}: ${response.statusText}`)
    }
    const data: unknown = await response.json();

    if (!(data instanceof Array)) {
      throw new Error("Formato non valido")
    }

    const actorValide: Actor[] = data.filter(isActor)
    return actorValide;

  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante recuper attrici", error)
    } else {
      console.error("errore sconosciuto", error)
    }
    return [];
  }
}

getAllActor()
  .then(Actor => {
    console.log(Actor)
  })

//updateActor

function updateActor(actor: Actor, updates: Partial<Actor>): Actor {
  return {
    ...actor,
    ...updates,
    id: actor.id,
    name: actor.name
  }
}

//createActor

function createActor(data: Omit<Actor, "id">): Actor {
  return {
    ...data,
    id: Math.floor(Math.random() * 10000)
  }
}



