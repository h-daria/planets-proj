import { ResidentData } from "./resident-data";

export interface PlanetData {
    name: string,
    diameter: number,
    climate: string,
    population: number,
    residents: ResidentData[]
}