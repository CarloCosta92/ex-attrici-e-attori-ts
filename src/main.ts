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


function isActress(data: any): data is Actress {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  if (
    typeof data.id !== 'number' ||
    typeof data.name !== 'string' ||
    typeof data.birth_year !== 'number' ||
    (data.death_year !== undefined && typeof data.death_year !== 'number') ||
    typeof data.biography !== 'string' ||
    typeof data.image !== 'string'
  ) {
    return false;
  }

  if (
    !Array.isArray(data.most_famous_movies) ||
    data.most_famous_movies.length !== 3 ||
    !data.most_famous_movies.every((movie: any) => typeof movie === 'string') ||
    typeof data.awards !== 'string' ||
    typeof data.nationality !== 'string'
  ) {
    return false;
  }

  const allowedNationalities: Nationality[] = ["American", "British", "Australian", "Israeli-American", "South African", "French", "Indian", "Israeli", "Spanish", "South Korean", "Chinese"];
  if (!allowedNationalities.includes(data.nationality)) {
    return false;
  }

  return true;
}


async function getActress(id: number): Promise<Actress | null> {
  const endpoint = `http://localhost:3333/actresses/${id}`

  try {
    const response = await fetch(endpoint);
    const data: unknown = await response.json();
    if (isActress(data)) {
      return data;
    } else {
      console.error('Dati ricevuti:', data);
      return null;
    }
  } catch (error) {
    return null;
  }
}

getActress(1)
  .then(actress => {
    console.log(actress)
  })


// 📌 Milestone 4


async function getAllActress(): Promise<Actress | null> {
  const endpoint = `http://localhost:3333/actresses`

  try {
    const response = await fetch(endpoint);
    const data: unknown = await response.json();
    if (isActress(data)) {
      return data;
    } else {
      console.error('Dati ricevuti:', data);
      return null;
    }
  } catch (error) {
    return null;
  }
}

getAllActress()


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




