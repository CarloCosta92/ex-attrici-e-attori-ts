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


type Nationality = "American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese";

type Actress = Person & {
  most_famous_movies: [string, string, string];
  awards: string;
  nationality: Nationality
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
  const actressPromises = ids.map(id => getActress(id));

  const results = await Promise.all(actressPromises);

  return results;
}

getActresses([1, 2, 3])
  .then(actress => {
    console.log(actress)
  })




